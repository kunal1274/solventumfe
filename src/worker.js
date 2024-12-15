self.onmessage = (e) => {
    const { jsonData, isOutbound } = e.data;
  
    function parseData(jsonData) {
      if (jsonData.length === 0) return [];
  
      const headers = jsonData[0];
      const msgIdIndex = headers.indexOf('Message Id');
      const keyFieldIndex = headers.indexOf('Key field');
      const responseStatusIndex = headers.indexOf('Response status');
      const payloadJsonIndex = headers.indexOf('Payload JSON');
      const responseDateIndex = headers.indexOf('Response date and time');
  
      const rows = jsonData.slice(1).map(row => ({
        messageId: row[msgIdIndex],
        keyField: row[keyFieldIndex],
        responseStatus: row[responseStatusIndex],
        payloadJson: row[payloadJsonIndex],
        responseDateTime: row[responseDateIndex]
      }));
  
      return rows.filter(r => r.messageId);
    }
  
    function analyzeData(data) {
      const grouped = data.reduce((acc, item) => {
        acc[item.keyField] = acc[item.keyField] || [];
        acc[item.keyField].push(item);
        return acc;
      }, {});
  
      const results = Object.entries(grouped).map(([keyField, messages]) => {
        const successMessages = messages.filter(m => m.responseStatus === 'success');
        const failureMessages = messages.filter(m => m.responseStatus === 'failure');
        const finalMessage = successMessages.length ? successMessages[successMessages.length - 1] : failureMessages[failureMessages.length - 1];
  
        return {
          keyField,
          finalState: finalMessage ? finalMessage.responseStatus : 'Unknown',
          successCount: successMessages.length,
          failureCount: failureMessages.length
        };
      });
  
      return results;
    }
  
    const parsedData = parseData(jsonData);
    const analyzedData = analyzeData(parsedData);
  
    self.postMessage({ analyzedData, isOutbound });
  };