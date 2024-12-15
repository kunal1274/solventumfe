import React, { useState,useMemo,useEffect } from 'react';
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



const InboundDisplay = ({ inboundData }) => {
    return (
      <div>
        <h2>Inbound Packing Slips</h2>
        {inboundData && inboundData.length > 0 ? (
          inboundData.map((pack, packIndex) => (
            <div key={packIndex} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
              <h3>Inbound Packing Slip: {pack.sOPackingSlipHeader.salesId}</h3>
  
              <section>
                <h4>Request Header</h4>
                <p><strong>Message ID:</strong> {pack.requestHeader.messageId}</p>
                <p><strong>Country Code:</strong> {pack.requestHeader.countryCode}</p>
                <p><strong>Sender ID:</strong> {pack.requestHeader.senderId}</p>
                <p><strong>Receiver ID:</strong> {pack.requestHeader.receiverId}</p>
                <p><strong>Date Time:</strong> {pack.requestHeader.dateTime}</p>
              </section>
  
              <section>
                <h4>Packing Slip Header</h4>
                <p><strong>Sales ID (Unique Ref):</strong> {pack.sOPackingSlipHeader.salesId}</p>
                <p><strong>Ship Date:</strong> {pack.sOPackingSlipHeader.shipDate}</p>
                <p><strong>Legal Entity Code:</strong> {pack.sOPackingSlipHeader.legalEntityCode}</p>
              </section>
  
              <section>
                <h4>Packing Slip Lines</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #000' }}>Line #</th>
                      <th style={{ border: '1px solid #000' }}>Item</th>
                      <th style={{ border: '1px solid #000' }}>Delivered</th>
                      <th style={{ border: '1px solid #000' }}>Batch Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pack.sOPackingSlipHeader.sOPackingSlipLine && pack.sOPackingSlipHeader.sOPackingSlipLine.map((line, lineIndex) => (
                      <tr key={lineIndex}>
                        <td style={{ border: '1px solid #000' }}>{line.lineNumber}</td>
                        <td style={{ border: '1px solid #000' }}>{line.item}</td>
                        <td style={{ border: '1px solid #000' }}>{line.delivered}</td>
                        <td style={{ border: '1px solid #000' }}>
                          {line.sOPackingSlipBatchDetails && line.sOPackingSlipBatchDetails.length > 0 ? (
                            <ul>
                              {line.sOPackingSlipBatchDetails.map((batch, batchIndex) => (
                                <li key={batchIndex}>
                                  Qty: {batch.batchedOrderQuantity}, Batch#: {batch.itemBatchNumber}, Expiry: {batch.batchExpiryDate}, Status: {batch.batchProductStatus}
                                </li>
                              ))}
                            </ul>
                          ) : 'No batch details'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          ))
        ) : (
          <p>No inbound packing slips found.</p>
        )}
      </div>
    );
  };

  const Comparison = ({ outboundData, inboundData }) => {

    if (!outboundData || !Array.isArray(outboundData)) {
        console.error("Comparison Error: Missing or invalid outbound data", outboundData);
        return <p>No valid Outbound Data available for comparison.</p>;
      }
    
      if (!inboundData || !Array.isArray(inboundData)) {
        console.error("Comparison Error: Missing or invalid inbound data", inboundData);
        return <p>No valid Inbound Data available for comparison.</p>;
      }
    // Create a map for all inbound lines keyed by "salesId-lineNumber"
    const inboundMap = useMemo(() => {
      const map = {};
      inboundData.forEach(pack => {
        const salesId = pack.sOPackingSlipHeader.salesId; // e.g., AUA-0000091-02
        pack.sOPackingSlipHeader.sOPackingSlipLine.forEach(inLine => {
          const key = `${salesId}-${inLine.lineNumber}`;
          map[key] = inLine;
        });
      });
      return map;
    }, [inboundData]);
  
    return (
      <div>
        <h2>Outbound vs Inbound Comparison</h2>
        {outboundData && outboundData.length > 0 ? (
          outboundData.map((order, orderIndex) => {
            const orderUniqueRef = order.sOHeader.orderUniqueReference;  // e.g., AUA-0000091-02
            return (
              <div key={orderIndex} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
                <h3>Comparing Order: {orderUniqueRef}</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid #000' }}>Line #</th>
                      <th style={{ border: '1px solid #000' }}>Item</th>
                      <th style={{ border: '1px solid #000' }}>Outbound Qty</th>
                      <th style={{ border: '1px solid #000' }}>Inbound Total Qty</th>
                      <th style={{ border: '1px solid #000' }}>Difference</th>
                      <th style={{ border: '1px solid #000' }}>Inbound Batch Breakdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.sOHeader.sOLines && order.sOHeader.sOLines.map((outLine, lineIndex) => {
                      // Key by the unique reference and line number
                      const key = `${orderUniqueRef}-${outLine.lineNumber}`;
                      const inboundLine = inboundMap[key];
  
                      let inboundTotal = 0;
                      let inboundBatches = [];
                      if (inboundLine && inboundLine.sOPackingSlipBatchDetails) {
                        inboundBatches = inboundLine.sOPackingSlipBatchDetails;
                        inboundTotal = inboundBatches.reduce((sum, b) => sum + b.batchedOrderQuantity, 0);
                      }
  
                      const difference = outLine.orderedSalesQuantity - inboundTotal;
  
                      return (
                        <tr key={lineIndex}>
                          <td style={{ border: '1px solid #000' }}>{outLine.lineNumber}</td>
                          <td style={{ border: '1px solid #000' }}>{outLine.itemNumber}</td>
                          <td style={{ border: '1px solid #000' }}>{outLine.orderedSalesQuantity}</td>
                          <td style={{ border: '1px solid #000' }}>{inboundTotal}</td>
                          <td style={{ border: '1px solid #000', color: difference === 0 ? 'green' : 'red' }}>
                            {difference}
                          </td>
                          <td style={{ border: '1px solid #000' }}>
                            {inboundBatches.length > 0 ? (
                              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                  <tr>
                                    <th style={{ border: '1px solid #000' }}>Batch #</th>
                                    <th style={{ border: '1px solid #000' }}>Qty</th>
                                    <th style={{ border: '1px solid #000' }}>Expiry</th>
                                    <th style={{ border: '1px solid #000' }}>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {inboundBatches.map((batch, bIndex) => (
                                    <tr key={bIndex}>
                                      <td style={{ border: '1px solid #000' }}>{batch.itemBatchNumber}</td>
                                      <td style={{ border: '1px solid #000' }}>{batch.batchedOrderQuantity}</td>
                                      <td style={{ border: '1px solid #000' }}>{batch.batchExpiryDate}</td>
                                      <td style={{ border: '1px solid #000' }}>{batch.batchProductStatus}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : 'No inbound batch data'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })
        ) : (
          <p>No outbound orders found for comparison.</p>
        )}
      </div>
    );
  };
  
  const ComplexComparison = ({ outboundData, inboundData, actualQuantities }) => {
    // actualQuantities is an object keyed by (salesOrderNumber-lineNumber-itemNumber)
    // e.g., actualQuantities["AUA-0000091-1-70201408807"] = 70
    // If you don't have it yet, you can hardcode or pass a default.

    if (!outboundData || !Array.isArray(outboundData)) {
        console.error("ComplexComparison Error: outboundData is not valid", outboundData);
        return <p>Invalid Outbound Data</p>;
      }
    
      if (!inboundData || !Array.isArray(inboundData)) {
        console.error("ComplexComparison Error: inboundData is not valid", inboundData);
        return <p>Invalid Inbound Data</p>;
      }
    
  
    // 1. Build an inbound map for quick lookup
    const inboundMap = useMemo(() => {
      const map = {};
      inboundData.forEach(pack => {
        const salesId = pack.sOPackingSlipHeader.salesId; // e.g. AUA-0000091-01 or AUA-0000091-02
        pack.sOPackingSlipHeader.sOPackingSlipLine.forEach(inLine => {
          const key = `${salesId}-${inLine.lineNumber}`;
          map[key] = inLine;
        });
      });
      return map;
    }, [inboundData]);
  
    // 2. Group outbound lines by (salesOrderNumber, lineNumber, itemNumber)
    // Structure:
    // groupedData = {
    //   "AUA-0000091-1-70201408807": {
    //       salesOrderNumber: "AUA-0000091",
    //       lineNumber: 1,
    //       itemNumber: "70201408807",
    //       outbounds: [
    //          { orderUniqueReference: "AUA-0000091-01", orderedSalesQuantity: 40, ... , inboundBatches: [...], inboundTotal: ... , difference: ... },
    //          { orderUniqueReference: "AUA-0000091-02", orderedSalesQuantity: 21, ... , inboundBatches: [...], inboundTotal: ... , difference: ... }
    //       ]
    //   }
    // }
  
    const groupedData = useMemo(() => {
      const group = {};
      outboundData.forEach(order => {
        const baseSalesOrderNumber = order.sOHeader.salesOrderNumber;  // e.g. AUA-0000091-02
        const orderUniqueRef = order.sOHeader.orderUniqueReference;    // e.g. AUA-0000091-02
        order.sOHeader.sOLines.forEach(line => {
          const { lineNumber, itemNumber, orderedSalesQuantity, sOBatchDetails, sOSerialDetails, productStatus } = line;
          
          // For the grouping, we use the BASE sales order number from the outbound line.
          // Note: The outbound line might show salesOrderNumber = "AUA-0000091" (base), 
          // but sOHeader orderUniqueReference = "AUA-0000091-02".
          // We'll use sOHeader.salesOrderNumber as the "base" order number
          // (If needed, confirm which field is the correct "base" number.)
          
          // Let's assume the "Sales Order No" column is the base from sOHeader.salesOrderNumber
          const salesOrderNo = order.sOHeader.salesOrderNumber.split('-')[0]; // "AUA-0000091"
          const key = `${salesOrderNo}-${lineNumber}-${itemNumber}`;
          
          if (!group[key]) {
            group[key] = {
              salesOrderNumber: salesOrderNo,
              lineNumber,
              itemNumber,
              outbounds: []
            };
          }
  
          // Find inbound line match
          const inboundKey = `${orderUniqueRef}-${lineNumber}`;
          const inboundLine = inboundMap[inboundKey];
          
          let inboundTotal = 0;
          let inboundBatches = [];
          if (inboundLine && inboundLine.sOPackingSlipBatchDetails) {
            inboundBatches = inboundLine.sOPackingSlipBatchDetails;
            inboundTotal = inboundBatches.reduce((sum, b) => sum + b.batchedOrderQuantity, 0);
          }
  
          const difference = orderedSalesQuantity - inboundTotal;
  
          group[key].outbounds.push({
            orderUniqueReference: orderUniqueRef,
            orderedSalesQuantity,
            outboundBatchDetails: sOBatchDetails,
            outboundSerialDetails: sOSerialDetails,
            productStatus,
            inboundTotal,
            difference,
            inboundBatches
          });
        });
      });
      return group;
    }, [outboundData, inboundMap]);
  
    // We'll create a single table with all data.
    // For each group (Sales Order No, Line#, Item#):
    // - Print one big row group:
    //   - First we print the "Sales Order No", "Line #", "Item Number", "SO Line Actual Qty" in a cell that spans all outbounds for this group.
    //   - Then for each outbound line in the group, we print one or multiple rows depending on inbound batches.
    //   - The first row for that outbound line will show Outbound Ref, Outbound Ordered Qty, etc.
    //   - If multiple inbound batches, subsequent rows show only inbound batch details.
  
    // Helper to get SO line actual qty:
    // If not provided, we can hardcode or default to a known value.
    const getActualQty = (salesOrderNumber, lineNumber, itemNumber) => {
      const key = `${salesOrderNumber}-${lineNumber}-${itemNumber}`;
      return actualQuantities && actualQuantities[key] != null ? actualQuantities[key] : 'N/A';
    };
  
    // Convert groupedData to an array for iteration
    const groupArray = Object.values(groupedData);
  
    return (
      <div>
        <h2>Complex Comparison Table</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000' }}>Sales Order No</th>
              <th style={{ border: '1px solid #000' }}>Line #</th>
              <th style={{ border: '1px solid #000' }}>Item Number</th>
              <th style={{ border: '1px solid #000' }}>SO Line Actual Qty</th>
              <th style={{ border: '1px solid #000' }}>Outbound Ref</th>
              <th style={{ border: '1px solid #000' }}>Outbound Ordered Qty</th>
              <th style={{ border: '1px solid #000' }}>Outbound Batch Details</th>
              <th style={{ border: '1px solid #000' }}>Outbound Serial Details</th>
              <th style={{ border: '1px solid #000' }}>Inbound Total Qty</th>
              <th style={{ border: '1px solid #000' }}>Difference</th>
              <th style={{ border: '1px solid #000' }}>Batch #</th>
              <th style={{ border: '1px solid #000' }}>Qty</th>
              <th style={{ border: '1px solid #000' }}>Expiry</th>
              <th style={{ border: '1px solid #000' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {groupArray.map((group, groupIndex) => {
              const { salesOrderNumber, lineNumber, itemNumber, outbounds } = group;
              
              // *** ADDED THIS LINE ***
              // Before constructing rows, we sort `outbounds` by lineNumber to ensure ascending order.
              outbounds.sort((a, b) => a.lineNumber - b.lineNumber); // *** ADDED THIS LINE ***
  
              // Determine the total row span for the leftmost four columns
              // Each outbound line may have multiple inbound batches
              // We sum the maximum inbound batches rows for each outbound line.
              const lineRowDetails = outbounds.map(ob => {
                const batchCount = ob.inboundBatches.length || 1; // at least 1 row if no batches
                return { ...ob, batchCount };
              });
  
              const totalRowsForGroup = lineRowDetails.reduce((sum, ob) => sum + ob.batchCount, 0);
  
              const soLineActualQty = getActualQty(salesOrderNumber, lineNumber, itemNumber);
  
              return (
                <React.Fragment key={groupIndex}>
                  {lineRowDetails.map((obLine, obLineIndex) => {
                    const { orderUniqueReference, orderedSalesQuantity, outboundBatchDetails, outboundSerialDetails, inboundTotal, difference, inboundBatches, batchCount } = obLine;
  
                    const outboundBatchStr = outboundBatchDetails && outboundBatchDetails.length > 0
                      ? outboundBatchDetails.map(b => `Qty: ${b.batchedOrderQuantity}, Batch#: ${b.itemBatchNumber || 'N/A'}`).join(' | ')
                      : 'No batch details';
  
                    const outboundSerialStr = outboundSerialDetails && outboundSerialDetails.length > 0
                      ? outboundSerialDetails.map(s => s.serialNumber || 'No Serial').join(', ')
                      : 'No Serial';
  
                    return inboundBatches.length > 0 ? (
                      inboundBatches.map((batch, batchIndex) => {
                        const isFirstRowOfGroup = (obLineIndex === 0 && batchIndex === 0);
                        const printGroupColumns = isFirstRowOfGroup;
                        const printOutboundColumns = (batchIndex === 0);
  
                        return (
                          <tr key={`${obLineIndex}-${batchIndex}`} style={{ border: '1px solid #000' }}>
                            {printGroupColumns ? (
                              <>
                                <td style={{ border: '1px solid #000', verticalAlign: 'top' }} rowSpan={totalRowsForGroup}>{salesOrderNumber}</td>
                                <td style={{ border: '1px solid #000', verticalAlign: 'top' }} rowSpan={totalRowsForGroup}>{lineNumber}</td>
                                <td style={{ border: '1px solid #000', verticalAlign: 'top' }} rowSpan={totalRowsForGroup}>{itemNumber}</td>
                                <td style={{ border: '1px solid #000', verticalAlign: 'top' }} rowSpan={totalRowsForGroup}>{soLineActualQty}</td>
                              </>
                            ) : null}
  
                            {printOutboundColumns ? (
                              <>
                                <td style={{ border: '1px solid #000' }}>{orderUniqueReference}</td>
                                <td style={{ border: '1px solid #000' }}>{orderedSalesQuantity}</td>
                                <td style={{ border: '1px solid #000' }}>{outboundBatchStr}</td>
                                <td style={{ border: '1px solid #000' }}>{outboundSerialStr}</td>
                                <td style={{ border: '1px solid #000' }}>{inboundTotal}</td>
                                <td style={{ border: '1px solid #000', color: difference !== 0 ? 'red' : 'green' }}>{difference}</td>
                              </>
                            ) : (
                              <>
                                <td style={{ border: '1px solid #000' }}></td>
                                <td style={{ border: '1px solid #000' }}></td>
                                <td style={{ border: '1px solid #000' }}></td>
                                <td style={{ border: '1px solid #000' }}></td>
                                <td style={{ border: '1px solid #000' }}></td>
                                <td style={{ border: '1px solid #000' }}></td>
                              </>
                            )}
  
                            <td style={{ border: '1px solid #000' }}>{batch.itemBatchNumber}</td>
                            <td style={{ border: '1px solid #000' }}>{batch.batchedOrderQuantity}</td>
                            <td style={{ border: '1px solid #000' }}>{batch.batchExpiryDate}</td>
                            <td style={{ border: '1px solid #000' }}>{batch.batchProductStatus}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr key={obLineIndex}>
                        {obLineIndex === 0 ? (
                          <>
                            <td style={{ border: '1px solid #000', verticalAlign: 'top' }} rowSpan={totalRowsForGroup}>{salesOrderNumber}</td>
                            <td style={{ border: '1px solid #000', verticalAlign: 'top' }} rowSpan={totalRowsForGroup}>{lineNumber}</td>
                            <td style={{ border: '1px solid #000', verticalAlign: 'top' }} rowSpan={totalRowsForGroup}>{itemNumber}</td>
                            <td style={{ border: '1px solid #000', verticalAlign: 'top' }} rowSpan={totalRowsForGroup}>{soLineActualQty}</td>
                          </>
                        ) : null}
                        <td style={{ border: '1px solid #000' }}>{orderUniqueReference}</td>
                        <td style={{ border: '1px solid #000' }}>{orderedSalesQuantity}</td>
                        <td style={{ border: '1px solid #000' }}>{outboundBatchStr}</td>
                        <td style={{ border: '1px solid #000' }}>{outboundSerialStr}</td>
                        <td style={{ border: '1px solid #000' }}>{inboundTotal}</td>
                        <td style={{ border: '1px solid #000', color: difference !== 0 ? 'red' : 'green' }}>{difference}</td>
                        <td style={{ border: '1px solid #000' }}>No inbound batch data</td>
                        <td style={{ border: '1px solid #000' }}></td>
                        <td style={{ border: '1px solid #000' }}></td>
                        <td style={{ border: '1px solid #000' }}></td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };



function App3plSoObVsIbBulk() {
  const [outboundData, setOutboundData] = useState([]);
  const [inboundData, setInboundData] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [wrapLogs, setWrapLogs] = useState(false); // For wrapping logs

  // Modal state to display JSON payload
  const [modalContent, setModalContent] = useState(null);

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
        console.log("Check 1",outItem?.payloadJson?.sOHeader)
        console.log("Check 2",inItem?.payloadJson?.sOPackingSlipHeader)
      const outLineCount = outItem?.payloadJson?.sOHeader?.sOLines?.length || 0;
    const inLineCount = inItem?.payloadJson?.sOPackingSlipHeader?.sOPackingSlipLine?.length || 0; 
    const outWh = outItem?.payloadJson?.sOHeader?.shippingWareHouseId || "Missing WH";

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
        inboundPayloadJson,   // NEW FIELD
        outLineCount,
        inLineCount,
        outWh

      };
    });

    setComparisonResults(results);
    setLoading(false);
    setProgressMessage('');
  };

  const toggleWrapLogs = () => {
    setWrapLogs(!wrapLogs);
  };

  const parseJsonPayload = (payload) => {
    try {
      const parsed = JSON.parse(payload);
      return Array.isArray(parsed) ? parsed : [parsed]; // Ensure data is always an array
    } catch (error) {
      alert('Invalid JSON provided. Please correct it and try again.');
      return [];
    }
  };
  

  const openOutboundModal = (outboundDataParam) => {
    if (outboundDataParam && outboundDataParam.length > 0) {
      setModalContent(<OutboundDisplay outboundData={parseJsonPayload(outboundDataParam)} />);
    } else {
      setModalContent(<p>No Outbound Payload Available</p>);
    }
  };

  const openInboundModal = (inboundDataParam) => {
    if (inboundDataParam && inboundDataParam.length > 0) {
      setModalContent(<InboundDisplay inboundData={parseJsonPayload(inboundDataParam)} />);
    } else {
      setModalContent(<p>No Inbound Payload Available</p>);
    }
  };

  const openObAndIbModal = (obDataParam, ibDataParam) => {
    try {
      const obData = obDataParam ? parseJsonPayload(obDataParam) : ["NA"];
      const ibData = ibDataParam ? parseJsonPayload(ibDataParam) : ["NA"];
  
      if (!Array.isArray(obData) || !Array.isArray(ibData)) {
        throw new Error("Invalid Outbound or Inbound Data Format");
      }
  
      if (obData.length > 0 && ibData.length > 0) {
        setModalContent(
          <>
            <Comparison outboundData={obData} inboundData={ibData} />
            <ComplexComparison outboundData={obData} inboundData={ibData} actualQuantities={70} />
          </>
        );
      } else {
        setModalContent(<p>No Outbound or Inbound Payload Available for comparison</p>);
      }
    } catch (error) {
      console.error("Error in openObAndIbModal:", error);
      setModalContent(
        <p style={{ color: 'red' }}>An error occurred: {error.message}. Please check your payloads.</p>
      );
    }
  };
  

//   const openObAndIbModalV2 = (obDataParam, ibDataParam) => {
//     try {
//       const obData = obDataParam ? parseJsonPayload(obDataParam) : ["NA"];
//       const ibData = ibDataParam ? parseJsonPayload(ibDataParam) : ["NA"];
  
//       if (obData.length > 0 && ibData.length > 0) {
//         setModalContent(
//           <>
//             {/* Show both comparison components */}
//             <Comparison outboundData={obData} inboundData={ibData} />
//             <ComplexComparison outboundData={obData} inboundData={ibData} actualQuantities={70} />
//           </>
//         );
//       } else {
//         setModalContent(<p>No Outbound or Inbound Payload Available for comparison</p>);
//       }
//     } catch (error) {
//       console.error("Error in openObAndIbModal:", error);
//       setModalContent(<p>Failed to process the provided payloads. Check the data and try again.</p>);
//     }
//   };
  

//   const openObAndIbModalV1 = (obDataParam,ibDataParam)=> {
//     if (obDataParam && obDataParam.length > 0 && ibDataParam && ibDataParam.length >0) {
//         setModalContent(
//             <>
//             {/* Show both comparison components */}
//             <Comparison outboundData={parseJsonPayload(obDataParam)|| ["NA"]} inboundData={parseJsonPayload(ibDataParam) || ["NA"]} />
//             <ComplexComparison outboundData={parseJsonPayload(obDataParam) || ["NA"]} inboundData={parseJsonPayload(ibDataParam) || ["NA"]} actualQuantities={70} />
//           </>
//         );
//       } else {
//         setModalContent(<p>No Outbound or Inbound  Payload Available for comparison </p>);
//       }
//   }
  
//   const openModalV1 = (content) => {
//     setModalContent(content);
//   };

  const closeModal = () => {
    setModalContent(null);
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
              <th>OB Line Count</th>
              <th>IB Line Count</th>
              <th>OB WH</th>
              <th>Actions</th>
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
                <td>{r.outLineCount}</td>
                <td>{r.inLineCount}</td>
                <td>{r.outWh}</td>
                <td>
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
                  //onClick={() => openModal(r.outboundPayloadJson || "No OB Payload Available")}
                  onClick={() => openOutboundModal(r.outboundPayloadJson)}
                  >
                    View OB
                  </button>
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
                  onClick={() => openInboundModal(r.inboundPayloadJson)}>
                    View IB
                  </button>
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
                //   onClick={() => openModal(
                //     `Outbound Payload:\n${r.outboundPayloadJson || "No OB Payload Available"}\n\n` + 
                //     `Inbound Payload:\n${r.inboundPayloadJson || "No IB Payload Available"}`
                //   )}
                onClick={() => {
                    console.log("Outbound Payload JSON:", r.outboundPayloadJson);
                    console.log("Inbound Payload JSON:", r.inboundPayloadJson);
                    try {
                      openObAndIbModal(r.outboundPayloadJson, r.inboundPayloadJson);
                    } catch (error) {
                      console.error("Button Error:", error);
                      alert("An unexpected error occurred. Please try again.");
                    }
                  }}
                  >
                    View Both
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

        {modalContent && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          padding: '20px',
          zIndex: 1000,
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto'
        }}>
          <pre>{modalContent}</pre>
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
          
          onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App3plSoObVsIbBulk;
