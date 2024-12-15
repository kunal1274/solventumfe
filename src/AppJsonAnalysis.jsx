import React, { useState, useEffect, useMemo} from 'react';

const outboundDataV1 = [
  {"requestHeader":{"channelName":"","countryCode":"6135","dateTime":"2024-08-29T07:30:46","messageId":"A9858E26-139E-46E1-9651-F984A3FBBF80","receiverId":"DHLAU","senderId":"SOLVENTUMDHLANZ"},"sOHeader":{"companyType":"","contactName":"Purchasing Team","contactPhone":"","customerAccountNumber":"6135C000183","customersOrderReference":"PO-19569","deliveryAddressCity":"STEPNEY","deliveryAddressCode":"","deliveryAddressCountryName":"","deliveryAddressCountryRegionId":"AU","deliveryAddressName":"CITY DENTAL SUPPLIES","deliveryAddressState":"SA","deliveryAddressStreet1":"3/1-7 UNION STREET STEPNEY CENTRE","deliveryAddressStreet2":"","deliveryAddressStreet3":"","deliveryAddressStreet4":"","deliveryAddressZipCode":"5069","deliveryModeCode":"RF","documentPrinting":"","email":"RICK@CITYDENTALSUPPLIES.COM.AU","invoiceWithGoods":1,"legalEntityCode":"6135","orderPriority":"10","orderTransmissionDate":"2024-08-29","orderType":"SO","orderUniqueReference":"AUA-0001990-01","pod":"","requestedReceiptDate":"2024-08-27","requestedShippingDate":"2024-08-27","salesOrderNumber":"AUA-0001990-01","shippingWareHouseId":"GS1","sOLines":[{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201027953","lineCreationSequenceNumber":0,"lineDescription":"Stainless Steel Primary Molar Crown E-LL-3 Pkt 2","lineNumber":7,"orderedSalesQuantity":2.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201028134","lineCreationSequenceNumber":0,"lineDescription":"Stainless Steel Primary Molar Crown E-UR-3 Pkt 2","lineNumber":8,"orderedSalesQuantity":1.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201028159","lineCreationSequenceNumber":0,"lineDescription":"Stainless Steel Primary Molar Crown E-UR-5 Pkt 2","lineNumber":9,"orderedSalesQuantity":3.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201022434","lineCreationSequenceNumber":0,"lineDescription":"Filtek Z250 Universal Restorative Capsules A3","lineNumber":10,"orderedSalesQuantity":4.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"currencyCode":"","customerShelfDays":0,"itemInstructions":"","itemNumber":"70201056572","lineCreationSequenceNumber":0,"lineDescription":"Clinpro Tooth Creme 0.21% Fluoride Vanilla Mint 113g","lineNumber":11,"orderedSalesQuantity":24.0,"productStatus":"AL","requestedReceiptDate":"2024-08-27","salesOrderNumber":"AUA-0001990","salesPrice":0.0,"salesUnitSymbol":"","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]}],"specialHandlingCodes":"","specialInstructionsCustomer":"CITYDENTAL@E-ACCESS.COM.AU PH: 08 8362 7611 FAX :08 8362 83","specialInstructionsWH":"","status":""}}
,

{"requestHeader":{"channelName":"","countryCode":"6135","dateTime":"2024-08-08T03:50:54","messageId":"54DE714D-BE5F-4BF6-9257-2E12E4CAAA6A","receiverId":"DHLAU","senderId":"SOLVENTUMDHLANZ"},"sOHeader":{"companyType":"","contactName":"Purchasing Team","contactPhone":"","customerAccountNumber":"6135C000351","customersOrderReference":"3M050824","deliveryAddressCity":"ISLINGTON","deliveryAddressCode":"","deliveryAddressCountryRegionId":"AU","deliveryAddressName":"INDEPENDENT DENTAL SUPPLIES PL","deliveryAddressState":"NSW","deliveryAddressStreet1":"105-107 FERN STREET","deliveryAddressStreet2":"","deliveryAddressStreet3":"","deliveryAddressStreet4":"","deliveryAddressZipCode":"2296","deliveryModeCode":"RF","documentPrinting":"","email":"ORDERS@INDEPENDENTDENTAL.COM.AU","invoiceWithGoods":1,"legalEntityCode":"6135","orderPriority":"10","orderTransmissionDate":"2024-08-08","orderType":"SO","orderUniqueReference":"AUA-0000091-01","pod":"","requestedReceiptDate":"2024-08-07","requestedShippingDate":"2024-08-07","salesOrderNumber":"AUA-0000091-01","shippingWareHouseId":"GS1","sOLines":[{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201408807","lineCreationSequenceNumber":0,"lineDescription":"3700T SUPREME FLOW TIPS 20G","lineNumber":1,"orderedSalesQuantity":40.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201409797","lineCreationSequenceNumber":0,"lineDescription":"3700T-100 SUPREME FLOW TIPS 20G","lineNumber":2,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200523929","lineCreationSequenceNumber":0,"lineDescription":"2382C SOF-LEX XT THIN DISC 1/2 IN","lineNumber":3,"orderedSalesQuantity":60.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200523945","lineCreationSequenceNumber":0,"lineDescription":"2382F SOF-LEX XT THIN DISC 1/2 IN","lineNumber":4,"orderedSalesQuantity":30.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200523887","lineCreationSequenceNumber":0,"lineDescription":"2381C SOF-LEX XT THIN DISC 3/8 INC","lineNumber":5,"orderedSalesQuantity":50.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200523937","lineCreationSequenceNumber":0,"lineDescription":"2382M SOF-LEX XT THIN DISC 1/2 IN","lineNumber":6,"orderedSalesQuantity":40.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70200480989","lineCreationSequenceNumber":0,"lineDescription":"1982C SOF LEX POP ON DISC 1/2 IN 85","lineNumber":7,"orderedSalesQuantity":40.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201406918","lineCreationSequenceNumber":0,"lineDescription":"6555A3 FILTEK UNIVERSAL SYR 4G","lineNumber":12,"orderedSalesQuantity":10.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201022277","lineCreationSequenceNumber":0,"lineDescription":"3M FILTEK Z250 UNIVERSAL SYRINGE, 6020A3","lineNumber":13,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201022285","lineCreationSequenceNumber":0,"lineDescription":"3M FILTEK Z250 UNIVERSAL SYR, 6020A3.5","lineNumber":14,"orderedSalesQuantity":10.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201076372","lineCreationSequenceNumber":0,"lineDescription":"5914A3B FILTEK SUPREME XTE SYRINGE","lineNumber":15,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201076380","lineCreationSequenceNumber":0,"lineDescription":"5914A3.5B FILTEK SUPREME XTE SYRINGE","lineNumber":16,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201076364","lineCreationSequenceNumber":0,"lineDescription":"5914A2B FILTEK SUPREME XTE SYRINGE","lineNumber":17,"orderedSalesQuantity":20.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"UU009805498","lineCreationSequenceNumber":0,"lineDescription":"56944 RETRACTION PASTE REFILL PACK (25)","lineNumber":20,"orderedSalesQuantity":5.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]},{"customerShelfDays":0,"itemInstructions":"","itemNumber":"70201022426","lineCreationSequenceNumber":0,"lineDescription":"6021A2 Z250 FILTEK UNIVERSAL CAPSULE","lineNumber":21,"orderedSalesQuantity":10.0,"productStatus":"AL","requestedReceiptDate":"2024-08-07","salesOrderNumber":"AUA-0000091","sOBatchDetails":[{"batchedOrderQuantity":0.0,"itemBatchNumber":""}],"sOSerialDetails":[{"serialNumber":""}]}],"specialHandlingCodes":"","specialInstructionsCustomer":"ORDERS@INDEPENDENTDENTAL.COM.AU FAX 02 4969 5180 PH: 02 494","specialInstructionsWH":"","status":""}}
,
{
  "requestHeader": {
    "channelName": "",
    "countryCode": "6135",
    "dateTime": "2024-08-08T03:50:54",
    "messageId": "54DE714D-BE5F-4BF6-9257-2E12E4CAAA6A",
    "receiverId": "DHLAU",
    "senderId": "SOLVENTUMDHLANZ"
  },
  "sOHeader": {
    "companyType": "",
    "contactName": "Purchasing Team",
    "contactPhone": "",
    "customerAccountNumber": "6135C000351",
    "customersOrderReference": "3M050824",
    "deliveryAddressCity": "ISLINGTON",
    "deliveryAddressCode": "",
    "deliveryAddressCountryRegionId": "AU",
    "deliveryAddressName": "INDEPENDENT DENTAL SUPPLIES PL",
    "deliveryAddressState": "NSW",
    "deliveryAddressStreet1": "105-107 FERN STREET",
    "deliveryAddressStreet2": "",
    "deliveryAddressStreet3": "",
    "deliveryAddressStreet4": "",
    "deliveryAddressZipCode": "2296",
    "deliveryModeCode": "RF",
    "documentPrinting": "",
    "email": "ORDERS@INDEPENDENTDENTAL.COM.AU",
    "invoiceWithGoods": 1,
    "legalEntityCode": "6135",
    "orderPriority": "10",
    "orderTransmissionDate": "2024-08-08",
    "orderType": "SO",
    "orderUniqueReference": "AUA-0000091-02",
    "pod": "",
    "requestedReceiptDate": "2024-08-07",
    "requestedShippingDate": "2024-08-07",
    "salesOrderNumber": "AUA-0000091-02",
    "shippingWareHouseId": "GS1",
    "sOLines": [
      {
        "customerShelfDays": 0,
        "itemInstructions": "",
        "itemNumber": "70201408807",
        "lineCreationSequenceNumber": 0,
        "lineDescription": "3700T SUPREME FLOW TIPS 20G",
        "lineNumber": 1,
        "orderedSalesQuantity": 21,
        "productStatus": "AL",
        "requestedReceiptDate": "2024-08-07",
        "salesOrderNumber": "AUA-0000091",
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
      },
      
      
      {
        "customerShelfDays": 0,
        "itemInstructions": "",
        "itemNumber": "70200523937",
        "lineCreationSequenceNumber": 0,
        "lineDescription": "2382M SOF-LEX XT THIN DISC 1/2 IN",
        "lineNumber": 6,
        "orderedSalesQuantity": 13,
        "productStatus": "AL",
        "requestedReceiptDate": "2024-08-07",
        "salesOrderNumber": "AUA-0000091",
        "sOBatchDetails": [
          {
            "batchedOrderQuantity": 13,
            "itemBatchNumber": "Dummy1"
          }
        ],
        "sOSerialDetails": [
          {
            "serialNumber": ""
          }
        ]
      },
      
      {
        "customerShelfDays": 0,
        "itemInstructions": "",
        "itemNumber": "70201406918",
        "lineCreationSequenceNumber": 0,
        "lineDescription": "6555A3 FILTEK UNIVERSAL SYR 4G",
        "lineNumber": 12,
        "orderedSalesQuantity": 3,
        "productStatus": "AL",
        "requestedReceiptDate": "2024-08-07",
        "salesOrderNumber": "AUA-0000091",
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
      },
      
     
      
      {
        "customerShelfDays": 0,
        "itemInstructions": "",
        "itemNumber": "70201076364",
        "lineCreationSequenceNumber": 0,
        "lineDescription": "5914A2B FILTEK SUPREME XTE SYRINGE",
        "lineNumber": 17,
        "orderedSalesQuantity": 8,
        "productStatus": "AL",
        "requestedReceiptDate": "2024-08-07",
        "salesOrderNumber": "AUA-0000091",
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
      },
     
      {
        "customerShelfDays": 0,
        "itemInstructions": "",
        "itemNumber": "70201022426",
        "lineCreationSequenceNumber": 0,
        "lineDescription": "6021A2 Z250 FILTEK UNIVERSAL CAPSULE",
        "lineNumber": 21,
        "orderedSalesQuantity": 9,
        "productStatus": "AL",
        "requestedReceiptDate": "2024-08-07",
        "salesOrderNumber": "AUA-0000091",
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
    "specialInstructionsCustomer": "ORDERS@INDEPENDENTDENTAL.COM.AU FAX 02 4969 5180 PH: 02 494",
    "specialInstructionsWH": "",
    "status": ""
  }
}
];
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

const inboundDataV1 = [{"requestHeader":{"channelName":"","countryCode":"6135","dateTime":"/Date(1725607844000)/","messageId":"ed350450-6c21-11ef-902b-0a580a830043","receiverId":"SOLVENTUMDHLANZ","senderId":"DHLAU"},"sOPackingSlipHeader":{"carrierId":"","conNoteNumber":"DSC4439827","deliveryAddressCity":"","deliveryAddressCountryRegionId":"","deliveryAddressName":"","deliveryAddressStreet":"","deliveryAddressZipCode":"","deliveryModeCode":"DH1","legalEntityCode":"6135","orderType":"","orderUniqueReference":"132906","salesId":"AUA-0001990-01","shipDate":"2024-09-06","sOPackingSlipLine":[{"delivered":"0","description":"","item":"70201022434","lineNumber":10,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":2,"batchExpiryDate":"2027-05-09","batchProductStatus":"AL","itemBatchNumber":"10982892"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201056572","lineNumber":11,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":24,"batchExpiryDate":"2026-11-06","batchProductStatus":"AL","itemBatchNumber":"11098"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201027953","lineNumber":7,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":2,"batchExpiryDate":"2034-08-01","batchProductStatus":"AL","itemBatchNumber":"11050161"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201028159","lineNumber":9,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":3,"batchExpiryDate":"2034-06-14","batchProductStatus":"AL","itemBatchNumber":"10982550"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201028134","lineNumber":8,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":1,"batchExpiryDate":"2034-08-01","batchProductStatus":"AL","itemBatchNumber":"11036010"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"}]}}
,
{"requestHeader":{"channelName":"","countryCode":"6135","dateTime":"/Date(1723182479000)/","messageId":"eeb31ad0-5612-11ef-88eb-0a580a810049","receiverId":"SOLVENTUMDHLANZ","senderId":"DHLAU"},"sOPackingSlipHeader":{"carrierId":"","conNoteNumber":"","deliveryAddressCity":"","deliveryAddressCountryRegionId":"","deliveryAddressName":"","deliveryAddressStreet":"","deliveryAddressZipCode":"","deliveryModeCode":"","legalEntityCode":"6135","orderType":"","orderUniqueReference":"96506","salesId":"AUA-0000091-01","shipDate":"2024-08-09","sOPackingSlipLine":[{"delivered":"0","description":"","item":"70201408807","lineNumber":1,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":7,"batchExpiryDate":"2099-12-31","batchProductStatus":"AL","itemBatchNumber":"10855906"},{"batchedOrderQuantity":22,"batchExpiryDate":"2099-12-31","batchProductStatus":"AL","itemBatchNumber":"10951696"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201406918","lineNumber":12,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":10,"batchExpiryDate":"2026-11-08","batchProductStatus":"AL","itemBatchNumber":"10956355"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201022285","lineNumber":14,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":10,"batchExpiryDate":"2027-03-16","batchProductStatus":"AL","itemBatchNumber":"10915755"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201022277","lineNumber":13,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":10,"batchExpiryDate":"2027-03-04","batchProductStatus":"AL","itemBatchNumber":"10893130"},{"batchedOrderQuantity":10,"batchExpiryDate":"2027-03-16","batchProductStatus":"AL","itemBatchNumber":"10933786"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201076372","lineNumber":15,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":20,"batchExpiryDate":"2027-04-23","batchProductStatus":"AL","itemBatchNumber":"10968626"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201076380","lineNumber":16,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":20,"batchExpiryDate":"2027-04-23","batchProductStatus":"AL","itemBatchNumber":"10968608"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201409797","lineNumber":2,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":10,"batchExpiryDate":"2099-12-31","batchProductStatus":"AL","itemBatchNumber":"10956666"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201076364","lineNumber":17,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":16,"batchExpiryDate":"2027-04-23","batchProductStatus":"AL","itemBatchNumber":"10968690"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"UU009805498","lineNumber":20,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":5,"batchExpiryDate":"2026-04-17","batchProductStatus":"AL","itemBatchNumber":"11060286"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70201022426","lineNumber":21,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":10,"batchExpiryDate":"2027-03-16","batchProductStatus":"AL","itemBatchNumber":"10905914"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70200523929","lineNumber":3,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":54,"batchExpiryDate":"2099-12-31","batchProductStatus":"AL","itemBatchNumber":"10999533"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70200523945","lineNumber":4,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":30,"batchExpiryDate":"2099-12-31","batchProductStatus":"AL","itemBatchNumber":"10878370"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70200523887","lineNumber":5,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":50,"batchExpiryDate":"2029-12-31","batchProductStatus":"AL","itemBatchNumber":"11005211"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70200523937","lineNumber":6,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":20,"batchExpiryDate":"2099-12-31","batchProductStatus":"AL","itemBatchNumber":"10896473"},{"batchedOrderQuantity":20,"batchExpiryDate":"2099-12-31","batchProductStatus":"AL","itemBatchNumber":"11088069"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"},{"delivered":"0","description":"","item":"70200480989","lineNumber":7,"orderQuantity":0,"productStatus":"","sOPackingSlipBatchDetails":[{"batchedOrderQuantity":1,"batchExpiryDate":"2099-12-31","batchProductStatus":"AL","itemBatchNumber":"10872658"},{"batchedOrderQuantity":39,"batchExpiryDate":"2099-12-31","batchProductStatus":"AL","itemBatchNumber":"11061332"}],"sOPackingSlipSerialDetails":[],"warehouse":"GS1"}]}}
,
{
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
  return (
    <div>
      <h2>Outbound Orders</h2>
      {outboundData && outboundData.length > 0 ? (
        outboundData.map((order, orderIndex) => (
          <div key={orderIndex} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
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
        ))
      ) : (
        <p>No outbound orders found.</p>
      )}
    </div>
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


  const parseJsonPayloadV1 = (payload) => {
    try {
      return JSON.parse(payload);
    } catch (error) {
      alert('Invalid JSON provided. Please correct it and try again.');
      return [];
    }
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
  

 

  return (
    <div>
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

function AppJsonAnalysis(){
  return (<ComplexJsonAnalysis outboundDataDefault={outboundData} inboundDataDefault={inboundData}/>)
}

export default AppJsonAnalysis;

const InboundDisplayV1 = ({ inboundData }) => {
  return (
    <div>
      <h2>Inbound Packing Slips</h2>
      {inboundData && inboundData.length > 0 ? (
        inboundData.map((pack, packIndex) => (
          <div key={packIndex} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
            <h3>Inbound Packing Slip for Order: {pack.sOPackingSlipHeader.salesId}</h3>

            <section>
              <h4>Request Header</h4>
              <p><strong>Channel Name:</strong> {pack.requestHeader.channelName}</p>
              <p><strong>Country Code:</strong> {pack.requestHeader.countryCode}</p>
              <p><strong>Date Time:</strong> {pack.requestHeader.dateTime}</p>
              <p><strong>Message ID:</strong> {pack.requestHeader.messageId}</p>
              <p><strong>Receiver ID:</strong> {pack.requestHeader.receiverId}</p>
              <p><strong>Sender ID:</strong> {pack.requestHeader.senderId}</p>
            </section>

            <section>
              <h4>Packing Slip Header</h4>
              <p><strong>Sales ID (Order Number):</strong> {pack.sOPackingSlipHeader.salesId}</p>
              <p><strong>Order Unique Reference:</strong> {pack.sOPackingSlipHeader.orderUniqueReference}</p>
              <p><strong>Ship Date:</strong> {pack.sOPackingSlipHeader.shipDate}</p>
              <p><strong>Delivery Mode Code:</strong> {pack.sOPackingSlipHeader.deliveryModeCode}</p>
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
                    <th style={{ border: '1px solid #000' }}>Warehouse</th>
                    <th style={{ border: '1px solid #000' }}>Batch Details</th>
                  </tr>
                </thead>
                <tbody>
                  {pack.sOPackingSlipHeader.sOPackingSlipLine && pack.sOPackingSlipHeader.sOPackingSlipLine.map((line, lineIndex) => (
                    <tr key={lineIndex}>
                      <td style={{ border: '1px solid #000' }}>{line.lineNumber}</td>
                      <td style={{ border: '1px solid #000' }}>{line.item}</td>
                      <td style={{ border: '1px solid #000' }}>{line.delivered}</td>
                      <td style={{ border: '1px solid #000' }}>{line.warehouse}</td>
                      <td style={{ border: '1px solid #000' }}>
                        {line.sOPackingSlipBatchDetails && line.sOPackingSlipBatchDetails.length > 0 ? (
                          <ul>
                            {line.sOPackingSlipBatchDetails.map((batch, batchIndex) => (
                              <li key={batchIndex}>
                                <strong>Qty:</strong> {batch.batchedOrderQuantity}, 
                                <strong>Batch#:</strong> {batch.itemBatchNumber}, 
                                <strong>Expiry:</strong> {batch.batchExpiryDate}, 
                                <strong>Status:</strong> {batch.batchProductStatus}
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

const OutboundDisplayV1 = ({ outboundData }) => {
  return (
    <div>
      <h2>Outbound Orders</h2>
      {outboundData && outboundData.length > 0 ? (
        outboundData.map((order, orderIndex) => (
          <div key={orderIndex} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
            <h3>Outbound Order: {order.sOHeader.salesOrderNumber}</h3>
            
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
              <p><strong>Delivery Address Name:</strong> {order.sOHeader.deliveryAddressName}</p>
              <p><strong>Delivery Address Street1:</strong> {order.sOHeader.deliveryAddressStreet1}</p>
              <p><strong>City:</strong> {order.sOHeader.deliveryAddressCity}</p>
              <p><strong>State:</strong> {order.sOHeader.deliveryAddressState}</p>
              <p><strong>Zip:</strong> {order.sOHeader.deliveryAddressZipCode}</p>
              <p><strong>Country Region ID:</strong> {order.sOHeader.deliveryAddressCountryRegionId}</p>
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
                                <strong>Qty:</strong> {batch.batchedOrderQuantity}, <strong>Batch#:</strong> {batch.itemBatchNumber || 'N/A'}
                              </li>
                            ))}
                          </ul>
                        ) : 'No batch details'}
                      </td>
                      <td style={{ border: '1px solid #000' }}>
                        {line.sOSerialDetails && line.sOSerialDetails.length > 0 ? (
                          <ul>
                            {line.sOSerialDetails.map((serial, serialIndex) => (
                              <li key={serialIndex}>
                                {serial.serialNumber || 'No Serial Number'}
                              </li>
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
const ComparisonV1 = ({ outboundData, inboundData }) => {
  // Create a map for inbound lines:
  // Key format: `${salesId}-${lineNumber}` for inbound
  const inboundMap = useMemo(() => {
    const map = {};
    inboundData.forEach(pack => {
      const salesId = pack.sOPackingSlipHeader.salesId; // This corresponds to outbound salesOrderNumber
      pack.sOPackingSlipHeader.sOPackingSlipLine.forEach(inLine => {
        const key = `${salesId}-${inLine.lineNumber}`;
        // If multiple batches exist for the same line, we combine them here.
        // We'll store the entire inbound line data for easy reference.
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
          const salesOrderNumber = order.sOHeader.salesOrderNumber; 
          return (
            <div key={orderIndex} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
              <h3>Comparing Order: {salesOrderNumber}</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #000' }}>Line #</th>
                    <th style={{ border: '1px solid #000' }}>Item Number</th>
                    <th style={{ border: '1px solid #000' }}>Outbound Qty</th>
                    <th style={{ border: '1px solid #000' }}>Inbound Total Qty</th>
                    <th style={{ border: '1px solid #000' }}>Difference</th>
                    <th style={{ border: '1px solid #000' }}>Inbound Batch Breakdown</th>
                  </tr>
                </thead>
                <tbody>
                  {order.sOHeader.sOLines && order.sOHeader.sOLines.map((outLine, lineIndex) => {
                    const key = `${salesOrderNumber}-${outLine.lineNumber}`;
                    const inboundLine = inboundMap[key];

                    // Calculate inbound total from sOPackingSlipBatchDetails:
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
                        <td style={{ border: '1px solid #000', color: difference !== 0 ? 'red' : 'green' }}>
                          {difference}
                        </td>
                        <td style={{ border: '1px solid #000' }}>
                          {inboundBatches.length > 0 ? (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr>
                                  <th style={{ border: '1px solid #000' }}>Batch #</th>
                                  <th style={{ border: '1px solid #000' }}>Qty</th>
                                  <th style={{ border: '1px solid #000' }}>Expiry Date</th>
                                  <th style={{ border: '1px solid #000' }}>Batch Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {inboundBatches.map((b, bIndex) => (
                                  <tr key={bIndex}>
                                    <td style={{ border: '1px solid #000' }}>{b.itemBatchNumber}</td>
                                    <td style={{ border: '1px solid #000' }}>{b.batchedOrderQuantity}</td>
                                    <td style={{ border: '1px solid #000' }}>{b.batchExpiryDate}</td>
                                    <td style={{ border: '1px solid #000' }}>{b.batchProductStatus}</td>
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



const ComplexComparisonV1 = ({ outboundData, inboundData, actualQuantities }) => {
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
            // Determine the total row span for the leftmost four columns
            // Each outbound line may have multiple inbound batches
            // We sum the maximum inbound batches rows for each outbound line.
            // Sort outbounds by lineNumber if needed (they might already share the same lineNumber)
            // But if multiple lineNumber sets existed, we can still sort.
            // Here we only have one lineNumber per group, so just in case:
            //outbounds.sort((a, b) => a.lineNumber - b.lineNumber);

            let totalRowsForGroup = 0;
            const lineRowDetails = outbounds.map(ob => {
              const batchCount = ob.inboundBatches.length || 1; // at least 1 row if no batches
              return { ...ob, batchCount };
            });

            totalRowsForGroup = lineRowDetails.reduce((sum, ob) => sum + ob.batchCount, 0);

            const soLineActualQty = getActualQty(salesOrderNumber, lineNumber, itemNumber);

            let accumulatedRows = 0;

            return (
              <React.Fragment key={groupIndex}>
                {lineRowDetails.map((obLine, obLineIndex) => {
                  const { orderUniqueReference, orderedSalesQuantity, outboundBatchDetails, outboundSerialDetails, inboundTotal, difference, inboundBatches, batchCount } = obLine;

                  // For the outbound batches and serial details, format them as strings
                  const outboundBatchStr = outboundBatchDetails && outboundBatchDetails.length > 0
                    ? outboundBatchDetails.map(b => `Qty: ${b.batchedOrderQuantity}, Batch#: ${b.itemBatchNumber || 'N/A'}`).join(' | ')
                    : 'No batch details';

                  const outboundSerialStr = outboundSerialDetails && outboundSerialDetails.length > 0
                    ? outboundSerialDetails.map(s => s.serialNumber || 'No Serial').join(', ')
                    : 'No Serial';

                  // We'll print the first inbound batch row in the same line as the outbound details
                  // Additional inbound batches will appear in subsequent rows with blanks in outbound columns.

                  return inboundBatches.length > 0 ? (
                    inboundBatches.map((batch, batchIndex) => {
                      // Determine if we print the left group columns and outbound columns on this row
                      // The very first row of the entire group prints the main grouping columns
                      // But we need the grouping columns only at the top row of the group.
                      const isFirstRowOfGroup = (obLineIndex === 0 && batchIndex === 0);
                      // We print SalesOrderNumber, Line#, Item#, SO Line Actual Qty only on the first row of the group
                      const printGroupColumns = isFirstRowOfGroup;
                      
                      // For outbound columns:
                      // Print them only on the first batch row of this outbound line
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
                              {/* Blank cells for outbound columns on subsequent batch rows */}
                              <td style={{ border: '1px solid #000' }}></td>
                              <td style={{ border: '1px solid #000' }}></td>
                              <td style={{ border: '1px solid #000' }}></td>
                              <td style={{ border: '1px solid #000' }}></td>
                              <td style={{ border: '1px solid #000' }}></td>
                              <td style={{ border: '1px solid #000' }}></td>
                            </>
                          )}

                          {/* Inbound batch breakdown columns */}
                          <td style={{ border: '1px solid #000' }}>{batch.itemBatchNumber}</td>
                          <td style={{ border: '1px solid #000' }}>{batch.batchedOrderQuantity}</td>
                          <td style={{ border: '1px solid #000' }}>{batch.batchExpiryDate}</td>
                          <td style={{ border: '1px solid #000' }}>{batch.batchProductStatus}</td>
                        </tr>
                      );
                    })
                  ) : (
                    // No inbound batches, just one row for this outbound line
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




function AppJsonAnalysisV1(){
    return(
    <div>
      <OutboundDisplay outboundData={outboundData} />
      <InboundDisplay inboundData={inboundData} />
      <Comparison outboundData={outboundData} inboundData={inboundData} />
      <ComplexComparison outboundData={outboundData} inboundData={inboundData} actualQuantities={70}/>
    </div>)
}
