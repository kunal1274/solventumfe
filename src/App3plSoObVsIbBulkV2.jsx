// App3plSoObVsIbBulk.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FixedSizeList as List } from 'react-window';

function App3plSoObVsIbBulk() {
  const [outboundData, setOutboundData] = useState([]);
  const [inboundData, setInboundData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [worker, setWorker] = useState(null);

  const initializeWorker = () => {
    const newWorker = new Worker(new URL('./worker.js', import.meta.url));
    newWorker.onmessage = (e) => {
      const { analyzedData, isOutbound } = e.data;
      if (isOutbound) {
        setOutboundData(analyzedData);
      } else {
        setInboundData(analyzedData);
      }
      setLoading(false);
      setProgressMessage('');
    };
    setWorker(newWorker);
  };

  const handleFileUpload = (e, isOutbound) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setProgressMessage(`Processing ${isOutbound ? 'outbound' : 'inbound'} file...`);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const arrayBuffer = evt.target.result;
      const binaryStr = new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '');

      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      worker.postMessage({ jsonData, isOutbound });
    };
    reader.readAsArrayBuffer(file); // Updated to use readAsArrayBuffer
  };

  const doComparison = () => {
    setLoading(true);
    setProgressMessage('Comparing data...');

    const inboundMap = inboundData.reduce((acc, item) => {
      acc[item.keyField] = item;
      return acc;
    }, {});

    const results = outboundData.map(outItem => {
      const inItem = inboundMap[outItem.keyField];
      return {
        keyField: outItem.keyField,
        outboundState: outItem.finalState,
        inboundState: inItem ? inItem.finalState : 'W',
        comparisonResult: `${outItem.finalState} vs ${inItem ? inItem.finalState : 'Waiting'}`
      };
    });

    setLoading(false);
    setProgressMessage('');
  };

  React.useEffect(() => {
    initializeWorker();
    return () => worker && worker.terminate();
  }, []);

  return (
    <div>
      <h1>Bulk Upload and Comparison</h1>

      <div>
        <h2>Upload Outbound File</h2>
        <input type="file" onChange={(e) => handleFileUpload(e, true)} accept=".xls,.xlsx" />
      </div>

      <div>
        <h2>Upload Inbound File</h2>
        <input type="file" onChange={(e) => handleFileUpload(e, false)} accept=".xls,.xlsx" />
      </div>

      <button onClick={doComparison} disabled={!outboundData.length || !inboundData.length || loading}>
        Compare Data
      </button>

      {loading && <div>{progressMessage}</div>}

      {outboundData.length > 0 && inboundData.length > 0 && (
        <List
          height={400}
          itemCount={outboundData.length}
          itemSize={50}
          width={800}
        >
          {({ index, style }) => {
            const result = outboundData[index];
            return (
              <div style={style}>
                {result.keyField}: {result.finalState}
              </div>
            );
          }}
        </List>
      )}
    </div>
  );
}

export default App3plSoObVsIbBulk;
