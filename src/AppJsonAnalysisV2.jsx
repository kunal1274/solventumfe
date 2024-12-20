import React, { useState, useEffect } from 'react';

const outboundData = [{"requestHeader":{"channelName":"","countryCode":"6135","dateTime":"2024-08-29T07:30:46","messageId":"A9858E26-139E-46E1-9651-F984A3FBBF80","receiverId":"DHLAU","senderId":"SOLVENTUMDHLANZ"},"sOHeader":{"companyType":"","contactName":"Purchasing Team","contactPhone":"","customerAccountNumber":"6135C000183","customersOrderReference":"PO-19569","deliveryAddressCity":"STEPNEY","deliveryAddressCode":"","deliveryAddressCountryName":"","deliveryAddressCountryRegionId":"AU","deliveryAddressName":"CITY DENTAL SUPPLIES","deliveryAddressState":"SA","deliveryAddressStreet1":"3/1-7 UNION STREET STEPNEY CENTRE","deliveryAddressStreet2":"","deliveryAddressStreet3":"","deliveryAddressStreet4":"","deliveryAddressZipCode":"5069","deliveryModeCode":"RF","documentPrinting":"","email":"RICK@CITYDENTALSUPPLIES.COM.AU","invoiceWithGoods":1,"legalEntityCode":"6135","orderPriority":"10","orderTransmissionDate":"2024-08-29","orderType":"SO","orderUniqueReference":"AUA-0001990-01","pod":"","requestedReceiptDate":"2024-08-27","requestedShippingDate":"2024-08-27","salesOrderNumber":"AUA-0001990-01","shippingWareHouseId":"GS1","sOLines":[{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201027953","lineCreationSequenceNumber":0,"lineDescription":"Stainless Steel Primary Molar Crown E-LL-3 Pkt 2","lineNumber":7,"orderedSalesQuantity":2.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201028134","lineCreationSequenceNumber":0,"lineDescription":"Stainless Steel Primary Molar Crown E-UR-3 Pkt 2","lineNumber":8,"orderedSalesQuantity":1.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201028159","lineCreationSequenceNumber":0,"lineDescription":"Stainless Steel Primary Molar Crown E-UR-5 Pkt 2","lineNumber":9,"orderedSalesQuantity":3.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201022434","lineCreationSequenceNumber":0,"lineDescription":"Filtek Z250 Universal Restorative Capsules A3","lineNumber":10,"orderedSalesQuantity":4.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201056572","lineCreationSequenceNumber":0,"lineDescription":"Clinpro Tooth Creme 0.21% Fluoride Vanilla Mint 113g","lineNumber":11,"orderedSalesQuantity":24.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]}],"specialHandlingCodes":"","specialInstructionsCustomer":"CITYDENTAL@E-ACCESS.COM.AU PH: 08 8362 7611 FAX :08 8362 83","specialInstructionsWH":"","status":""}}
,

{"requestHeader":{"channelName":"","countryCode":"6135","dateTime":"2024-08-08T03:50:54","messageId":"54DE714D-BE5F-4BF6-9257-2E12E4CAAA6A","receiverId":"DHLAU","senderId":"SOLVENTUMDHLANZ"},"sOHeader":{"companyType":"","contactName":"Purchasing Team","contactPhone":"","customerAccountNumber":"6135C000351","customersOrderReference":"3M050824","deliveryAddressCity":"ISLINGTON","deliveryAddressCode":"","deliveryAddressCountryRegionId":"AU","deliveryAddressName":"INDEPENDENT DENTAL SUPPLIES PL","deliveryAddressState":"NSW","deliveryAddressStreet1":"105-107 FERN STREET","deliveryAddressStreet2":"","deliveryAddressStreet3":"","deliveryAddressStreet4":"","deliveryAddressZipCode":"2296","deliveryModeCode":"RF","documentPrinting":"","email":"ORDERS@INDEPENDENTDENTAL.COM.AU","invoiceWithGoods":1,"legalEntityCode":"6135","orderPriority":"10","orderTransmissionDate":"2024-08-08","orderType":"SO","orderUniqueReference":"AUA-0000091-01","pod":"","requestedReceiptDate":"2024-08-07","requestedShippingDate":"2024-08-07","salesOrderNumber":"AUA-0000091-01","shippingWareHouseId":"GS1","sOLines":[{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201408807","lineCreationSequenceNumber":0,"lineDescription":"3700T SUPREME FLOW TIPS 20G","lineNumber":1,"orderedSalesQuantity":40.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201409797","lineCreationSequenceNumber":0,"lineDescription":"3700T-100 SUPREME FLOW TIPS 20G","lineNumber":2,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200523929","lineCreationSequenceNumber":0,"lineDescription":"2382C SOF-LEX XT THIN DISC 1/2 IN","lineNumber":3,"orderedSalesQuantity":60.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200523945","lineCreationSequenceNumber":0,"lineDescription":"2382F SOF-LEX XT THIN DISC 1/2 IN","lineNumber":4,"orderedSalesQuantity":30.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200523887","lineCreationSequenceNumber":0,"lineDescription":"2381C SOF-LEX XT THIN DISC 3/8 INC","lineNumber":5,"orderedSalesQuantity":50.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200523937","lineCreationSequenceNumber":0,"lineDescription":"2382M SOF-LEX XT THIN DISC 1/2 IN","lineNumber":6,"orderedSalesQuantity":40.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200480989","lineCreationSequenceNumber":0,"lineDescription":"1982C SOF LEX POP ON DISC 1/2 IN 85","lineNumber":7,"orderedSalesQuantity":40.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201406918","lineCreationSequenceNumber":0,"lineDescription":"6555A3 FILTEK UNIVERSAL SYR 4G","lineNumber":12,"orderedSalesQuantity":10.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201022277","lineCreationSequenceNumber":0,"lineDescription":"3M FILTEK Z250 UNIVERSAL SYRINGE, 6020A3","lineNumber":13,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201022285","lineCreationSequenceNumber":0,"lineDescription":"3M FILTEK Z250 UNIVERSAL SYR, 6020A3.5","lineNumber":14,"orderedSalesQuantity":10.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201076372","lineCreationSequenceNumber":0,"lineDescription":"5914A3B FILTEK SUPREME XTE SYRINGE","lineNumber":15,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201076380","lineCreationSequenceNumber":0,"lineDescription":"5914A3.5B FILTEK SUPREME XTE SYRINGE","lineNumber":16,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201076364","lineCreationSequenceNumber":0,"lineDescription":"5914A2B FILTEK SUPREME XTE SYRINGE","lineNumber":17,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"UU009805498","lineCreationSequenceNumber":0,"lineDescription":"56944 RETRACTION PASTE REFILL PACK (25)","lineNumber":20,"orderedSalesQuantity":5.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201022426","lineCreationSequenceNumber":0,"lineDescription":"6021A2 Z250 FILTEK UNIVERSAL CAPSULE","lineNumber":21,"orderedSalesQuantity":10.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]}],"specialHandlingCodes":"","specialInstructionsCustomer":"ORDERS@INDEPENDENTDENTAL.COM.AU FAX 02 4969 5180 PH: 02 494","specialInstructionsWH":"","status":""}}
];




const OutboundDisplay = ({ outboundData }) => {
  return (
    <div>
      <h2>Outbound Orders</h2>
      {outboundData && outboundData.length > 0 ? (
        outboundData.map((order, orderIndex) => (
          <div key={orderIndex} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
            <h3>Order {orderIndex + 1}</h3>
            
            <section>
              <h4>Request Header</h4>
              <p><strong>Channel Name:</strong> {order.requestHeader.channelName}</p>
              <p><strong>Country Code:</strong> {order.requestHeader.countryCode}</p>
              <p><strong>Date Time:</strong> {order.requestHeader.dateTime}</p>
              <p><strong>Message ID:</strong> {order.requestHeader.messageId}</p>
              <p><strong>Receiver ID:</strong> {order.requestHeader.receiverId}</p>
              <p><strong>Sender ID:</strong> {order.requestHeader.senderId}</p>
            </section>

            <section>
              <h4>Sales Order Header</h4>
              <p><strong>Customer Account Number:</strong> {order.sOHeader.customerAccountNumber}</p>
              <p><strong>Order Reference:</strong> {order.sOHeader.customersOrderReference}</p>
              <p><strong>Delivery Address:</strong></p>
              <ul>
                <li><strong>Name:</strong> {order.sOHeader.deliveryAddressName}</li>
                <li><strong>Street1:</strong> {order.sOHeader.deliveryAddressStreet1}</li>
                <li><strong>City:</strong> {order.sOHeader.deliveryAddressCity}</li>
                <li><strong>State:</strong> {order.sOHeader.deliveryAddressState}</li>
                <li><strong>Zip:</strong> {order.sOHeader.deliveryAddressZipCode}</li>
                <li><strong>Country Region ID:</strong> {order.sOHeader.deliveryAddressCountryRegionId}</li>
              </ul>
              <p><strong>Order Transmission Date:</strong> {order.sOHeader.orderTransmissionDate}</p>
              <p><strong>Requested Receipt Date:</strong> {order.sOHeader.requestedReceiptDate}</p>
              <p><strong>Sales Order Number:</strong> {order.sOHeader.salesOrderNumber}</p>
              <p><strong>Warehouse ID:</strong> {order.sOHeader.shippingWareHouseId}</p>
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
                    <th style={{ border: '1px solid #000' }}>Sales Order Number</th>
                    <th style={{ border: '1px solid #000' }}>Status</th>
                    <th style={{ border: '1px solid #000' }}>Sales Unit Symbol</th>
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
                      <td style={{ border: '1px solid #000' }}>{line.salesOrderNumber}</td>
                      <td style={{ border: '1px solid #000' }}>{line.productStatus}</td>
                      <td style={{ border: '1px solid #000' }}>{line.salesUnitSymbol}</td>
                      <td style={{ border: '1px solid #000' }}>
                        {line.sOBatchDetails && line.sOBatchDetails.length > 0 ? (
                          <ul>
                            {line.sOBatchDetails.map((batch, batchIndex) => (
                              <li key={batchIndex}>
                                <strong>Quantity:</strong> {batch.batchedOrderQuantity}, <strong>Batch #:</strong> {batch.itemBatchNumber}
                              </li>
                            ))}
                          </ul>
                        ) : 'No batch details'}
                      </td>
                      <td style={{ border: '1px solid #000' }}>
                        {line.sOSerialDetails && line.sOSerialDetails.length > 0 ? (
                          <ul>
                            {line.sOSerialDetails.map((serial, serialIndex) => (
                              <li key={serialIndex}>{serial.serialNumber || 'No Serial Number'}</li>
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
        ))
      ) : (
        <p>No outbound orders found.</p>
      )}
    </div>
  );
};




function App(){
    return(<OutboundDisplay outboundData={outboundData} />)
}

export default App;
