import React, { useMemo,useState } from "react";
import * as XLSX from 'xlsx';
//import Worker from "./worker.js?worker"; // Adjust path as necessary



import { FixedSizeList as List } from "react-window";
import TanstackTableJsonAnalysis from "./TanstackTableJsonAnalysis";
import TanstackTableJsonAnalysisBulk from "./TanstackTableJsonAnalysisBulk";

const CHUNK_SIZE = 10000;

const outboundData = [
  {
    "requestHeader": {
        "channelName": "",
        "countryCode": "6135",
        "dateTime": "2024-08-15T11:58:29",
        "messageId": "CC117CD1-FF7C-4480-89CB-BF55EDB1576A",
        "receiverId": "DHLAU",
        "senderId": "SOLVENTUMDHLANZ"
    },
    "sOHeader": {
        "companyType": "",
        "contactName": "",
        "contactPhone": "61 423 699 535",
        "customerAccountNumber": "6135C001493",
        "customersOrderReference": "",
        "deliveryAddressCity": "MOUNT WAVERLEY",
        "deliveryAddressCode": "",
        "deliveryAddressCountryRegionId": "AU",
        "deliveryAddressName": "Trevor Jones",
        "deliveryAddressState": "VIC",
        "deliveryAddressStreet1": "CHEMTRONICS & AWA LTD UNIT 99 AXXES",
        "deliveryAddressStreet2": "S CORP PARK 45 GILBY ROAD",
        "deliveryAddressStreet3": "",
        "deliveryAddressStreet4": "",
        "deliveryAddressZipCode": "3149",
        "deliveryModeCode": "RF",
        "documentPrinting": "",
        "email": "steve.toovey@solventum.com",
        "invoiceWithGoods": 1,
        "legalEntityCode": "6135",
        "orderPriority": "10",
        "orderTransmissionDate": "2024-08-15",
        "orderType": "XO",
        "orderUniqueReference": "AUA-0000857-01",
        "pod": "",
        "requestedReceiptDate": "2024-08-15",
        "requestedShippingDate": "2024-08-15",
        "salesOrderNumber": "AUA-0000857-01",
        "shippingWareHouseId": "GS1",
        "sOLines": [
            {
                "customerShelfDays": 0,
                "itemInstructions": "",
                "itemNumber": "70200791815",
                "lineCreationSequenceNumber": 0,
                "lineDescription": "90047 FILTER (700S) 0.2 UM HIGH",
                "lineNumber": 2,
                "orderedSalesQuantity": 15,
                "productStatus": "AL",
                "requestedReceiptDate": "2024-08-15",
                "salesOrderNumber": "AUA-0000857",
                "sOBatchDetails": [
                    {
                        "batchedOrderQuantity": 0,
                        "itemBatchNumber": ""
                    }
                ],
                "sOSerialDetails": [
                    {
                        "serialNumber": ""
                    }
                ]
            }
        ],
        "specialHandlingCodes": "",
        "specialInstructionsCustomer": "",
        "specialInstructionsWH": "",
        "status": ""
    }
}
]

const inboundData = [{
  "requestHeader": {
    "channelName": "",
    "countryCode": "6135",
    "dateTime": "/Date(1723182479000)/",
    "messageId": "eeb31aw0-5612-11ef-88eb-0a580a810039",
    "receiverId": "SOLVENTUMDHLANZ",
    "senderId": "DHLAU"
  },
  "sOPackingSlipHeader": {
    "carrierId": "",
    "conNoteNumber": "",
    "deliveryAddressCity": "",
    "deliveryAddressCountryRegionId": "",
    "deliveryAddressName": "",
    "deliveryAddressStreet": "",
    "deliveryAddressZipCode": "",
    "deliveryModeCode": "",
    "legalEntityCode": "6135",
    "orderType": "",
    "orderUniqueReference": "96506",
    "salesId": "AUA-0000091-02",
    "shipDate": "2024-08-19",
    "sOPackingSlipLine": [
      {
        "delivered": "0",
        "description": "",
        "item": "70201408807",
        "lineNumber": 1,
        "orderQuantity": 0,
        "productStatus": "",
        "sOPackingSlipBatchDetails": [
          {
            "batchedOrderQuantity": 3,
            "batchExpiryDate": "2099-12-31",
            "batchProductStatus": "AL",
            "itemBatchNumber": "10857906"
          },
          {
            "batchedOrderQuantity": 1,
            "batchExpiryDate": "2099-12-31",
            "batchProductStatus": "AL",
            "itemBatchNumber": "1095W696"
          }
        ],
        "sOPackingSlipSerialDetails": [],
        "warehouse": "GS1"
      },
      {
        "delivered": "0",
        "description": "",
        "item": "70201406918",
        "lineNumber": 12,
        "orderQuantity": 0,
        "productStatus": "",
        "sOPackingSlipBatchDetails": [
          {
            "batchedOrderQuantity": 2,
            "batchExpiryDate": "2026-11-08",
            "batchProductStatus": "AL",
            "itemBatchNumber": "10956R55"
          }
        ],
        "sOPackingSlipSerialDetails": [],
        "warehouse": "GS1"
      },
      {
        "delivered": "0",
        "description": "",
        "item": "70201076364",
        "lineNumber": 17,
        "orderQuantity": 0,
        "productStatus": "",
        "sOPackingSlipBatchDetails": [
          {
            "batchedOrderQuantity": 4,
            "batchExpiryDate": "2027-04-23",
            "batchProductStatus": "AL",
            "itemBatchNumber": "109T8690"
          }
        ],
        "sOPackingSlipSerialDetails": [],
        "warehouse": "GS1"
      },
      {
        "delivered": "0",
        "description": "",
        "item": "70201022426",
        "lineNumber": 21,
        "orderQuantity": 0,
        "productStatus": "",
        "sOPackingSlipBatchDetails": [
          {
            "batchedOrderQuantity": 0,
            "batchExpiryDate": "",
            "batchProductStatus": "",
            "itemBatchNumber": ""
          }
        ],
        "sOPackingSlipSerialDetails": [],
        "warehouse": "GS1"
      },
      {
        "delivered": "0",
        "description": "",
        "item": "70200523937",
        "lineNumber": 6,
        "orderQuantity": 0,
        "productStatus": "",
        "sOPackingSlipBatchDetails": [
          {
            "batchedOrderQuantity": 5,
            "batchExpiryDate": "2099-12-31",
            "batchProductStatus": "AL",
            "itemBatchNumber": "10896473"
          },
          {
            "batchedOrderQuantity": 2,
            "batchExpiryDate": "2099-12-31",
            "batchProductStatus": "AL",
            "itemBatchNumber": "11088069"
          },
          {
            "batchedOrderQuantity": 2,
            "batchExpiryDate": "2099-12-31",
            "batchProductStatus": "AL",
            "itemBatchNumber": "11088069"
          },
          {
            "batchedOrderQuantity": 2,
            "batchExpiryDate": "2099-12-31",
            "batchProductStatus": "AL",
            "itemBatchNumber": "11088069"
          }
        ],
        "sOPackingSlipSerialDetails": [],
        "warehouse": "GS1"
      }
    ]
  }
}]




const OutboundDisplay = ({ outboundData }) => {
  if (!outboundData || outboundData.length === 0) {
    return <p>No outbound orders found.</p>;
  }

  const Row = ({ index, style }) => {
    const order = outboundData[index];
    return (
      <div style={{ ...style, border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
        <h3>Outbound Order: {order.sOHeader.orderUniqueReference}</h3>

        <section>
          <h4>Request Header</h4>
          <p><strong>Message ID:</strong> {order.requestHeader.messageId}</p>
          <p><strong>Country Code:</strong> {order.requestHeader.countryCode}</p>
          <p><strong>Sender ID:</strong> {order.requestHeader.senderId}</p>
          <p><strong>Receiver ID:</strong> {order.requestHeader.receiverId}</p>
          <p><strong>Date Time:</strong> {order.requestHeader.dateTime}</p>
        </section>

        <section>
          <h4>Sales Order Header</h4>
          <p><strong>Order Unique Reference:</strong> {order.sOHeader.orderUniqueReference}</p>
          <p><strong>Sales Order Number:</strong> {order.sOHeader.salesOrderNumber}</p>
          <p><strong>Requested Receipt Date:</strong> {order.sOHeader.requestedReceiptDate}</p>
          <p><strong>Customer Account Number:</strong> {order.sOHeader.customerAccountNumber}</p>
          <p><strong>Email:</strong> {order.sOHeader.email}</p>
        </section>

        <section>
          <h4>Sales Order Lines</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #000' }}>Line #</th>
                <th style={{ border: '1px solid #000' }}>Item Number</th>
                <th style={{ border: '1px solid #000' }}>Description</th>
                <th style={{ border: '1px solid #000' }}>Ordered Qty</th>
                <th style={{ border: '1px solid #000' }}>Requested Receipt Date</th>
                <th style={{ border: '1px solid #000' }}>Product Status</th>
                <th style={{ border: '1px solid #000' }}>Batch Details</th>
                <th style={{ border: '1px solid #000' }}>Serial Details</th>
              </tr>
            </thead>
            <tbody>
              {order.sOHeader.sOLines && order.sOHeader.sOLines.map((line, lineIndex) => (
                <tr key={lineIndex}>
                  <td style={{ border: '1px solid #000' }}>{line.lineNumber}</td>
                  <td style={{ border: '1px solid #000' }}>{line.itemNumber}</td>
                  <td style={{ border: '1px solid #000' }}>{line.lineDescription}</td>
                  <td style={{ border: '1px solid #000' }}>{line.orderedSalesQuantity}</td>
                  <td style={{ border: '1px solid #000' }}>{line.requestedReceiptDate}</td>
                  <td style={{ border: '1px solid #000' }}>{line.productStatus}</td>
                  <td style={{ border: '1px solid #000' }}>
                    {line.sOBatchDetails && line.sOBatchDetails.length > 0 ? (
                      <ul>
                        {line.sOBatchDetails.map((batch, batchIndex) => (
                          <li key={batchIndex}>
                            Qty: {batch.batchedOrderQuantity}, Batch#: {batch.itemBatchNumber || 'N/A'}
                          </li>
                        ))}
                      </ul>
                    ) : 'No batch details'}
                  </td>
                  <td style={{ border: '1px solid #000' }}>
                    {line.sOSerialDetails && line.sOSerialDetails.length > 0 ? (
                      <ul>
                        {line.sOSerialDetails.map((serial, serialIndex) => (
                          <li key={serialIndex}>{serial.serialNumber || 'No Serial'}</li>
                        ))}
                      </ul>
                    ) : 'No serial details'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  };

  return (
    <List
      height={600} // Height of the scrollable container
      itemCount={outboundData.length}
      itemSize={300} // Approximate height of each order
      width={800} // Adjust width as necessary
    >
      {Row}
    </List>
  );
};


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


function ComplexJsonAnalysis({outboundDataDefault,inboundDataDefault}) {
  const [viewMode, setViewMode] = useState(''); // Track current view
  const [outboundPayload, setOutboundPayload] = useState('');
  const [inboundPayload, setInboundPayload] = useState('');
  const [outboundData, setOutboundData] = useState(outboundDataDefault);
  const [inboundData, setInboundData] = useState(inboundDataDefault);
  const [loading, setLoading] = useState(false); // State for loader
  const [collapsed, setCollapsed] = useState(false); // State for collapse
  const [loadingExpand, setLoadingExpand] = useState(false); // State for expansion loading
  const [loaderProgress, setLoaderProgress] = useState(0);



  const parseJsonPayload = (payload) => {
    try {
      const parsed = JSON.parse(payload);
      return Array.isArray(parsed) ? parsed : [parsed]; // Ensure data is always an array
    } catch (error) {
      alert('Invalid JSON provided. Please correct it and try again.');
      return [];
    }
  };

  const handleOutboundUploadBulk = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Set loader to true
    setLoading(true);

    const reader = new FileReader();

    reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        try {
            const workbook = XLSX.read(arrayBuffer, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const rows = jsonData.slice(1); // Skip headers
            const totalRows = rows.length;
            const parsedData = [];

            const processChunk = (startIndex) => {
                const endIndex = Math.min(startIndex + CHUNK_SIZE, totalRows);

                const chunk = rows.slice(startIndex, endIndex).map((row, index) => ({
                    id: startIndex + index + 1,
                    "Message Id": row[0],
                    "Legal entity": row[1],
                    "Interface name": row[2],
                    Flow: row[3],
                    "Key field": row[4],
                    "Response status": row[5],
                    "CS Remark": row[6],
                    "CS Progress Status": row[7],
                    "Log description": row[8],
                    "Payload JSON": row[9] ? safeJsonParse(row[9]) : {},
                    "Response date and time": row[10],
                    "Created by": row[11],
                    "Modified by": row[12],
                    "Modified date and time": row[13],
                }));

                parsedData.push(...chunk);
                setOutboundData([...parsedData]);

                // Update loader progress here
                setLoaderProgress(Math.round((parsedData.length / totalRows) * 100));

                if (endIndex < totalRows) {
                    setTimeout(() => processChunk(endIndex), 0); // Allow UI to update
                } else {
                    setLoading(false); // Hide loader when all chunks are processed
                }
            };

            processChunk(0);
        } catch (error) {
            alert(`Error processing file: ${error.message}`);
            setLoading(false); // Hide loader on error
        }
    };

    reader.readAsArrayBuffer(file);
};

const handleOutboundUploadBulkWorker = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setLoading(true); // Start loader
  setLoaderProgress(0); // Reset loader progress

  const reader = new FileReader();

  reader.onload = (e) => {
    const arrayBuffer = e.target.result;

    try {
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const rows = jsonData.slice(1); // Skip headers
      const totalRows = rows.length;
      const CHUNK_SIZE = 5000; // Define a chunk size for worker processing

      const worker = new Worker(new URL("./worker.js", import.meta.url), { type: "module" });

      const parsedData = [];
      let chunksProcessed = 0;

      worker.onmessage = (event) => {
        const { chunk, endIndex } = event.data;

        // Append processed chunk
        parsedData.push(...chunk);
        setOutboundData([...parsedData]);

        // Update progress
        setLoaderProgress(Math.round((parsedData.length / totalRows) * 100));

        // If there's more to process, continue
        if (endIndex < totalRows) {
          worker.postMessage({ rows, startIndex: endIndex, CHUNK_SIZE });
        } else {
          setLoading(false); // All data processed
          worker.terminate(); // Terminate the worker
        }
      };

      worker.postMessage({ rows, startIndex: 0, CHUNK_SIZE }); // Start worker processing
    } catch (error) {
      console.error("Error processing file:", error);
      alert("Failed to process the file. Please try again.");
      setLoading(false); // Hide loader on error
    }
  };

  reader.readAsArrayBuffer(file);
};




const handleOutboundUploadBulkBatch = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setLoading(true); // Show loader
  setLoaderProgress(0); // Reset progress

  const reader = new FileReader();

  reader.onload = (e) => {
    const arrayBuffer = e.target.result;

    try {
      // Parse Excel data
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const rows = jsonData.slice(1); // Skip headers
      const totalRows = rows.length;
      const parsedData = [];

      // Function to process chunks
      const processChunk = (startIndex) => {
        const endIndex = Math.min(startIndex + CHUNK_SIZE, totalRows);

        // Process a chunk
        const chunk = rows.slice(startIndex, endIndex).map((row, index) => ({
          id: startIndex + index + 1,
          "Message Id": row[0],
          "Legal entity": row[1],
          "Interface name": row[2],
          Flow: row[3],
          "Key field": row[4],
          "Response status": row[5],
          "CS Remark": row[6],
          "CS Progress Status": row[7],
          "Log description": row[8],
          "Payload JSON": row[9] ? safeJsonParse(row[9]) : {},
          "Response date and time": row[10],
          "Created by": row[11],
          "Modified by": row[12],
          "Modified date and time": row[13],
        }));

        // Append the processed chunk to parsed data
        parsedData.push(...chunk);
        setOutboundData([...parsedData]);

        // Update progress
        setLoaderProgress(Math.round((parsedData.length / totalRows) * 100));

        if (endIndex < totalRows) {
          // Schedule next chunk processing
          setTimeout(() => processChunk(endIndex), 0); // Yield to the event loop
        } else {
          // Finished processing all chunks
          setLoading(false); // Hide loader
        }
      };

      // Start processing from the first chunk
      processChunk(0);
    } catch (error) {
      console.error("Error processing file:", error.message);
      setLoading(false); // Hide loader on error
    }
  };

  reader.readAsArrayBuffer(file);
};




const handleOutboundUploadBulkAdvanced = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();

    reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        try {
            const workbook = XLSX.read(arrayBuffer, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const rows = jsonData.slice(1); // Skip headers
            const totalRows = rows.length;
            const parsedData = [];
            //const worker = new Worker();
            const worker = new Worker('./worker.js?worker'); // Import the worker dynamically

            const processChunk = (startIndex) => {
                worker.postMessage({ rows, startIndex, CHUNK_SIZE });

                worker.onmessage = (event) => {
                    const { chunk, startIndex: nextIndex } = event.data;
                    parsedData.push(...chunk);
                    setOutboundData([...parsedData]);

                    // Update loader progress
                    setLoaderProgress(Math.round((parsedData.length / totalRows) * 100));

                    if (nextIndex < totalRows) {
                        processChunk(nextIndex);
                    } else {
                        setLoading(false);
                        worker.terminate(); // Terminate the worker when done
                    }
                };

                worker.onerror = (error) => {
                    console.error("Worker Error:", error.message);
                    setLoading(false);
                    worker.terminate(); // Terminate the worker on error
                };
            };

            processChunk(0);
        } catch (error) {
            alert(`Error processing file: ${error.message}`);
            setLoading(false);
        }
    };

    reader.readAsArrayBuffer(file);
};


  
  const handleOutboundUploadGeneral = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true); // Start loader
    const reader = new FileReader();

    reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        try {
            const workbook = XLSX.read(arrayBuffer, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            //console.log("Raw JSON Data:", jsonData); // Log raw data

            // Process rows to match the table structure
            const formattedData = jsonData.slice(1).map((row, index) => {
                try {
                    const parsedRow = {
                        id: index + 1,
                        "Message Id": row[0], // Maps to column accessor "Message Id"
                        "Legal entity": row[1], // Maps to column accessor "Legal entity"
                        "Interface name": row[2], // Maps to column accessor "Interface name"
                        Flow: row[3], // Maps to column accessor "Flow"
                        "Key field": row[4], // Maps to column accessor "Key field"
                        "Response status": row[5], // Maps to column accessor "Response status"
                        "CS Remark": row[6], // Maps to column accessor "CS Remark"
                        "CS Progress Status": row[7], // Maps to column accessor "CS Progress Status"
                        "Log description": row[8], // Maps to column accessor "Log description"
                        "Payload JSON": row[9] ? safeJsonParse(row[9]) : {}, // Maps to column accessor "Payload JSON"
                        "Response date and time": row[10], // Maps to column accessor "Response date and time"
                        "Created by": row[11], // Maps to column accessor "Created by"
                        "Modified by": row[12], // Maps to column accessor "Modified by"
                        "Modified date and time": row[13], // Maps to column accessor "Modified date and time"
                    
                    };

                    //console.log("Parsed Row:", parsedRow); // Log each row
                    return parsedRow;
                } catch (rowError) {
                    console.error(`Error parsing row ${index + 1}:`, rowError);
                    return null; // Skip rows with errors
                }
            }).filter(Boolean); // Remove null rows

            console.log("Formatted Data:", formattedData); // Log final data
            setOutboundData(formattedData);
        } catch (error) {
            alert(`Error processing file: ${error.message}`);
        }finally {
            setLoading(false); // Stop loader
        }
    };

    reader.readAsArrayBuffer(file);
};


const safeJsonParse = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Invalid JSON in payload:", error);
        return {}; // Return empty object for invalid JSON
    }
};

const toggleCollapse = () => {
    if (collapsed) {
        // Start loading for expansion
        setLoadingExpand(true);
        setTimeout(() => {
            setCollapsed(false); // Expand the table after delay
            setLoadingExpand(false); // Stop loading
        }, 1000); // Simulated delay for rendering (adjust time as needed)
    } else {
        setCollapsed(true); // Collapse the table instantly
    }
};
  
  return (
    <div className="mx-10 my-5">
      <h1>App JSON Analysis</h1>
      {/* Input Fields */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Provide Outbound JSON Payload:</h3>
        <textarea
          rows="10"
          cols="80"
          placeholder="Enter outbound JSON payload here..."
          value={outboundPayload}
          onChange={(e) => setOutboundPayload(e.target.value)}
          style={{ marginBottom: '10px', display: 'block', width: '100%' }}
        ></textarea>

    {/* <div style={{margin:'10px',display:'block'}}>
        <h2>Upload Outbound File in General</h2>
        <input id="fileInput" type="file" onChange={handleOutboundUploadGeneral} accept=".xls,.xlsx" />
      </div>

      <div style={{margin:'10px',display:'block'}}>
        <h2>Upload Outbound File in Bulk</h2>
        <input id="fileInput" type="file" onChange={handleOutboundUploadBulk} accept=".xls,.xlsx" />
      </div>

      <div style={{margin:'10px',display:'block'}}>
        <h2>Upload Outbound File in Bulk Batched</h2>
        <input id="fileInput" type="file" onChange={handleOutboundUploadBulkBatch} accept=".xls,.xlsx" />
      </div> */}

      <div style={{margin:'10px',display:'block'}}>
        <h2>Upload Outbound File in Bulk Worker</h2>
        <input className="" id="fileInput" type="file" onChange={handleOutboundUploadBulkWorker} accept=".xls,.xlsx" />
      </div>

      


      <div className="flex space-x-4 my-4">
    <button
        onClick={()=>{
            setOutboundData([]);
            document.getElementById("fileInput").value = ""; // Reset file input

        }}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600"
    >
        Reset File
    </button>
    <button
        onClick={toggleCollapse}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600"
    >
        {collapsed ? "Expand Table" : "Collapse Table"}
    </button>
</div>
      
      {loading ? (
    <div className="flex justify-center items-center my-4">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-2 mr-2 text-sm text-gray-600">Processing file, please wait...
        <progress value={loaderProgress} max="100"></progress>
        <span>{loaderProgress}%</span>
        </p>           
                
    </div>
) :
(
    
loadingExpand ? (
    <div className="flex justify-center items-center my-4">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
        <p className="ml-2 text-sm text-gray-600">Expanding table, please wait...</p>
    </div>
) : (
    !collapsed  && (
        <div className="overflow-x-auto shadow-lg border border-gray-300 rounded-lg mt-4">
            {/* <TanstackTableJsonAnalysis myData={outboundData} fallbackData={[]} /> */}
            <TanstackTableJsonAnalysisBulk myData={outboundData} fallbackData={[]}/>
        </div>
    )
)
)
      
}

        <h3>Provide Inbound JSON Payload:</h3>
        <textarea
          rows="10"
          cols="80"
          placeholder="Enter inbound JSON payload here..."
          value={inboundPayload}
          onChange={(e) => setInboundPayload(e.target.value)}
          style={{ marginBottom: '10px', display: 'block', width: '100%' }}
        ></textarea>
      </div>
      {/* Step 1: Add buttons to select what to view */}
      <div style={{ marginBottom: '10px' }}>
        <button 
          style={{ margin: '5px', padding: '5px 10px' }} 
          onClick={() => {
            const parsedOutbound = outboundPayload
              ? parseJsonPayload(outboundPayload)
              : outboundDataDefault; // Fallback to default if empty or invalid
            if (parsedOutbound !== null) {
              setOutboundData(parsedOutbound);
              setViewMode('ob');
            }
            
           }}
        >
          View OB Payload
        </button>
        <button 
          style={{ margin: '5px', padding: '5px 10px' }} 
          onClick={() => {
            const parsedInbound = inboundPayload
            ? parseJsonPayload(inboundPayload)
            : inboundDataDefault; // Fallback to default if empty or invalid
          if (parsedInbound !== null) {
            setInboundData(parsedInbound);
            setViewMode('ib');
          }
          
          }}
        >
          View IB Payload
        </button>
        <button 
          style={{ margin: '5px', padding: '5px 10px' }} 
          onClick={() => {
            const parsedOutbound = outboundPayload
              ? parseJsonPayload(outboundPayload)
              : outboundDataDefault; // Fallback to default if empty or invalid
            const parsedInbound = inboundPayload
              ? parseJsonPayload(inboundPayload)
              : inboundDataDefault; // Fallback to default if empty or invalid

            if (parsedOutbound !== null && parsedInbound !== null) {
              setOutboundData(parsedOutbound);
              setInboundData(parsedInbound);
              setViewMode('both');
            }
          
          }}
        >
          View OB vs IB Payload
        </button>
      </div>

      {/* Step 2: Conditionally render based on viewMode */}
      {viewMode === 'ob' && (
        <OutboundDisplay outboundData={outboundData} />
      )}
      
      {viewMode === 'ib' && (
        <InboundDisplay inboundData={inboundData} />
      )}
      
      {viewMode === 'both' && (
        <>
          {/* Show both comparison components */}
          <Comparison outboundData={outboundData} inboundData={inboundData} />
          <ComplexComparison outboundData={outboundData} inboundData={inboundData} actualQuantities={70} />
        </>
      )}

      {viewMode === '' && (
        <p>Please select a view mode above.</p>
      )}
    </div>
  );
}

function AppJsonAnalysisBulk(){
  return (<ComplexJsonAnalysis outboundDataDefault={outboundData} inboundDataDefault={inboundData}/>)
}

export default AppJsonAnalysisBulk;










