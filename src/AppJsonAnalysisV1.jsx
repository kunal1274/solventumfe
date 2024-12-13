import React from "react";
import DataTable from "./DataTableV1";

const jsonData = [
  {
    requestHeader: {
      channelName: "",
      countryCode: "6135",
      dateTime: "2024-08-29T07:30:46",
      messageId: "A9858E26-139E-46E1-9651-F984A3FBBF80",
      receiverId: "DHLAU",
      senderId: "SOLVENTUMDHLANZ",
    },
    sOHeader: {
      contactName: "Purchasing Team",
      customerAccountNumber: "6135C000183",
      customersOrderReference: "PO-19569",
      deliveryAddressCity: "STEPNEY",
      orderPriority: "10",
    },
  },
  // Add the remaining data similarly...
];

function App() {
  return (
    <div>
      <h1>Excel-Like Data Table</h1>
      <DataTable data={jsonData} />
    </div>
  );
}

export default App;
