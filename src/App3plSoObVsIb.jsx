import React, { useState } from 'react';
import * as XLSX from 'xlsx';

// Simple inline CSS for a spinner
const spinnerStyle = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
};

// Add the CSS keyframes for spinner animation
const spinnerAnimation = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Insert spinner keyframes into the document's head (just once)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = spinnerAnimation;
  document.head.appendChild(style);
}

function determineState(finalStatus, oddBehavior) {
  if (finalStatus.toLowerCase() === 'success') {
    return oddBehavior ? 'SO' : 'S';
  } else {
    return 'F';
  }
}

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

    const finalState = determineState(finalStatus, oddBehavior);

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
      finalState
    });
  }

  return results;
}

// CHANGED: Updated compareStates to handle 'W' (Waiting) inbound state
function compareStates(outState, inState) {
  // Handle 'W' (Waiting) state
  if (inState === 'W') { // ADDED
    if (outState === 'S') return 'Outbound success, Inbound waiting';
    if (outState === 'SO') return 'Outbound success (odd), Inbound waiting';
    if (outState === 'F') return 'Outbound failure, Inbound waiting';
    if (outState === 'W') return 'Both sides waiting (no inbound data)?'; // edge case
  }

  if (outState === 'S' && inState === 'S') return 'Both sides: Successful';
  if (outState === 'S' && inState === 'SO') return 'Outbound success (clean), Inbound success (odd)';
  if (outState === 'S' && inState === 'F') return 'Outbound success, Inbound failure';
  if (outState === 'SO' && inState === 'S') return 'Outbound success (odd), Inbound success (clean)';
  if (outState === 'SO' && inState === 'SO') return 'Both success odd';
  if (outState === 'SO' && inState === 'F') return 'Outbound success (odd), Inbound failure';
  if (outState === 'F' && inState === 'S') return 'Outbound failure, Inbound success';
  if (outState === 'F' && inState === 'SO') return 'Outbound failure, Inbound success (odd)';
  if (outState === 'F' && inState === 'F') return 'Both failure';
  return 'Unknown combination';
}

function App3plSoObVsIb() {
  const [outboundData, setOutboundData] = useState([]);
  const [inboundData, setInboundData] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [wrapLogs, setWrapLogs] = useState(false); // For wrapping logs

  const handleOutboundUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setProgressMessage('Reading outbound file...');

    const reader = new FileReader();
    reader.onload = (evt) => {
      setProgressMessage('Parsing outbound data...');
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setProgressMessage('Analyzing outbound data...');
      const formattedData = parseData(jsonData);
      const analysis = analyzeData(formattedData);
      setOutboundData(analysis);
      setLoading(false);
      setProgressMessage('');
    };
    reader.readAsBinaryString(file);
  };

  const handleInboundUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setProgressMessage('Reading inbound file...');

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setProgressMessage('Analyzing inbound data...');
      const formattedData = parseData(jsonData);
      const analysis = analyzeData(formattedData);
      setInboundData(analysis);
      setLoading(false);
      setProgressMessage('');
    };
    reader.readAsBinaryString(file);
  };

  const doComparison = () => {
    setLoading(true);
    setProgressMessage('Comparing outbound vs inbound results...');

    const inboundMap = {};
    inboundData.forEach(item => {
      inboundMap[item.keyField] = item;
    });

    const results = outboundData.map(outItem => {
      const inItem = inboundMap[outItem.keyField];
      // CHANGED: If no inbound, inboundState = 'W' instead of 'F'
      const inboundState = inItem ? inItem.finalState : 'W'; // Changed 'F' to 'W'
      
      const outboundState = outItem.finalState;
      const comparisonMessage = compareStates(outboundState, inboundState);

      const outboundSuccessCount = outItem.successCount;
      const outboundFailureCount = outItem.failureCount;
      const inboundSuccessCount = inItem ? inItem.successCount : 0;
      const inboundFailureCount = inItem ? inItem.failureCount : 0;

      const outboundLogDescription = outItem.logDescription || '';
      const inboundLogDescription = inItem ? (inItem.logDescription || '') : '';

      // ADDED: Extract payloadJson from both sides
      const outboundPayloadJson = outItem.payloadJson || '';
      const inboundPayloadJson = inItem ? (inItem.payloadJson || '') : '';

      return {
        keyField: outItem.keyField,
        outboundState,
        inboundState,
        comparisonMessage,
        outboundSuccessCount,
        outboundFailureCount,
        inboundSuccessCount,
        inboundFailureCount,
        outboundLogDescription,
        inboundLogDescription,
        outboundPayloadJson, // NEW FIELD
        inboundPayloadJson   // NEW FIELD
      };
    });

    setComparisonResults(results);
    setLoading(false);
    setProgressMessage('');
  };

  const toggleWrapLogs = () => {
    setWrapLogs(!wrapLogs);
  };

  return (
    <div>
      <h1>Compare Outbound vs Inbound</h1>
      <div>
        <h2>Upload Outbound File</h2>
        <input type="file" onChange={handleOutboundUpload} accept=".xls,.xlsx" />
      </div>
      <div>
        <h2>Upload Inbound File</h2>
        <input type="file" onChange={handleInboundUpload} accept=".xls,.xlsx" />
      </div>

      <button 
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
        onClick={doComparison} disabled={outboundData.length === 0 || inboundData.length === 0 || loading}
      >
        Compare
      </button>

      {comparisonResults.length > 0 && !loading && (
        <button 
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
          onClick={toggleWrapLogs}
        >
          {wrapLogs ? 'Disable Wrap for Logs' : 'Enable Wrap for Logs'}
        </button>
      )}

      {loading && (
        <div style={{ margin: '20px', textAlign: 'center' }}>
          <div style={spinnerStyle}></div>
          <p>{progressMessage}</p>
        </div>
      )}

      {comparisonResults.length > 0 && !loading && (
        <table border="1" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Key Field</th>
              <th>Outbound Final State</th>
              <th>Inbound Final State</th>
              <th>Comparison Result</th>
              <th>Outbound Success Count</th>
              <th>Outbound Failure Count</th>
              <th>Inbound Success Count</th>
              <th>Inbound Failure Count</th>
              <th>Outbound Log Description</th>
              <th>Inbound Log Description</th>
              <th>Outbound Payload JSON</th> {/* NEW COLUMN */}
              <th>Inbound Payload JSON</th>   {/* NEW COLUMN */}
            </tr>
          </thead>
          <tbody>
            {comparisonResults.map((r, i) => (
              <tr key={i}>
                <td>{r.keyField}</td>
                <td>{r.outboundState}</td>
                <td>{r.inboundState}</td>
                <td>{r.comparisonMessage}</td>
                <td>{r.outboundSuccessCount}</td>
                <td>{r.outboundFailureCount}</td>
                <td>{r.inboundSuccessCount}</td>
                <td>{r.inboundFailureCount}</td>
                <td>
                  <div style={{
                    whiteSpace: wrapLogs ? 'pre-wrap' : 'pre',
                    overflowWrap: wrapLogs ? 'break-word' : 'normal',
                    wordBreak: wrapLogs ? 'break-all' : 'normal',
                    maxWidth: '300px'
                  }}>
                    {r.outboundLogDescription}
                  </div>
                </td>
                <td>
                  <div style={{
                    whiteSpace: wrapLogs ? 'pre-wrap' : 'pre',
                    overflowWrap: wrapLogs ? 'break-word' : 'normal',
                    wordBreak: wrapLogs ? 'break-all' : 'normal',
                    maxWidth: '300px'
                  }}>
                    {r.inboundLogDescription}
                  </div>
                </td>
                <td>
                  {/* Outbound Payload JSON */}
                  <div style={{
                    whiteSpace: wrapLogs ? 'pre-wrap' : 'pre',
                    overflowWrap: wrapLogs ? 'break-word' : 'normal',
                    wordBreak: wrapLogs ? 'break-all' : 'normal',
                    maxWidth: '300px'
                  }}>
                    {r.outboundPayloadJson}
                  </div>
                </td>
                <td>
                  {/* Inbound Payload JSON */}
                  <div style={{
                    whiteSpace: wrapLogs ? 'pre-wrap' : 'pre',
                    overflowWrap: wrapLogs ? 'break-word' : 'normal',
                    wordBreak: wrapLogs ? 'break-all' : 'normal',
                    maxWidth: '300px'
                  }}>
                    {r.inboundPayloadJson}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App3plSoObVsIb;
