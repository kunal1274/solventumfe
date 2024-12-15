import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function App3plSoInbound() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [wrapPayload, setWrapPayload] = useState(true); // For toggling payload wrapping

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const binaryStr = evt.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const formattedData = parseData(jsonData);
        setData(formattedData);

        const analysis = analyzeData(formattedData);
        setResults(analysis);
      } catch (error) {
        console.error("Error during file parsing or analysis:", error);
      }
    };

    reader.onerror = (error) => {
      console.error("File reading error:", error);
    };

    reader.readAsBinaryString(file);
  };

  function parseData(jsonData) {
    if (jsonData.length === 0) return [];

    const headers = jsonData[0];

    // Find column indexes
    const msgIdIndex = headers.indexOf('Message Id');
    const keyFieldIndex = headers.indexOf('Key field');
    const responseStatusIndex = headers.indexOf('Response status');
    const payloadJsonIndex = headers.indexOf('Payload JSON');
    const responseDateIndex = headers.indexOf('Response date and time');
    const csRemarksIndex = headers.indexOf('CS Remarks');
    const csProgressIndex = headers.indexOf('CS Progress Status');
    const logDescriptionIndex = headers.indexOf('Log description');

    const requiredIndexes = [msgIdIndex, keyFieldIndex, responseStatusIndex, payloadJsonIndex, responseDateIndex];
    if (requiredIndexes.includes(-1)) {
      console.error("Required columns are missing. Please ensure correct headers.");
      return [];
    }

    const rows = jsonData.slice(1).map(row => ({
      messageId: row[msgIdIndex],
      keyField: row[keyFieldIndex],
      responseStatus: row[responseStatusIndex],
      payloadJson: row[payloadJsonIndex],
      responseDateTime: row[responseDateIndex],
      csRemarks: csRemarksIndex !== -1 ? row[csRemarksIndex] : '',
      csProgressStatus: csProgressIndex !== -1 ? row[csProgressIndex] : '',
      logDescription: logDescriptionIndex !== -1 ? row[logDescriptionIndex] : ''
    }));

    return rows.filter(r => r.messageId);
  }

  function groupByKeyField(data) {
    const map = {};
    data.forEach(item => {
      const key = item.keyField;
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }

  function parseDate(dateValue) {
    if (dateValue instanceof Date) return dateValue;

    if (typeof dateValue === 'string') {
      // Assuming format "DD/MM/YYYY HH:MM:SS"
      const [datePart, timePart] = dateValue.split(' ');
      if (!datePart || !timePart) {
        return new Date();
      }
      const [day, month, year] = datePart.split('/');
      const [hour, min, sec] = timePart.split(':');
      return new Date(year, month - 1, day, hour, min, sec);
    }

    return new Date(); 
  }

  function sortMessagesByDate(messages) {
    return messages.sort((a, b) => parseDate(a.responseDateTime) - parseDate(b.responseDateTime));
  }

  function analyzeKeyFieldMessages(messages) {
    let hasSuccess = false;
    const successMessages = [];
    const failureMessages = [];

    for (const msg of messages) {
      const status = (msg.responseStatus || '').toLowerCase();
      if (status === 'success') {
        hasSuccess = true;
        successMessages.push(msg);
      } else if (status === 'failure') {
        failureMessages.push(msg);
      }
    }

    // Determine final considered message
    let finalMessage = null;
    if (hasSuccess) {
      // Final message is the last success message
      finalMessage = successMessages[successMessages.length - 1];
    } else {
      // If no success, final message is the last message in the sequence (all failures)
      finalMessage = messages[messages.length - 1];
    }

    // Odd behavior: success followed by failures
    let oddBehavior = false;
    if (hasSuccess) {
      const finalSuccessTime = parseDate(finalMessage.responseDateTime);
      for (const f of failureMessages) {
        if (parseDate(f.responseDateTime) > finalSuccessTime) {
          oddBehavior = true;
          break;
        }
      }
    }

    const successCount = successMessages.length;
    const failureCount = failureMessages.length;

    return { finalMessage, oddBehavior, successCount, failureCount };
  }

  function determineState(finalStatus, oddBehavior) {
    if (finalStatus.toLowerCase() === 'success') {
      return oddBehavior ? 'SO' : 'S';
    } else {
      return 'F';
    }
  }

  function analyzeData(data) {
    if (!data || data.length === 0) return [];

    const grouped = groupByKeyField(data);
    const results = [];

    for (const keyField in grouped) {
      const sortedMessages = sortMessagesByDate(grouped[keyField]);
      const { finalMessage, oddBehavior, successCount, failureCount } = analyzeKeyFieldMessages(sortedMessages);

      let finalStatus = 'No Success';
      let finalPayload = null;
      let csRemarks = '';
      let csProgressStatus = '';
      let logDescription = '';

      if (finalMessage) {
        finalStatus = finalMessage.responseStatus;
        finalPayload = finalMessage.payloadJson;
        csRemarks = finalMessage.csRemarks;
        csProgressStatus = finalMessage.csProgressStatus;
        logDescription = finalMessage.logDescription;
      }

      results.push({
        keyField,
        finalStatus,
        oddBehavior,
        successCount,
        failureCount,
        payloadJson: finalPayload,
        csRemarks,
        csProgressStatus,
        logDescription,
        finalState: determineState(finalStatus, oddBehavior)
      });
    }

    return results;
  }

  const toggleWrap = () => {
    setWrapPayload(!wrapPayload);
  };

  return (
    <div>
      <h1>Inbound Message Analysis</h1>
      <input type="file" onChange={handleFileUpload} accept=".xls,.xlsx" />
      <button onClick={toggleWrap} 
      style={{
        margin: '5px',
        padding: '5px 10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#f7f7f7',
        color: '#333',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#eaeaea'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#f7f7f7'}
      >
        {wrapPayload ? 'Disable Wrap' : 'Enable Wrap'}
      </button>

      {results && results.length > 0 && (
        <table border="1" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Key Field</th>
              <th>Final Status</th>
              <th>Odd Behavior?</th>
              <th>Success Count</th>
              <th>Failure Count</th>
              <th>CS Remarks</th>
              <th>CS Progress Status</th>
              <th>Log Description</th>
              <th>Payload JSON</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} style={{ backgroundColor: r.oddBehavior ? 'yellow' : 'white' }}>
                <td>{r.keyField}</td>
                <td>{r.finalStatus}</td>
                <td>{r.oddBehavior ? 'Yes' : 'No'}</td>
                <td>{r.successCount}</td>
                <td>{r.failureCount}</td>
                <td>{r.csRemarks}</td>
                <td>{r.csProgressStatus}</td>
                <td>{r.logDescription}</td>
                <td>
                  <pre style={{
                    maxWidth: '300px',
                    whiteSpace: wrapPayload ? 'pre-wrap' : 'pre',
                    overflowWrap: wrapPayload ? 'break-word' : 'normal',
                    wordBreak: wrapPayload ? 'break-all' : 'normal'
                  }}>
                    {r.payloadJson}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App3plSoInbound;
