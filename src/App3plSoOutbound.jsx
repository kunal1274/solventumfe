import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function AppMulesoftAnalysisV1() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("File selected:", file.name);

    const reader = new FileReader();

    reader.onload = (evt) => {
      console.log("File reading completed.");
      try {
        const binaryStr = evt.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        console.log("Workbook loaded. First sheet:", sheetName);

        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log("Sheet converted to JSON (array of arrays):", jsonData);

        const formattedData = parseData(jsonData);
        console.log("Formatted data:", formattedData);

        setData(formattedData);

        const analysis = analyzeData(formattedData);
        console.log("Analysis results:", analysis);

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

  // Parse the raw 2D array from XLSX into structured objects
  function parseData(jsonData) {
    if (jsonData.length === 0) {
      console.log("No data found in the uploaded file.");
      return [];
    }

    const headers = jsonData[0];
    console.log("Headers found:", headers);

    const msgIdIndex = headers.indexOf('Message Id');
    const keyFieldIndex = headers.indexOf('Key field');
    const responseStatusIndex = headers.indexOf('Response status');
    const payloadJsonIndex = headers.indexOf('Payload JSON');
    const responseDateIndex = headers.indexOf('Response date and time');

    if (msgIdIndex === -1 || keyFieldIndex === -1 || responseStatusIndex === -1 || payloadJsonIndex === -1 || responseDateIndex === -1) {
      console.error("One or more required columns (Message Id, Key field, Response status, Payload JSON, Response date and time) are missing.");
      return [];
    }

    const rows = jsonData.slice(1).map(row => {
      return {
        messageId: row[msgIdIndex],
        keyField: row[keyFieldIndex],
        responseStatus: row[responseStatusIndex],
        payloadJson: row[payloadJsonIndex],
        responseDateTime: row[responseDateIndex]
      };
    });

    // Filter out empty rows (in case some rows are blank)
    const filteredRows = rows.filter(r => r.messageId);
    console.log("Parsed and filtered rows:", filteredRows);

    return filteredRows;
  }

  // Group messages by keyField
  function groupByKeyField(data) {
    const map = {};
    data.forEach(item => {
      const key = item.keyField;
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }

  // Parse date from a string
  function parseDate(dateString) {
    if (!dateString) {
      // If it's falsy, return current date or handle as needed
      return new Date();
    }
  
    // If dateString is already a Date object, just return it
    if (dateString instanceof Date) {
      return dateString;
    }
  
    // If it's not a Date instance, assume it's a string
    if (typeof dateString === 'string') {
      // If in "DD/MM/YYYY HH:MM:SS" format
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('/');
      const [hour, min, sec] = timePart.split(':');
      return new Date(year, month - 1, day, hour, min, sec);
    }
  
    // If it's neither a Date nor a string, fallback
    return new Date();
  }
  

  // Sort messages by responseDateTime
  function sortMessagesByDate(messages) {
    return messages.sort((a, b) => parseDate(a.responseDateTime) - parseDate(b.responseDateTime));
  }

  // Analyze each keyField's messages to find final considered message and odd behavior
  function analyzeKeyFieldMessages(messages) {
    let hasSuccess = false;
    let oddBehavior = false;
    let finalMessage = null;

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const status = (msg.responseStatus || '').toLowerCase();

      if (status === 'success') {
        if (!hasSuccess) {
          // First success encountered
          hasSuccess = true;
          finalMessage = msg;
        } else {
          // Multiple successes?
          // Set the final message to this latest success, and optionally set oddBehavior if desired.
          finalMessage = msg;
        }
      } else if (status === 'failure') {
        if (hasSuccess) {
          // Failure after success => odd
          oddBehavior = true;
        }
      }
    }

    return { finalMessage, oddBehavior };
  }

  // Main analysis function for all data
  function analyzeData(data) {
    if (!data || data.length === 0) {
      console.log("No data to analyze.");
      return [];
    }

    const grouped = groupByKeyField(data);
    console.log("Data grouped by keyField:", grouped);

    const results = [];

    for (const keyField in grouped) {
      const sortedMessages = sortMessagesByDate(grouped[keyField]);
      console.log(`Messages for keyField ${keyField} sorted by date:`, sortedMessages);

      const { finalMessage, oddBehavior } = analyzeKeyFieldMessages(sortedMessages);

      if (finalMessage) {
        results.push({
          keyField,
          finalStatus: finalMessage.responseStatus,
          finalMessageId: finalMessage.messageId,
          payloadJson: finalMessage.payloadJson,
          oddBehavior
        });
      } else {
        // No success found for this keyField
        results.push({
          keyField,
          finalStatus: 'No Success',
          finalMessageId: null,
          payloadJson: null,
          oddBehavior: false
        });
      }
    }

    return results;
  }

  return (
    <div>
      <h1>Outbound Message Analysis</h1>
      <input type="file" onChange={handleFileUpload} accept=".xls,.xlsx" />
      {results && results.length > 0 && (
        <table border="1" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Key Field</th>
              <th>Final Status</th>
              <th>Odd Behavior?</th>
              <th>Payload JSON</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} style={{ backgroundColor: r.oddBehavior ? 'yellow' : 'white' }}>
                <td>{r.keyField}</td>
                <td>{r.finalStatus}</td>
                <td>{r.oddBehavior ? 'Yes' : 'No'}</td>
                <td>
                  <pre style={{ maxWidth: '300px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
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



function AppMulesoftAnalysisV2() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  

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

    // Find indexes of relevant columns
    const msgIdIndex = headers.indexOf('Message Id');
    const keyFieldIndex = headers.indexOf('Key field');
    const responseStatusIndex = headers.indexOf('Response status');
    const payloadJsonIndex = headers.indexOf('Payload JSON');
    const responseDateIndex = headers.indexOf('Response date and time');
    const csRemarksIndex = headers.indexOf('CS Remarks');
    const csProgressIndex = headers.indexOf('CS Progress Status');
    const logDescriptionIndex = headers.indexOf('Log description');

    // Check columns
    const requiredIndexes = [msgIdIndex, keyFieldIndex, responseStatusIndex, payloadJsonIndex, responseDateIndex];
    if (requiredIndexes.includes(-1)) {
      console.error("Required columns are missing.");
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
      const [datePart, timePart] = dateValue.split(' ');
      if (!datePart || !timePart) {
        // If not properly formatted, just return new Date()
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

    // Determine final message
    let finalMessage = null;
    if (hasSuccess) {
      // Final message is the last success message
      finalMessage = successMessages[successMessages.length - 1];
    } else {
      // No success: final message is the last message (which will be last in sorted order)
      finalMessage = messages[messages.length - 1]; 
    }

    // Determine oddBehavior: if failures come after a success
    let oddBehavior = false;
    if (hasSuccess) {
      // If there are any failure messages after the last success message time, odd behavior
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
        logDescription
      });
    }

    return results;
  }

  return (
    <div>
      <h1>Outbound Message Analysis</h1>
      <input type="file" onChange={handleFileUpload} accept=".xls,.xlsx" />
      

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
                  <pre style={{ maxWidth: '300px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
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


function App3plSoOutbound() {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [wrapPayload, setWrapPayload] = useState(false); // State for toggling wrap

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
      console.error("Required columns are missing.");
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

    let finalMessage = null;
    if (hasSuccess) {
      finalMessage = successMessages[successMessages.length - 1];
    } else {
      finalMessage = messages[messages.length - 1]; 
    }

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
      <h1>Outbound Message Analysis</h1>
      <input type="file" onChange={handleFileUpload} accept=".xls,.xlsx" />
      
      <button 
  onClick={toggleWrap} 
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





export default App3plSoOutbound;
