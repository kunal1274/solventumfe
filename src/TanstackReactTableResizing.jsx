import React, { useState,useEffect } from "react";
import * as XLSX from 'xlsx';

import "./TanstackReactTableResizing.css";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
const fallbackData = [];

const defaultData = [
  {
    firstName: "tanner",
    lastName:
      "2024-09-23 19:56:38 - Purabi Samanta (Work Notes) Work Around soulit porivieo 2024-09-23 02:45:12 - System (Work notes) Proposed as major incident 2024-09-23 01:04:23 - Vinu(Work notes) Increaseing the priority 2024-09-18 13:32:35 - Purabi Samanta(Work notes) High Priority Ticket 2024-09-17 21:34:34 - Faayx(Work notes) Hi Tracy, The Standaroerueo is not working as per expected behavioute nad we are workotueo Please reacoh out for urteuro t clarification . Thanks you Fayaze",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const ticketColumns = [
  {
    accessorKey: "Number",
    cell: (info) => info.getValue(),
    header: () => "Number",
  },
  {
    accessorKey: "Description",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Description</span>,
    enableResizing: true,
  },
  {
    accessorKey: "Short Desc", // this is a custom method 
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Short Desc</span>,
    enableResizing: true,
  },
  {
    accessorKey: "Tags",
    cell: (info) => info.getValue(),
    header: () => "Tags",
  },
  {
    accessorKey: "Opened",
    cell: (info) => info.getValue(),
    header: () => "Opened",
  },
  {
    accessorKey: "Caller",
    cell: (info) => info.getValue(),
    header: () => "Caller",
  },
  {
    accessorKey: "Affected user",
    cell: (info) => info.getValue(),
    header: () => "Affected User",
  },
  {
    accessorKey: "Priority",
    cell: (info) => info.getValue(),
    header: () => "Priority",
  },
  {
    accessorKey: "State",
    cell: (info) => info.getValue(),
    header: () => "State",
  },
  {
    accessorKey: "Assigned to",
    cell: (info) => info.getValue(),
    header: () => "Assigned To",
  },
  {
    accessorKey: "Updated",
    cell: (info) => info.getValue(),
    header: () => "Updated",
  },
  {
    accessorKey: "Updated by",
    cell: (info) => info.getValue(),
    header: () => "Updated By",
  },
  {
    accessorKey: "Work notes",
    cell: (info) => info.getValue(),
    header: () => "Work Notes",
  },
  {
    accessorKey: "Latest Note", // this is a custom method 
    cell: (info) => info.getValue(),
    header: () => "Latest Note",
  },
  {
    accessorKey: "Resolved",
    cell: (info) => info.getValue(),
    header: () => "Resolved",
  },
  {
    accessorKey: "Resolved by",
    cell: (info) => info.getValue(),
    header: () => "Resolved By",
  },
  {
    accessorKey: "Short description",
    cell: (info) => info.getValue(),
    header: () => "Short description",
  },
  {
    accessorKey: "Additional comments", // this is a custom method 
    cell: (info) => info.getValue(),
    header: () => "Additional comments",
  },
  {
    accessorKey: "Latest Comments",
    cell: (info) => info.getValue(),
    header: () => "Latest Comments",
  },
  {
    accessorKey: "Final Comments",
    cell: (info) => info.getValue(),
    header: () => "Final Comments",
  },
];

const defaultColumns1 = [
  {
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        header: "More Info",
        columns: [
          {
            accessorKey: "visits",
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "status",
            header: "Status",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "progress",
            header: "Profile Progress",
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];




export function ExportToExcelButton({ tableData }) {
  // Function to generate and download the Excel file
  const exportToExcel = () => {
    // Define the table columns
    const worksheetData = [
      ['Number', 'Description', 'Short Desc', 'Tags', 'Opened', 'Caller', 'Affected U'], // Table Headers
    ];

    // Push table rows into worksheet data
    tableData.forEach(row => {
      worksheetData.push([
        row.Number,
        row.Description,
        row['Short Desc'],
        row.Tags,
        row.Opened,
        row.Caller,
        row['Affected U']
      ]);
    });

    // Create a new worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'Tickets.xlsx');
  };

  return (
    <div>
      <button onClick={exportToExcel} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Export Table to Excel
      </button>
    </div>
  );
}


export default function TanstackReactTableResizing({ myData }) {
  //const [data] = React.useState(() => [...myData]);
  const [columns] = React.useState(() => [...ticketColumns]);
  //const [myFinalData,setMyFinalData] = useState([...myData]);

  //   console.log("My Data resizing", myData);
  //   console.log("data in resize", data);

  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");
  const [columnResizeDirection, setColumnResizeDirection] =
    React.useState("ltr");

  const [searchText, setSearchText] = useState("");
  const [status,setStatus] = useState({
    "New" : true,
    "In Progress" : true,
    "Assigned":true,
    "Resolved" : false,
    "Closed":false,
    "Cancelled": false
  })
  const [filteredData, setFilteredData] = useState(myData);

  const handleStatusChange = (statusName) => {
    setStatus((prevStatus)=>{
      const newStatus = {
        ...prevStatus,
        [statusName] : !prevStatus[statusName]
      }
      return newStatus;
    })
  }

  // Handle search filter
  useEffect(() => {
    const filtered = myData.filter((row) => {
      const searchMatch =  Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase());
      //const y = (row["State"] === "New" || row["State"] === "In Progress" || row["State"] === "Assigned");
      const statusMatch = status[row["State"]]
              //return x && y;
              return searchMatch && statusMatch;
    });
    setFilteredData(filtered);
  }, [searchText, status, myData]);



  const rerender = React.useReducer(() => ({}), {})[1];

// not used
  const downloadCSV = () => {
    let csvData = "Number,Description,Short Desc,Tags,Opened,Caller,Affected U\n";
    myData.forEach((row) => {
      csvData += `${row.Number},${row.Description},${row["Short Desc"]},${row.Tags},${row.Opened},${row.Caller},${row["Affected U"]}\n`;
    });

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "table_data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }; // not used 

  // not used 
  const downloadExcel = () => {
    let excelData = "Number\tDescription\tShort Desc\tTags\tOpened\tCaller\tAffected U\n";
    
    myData.forEach((row) => {
      excelData += `${row.Number}\t${row.Description}\t${row["Short Desc"]}\t${row.Tags}\t${row.Opened}\t${row.Caller}\t${row["Affected U"]}\n`;
    });

    // Copy the Excel-formatted data to clipboard
    navigator.clipboard.writeText(excelData).then(
      function () {
        alert("Table data copied to clipboard! You can now paste it into Excel.");
      },
      function () {
        alert("Failed to copy data!");
      }
    );
  } // not used 

  // const myFinalData = searchText ? 
 // myData.filter((ele,idx)=> Object.values(ele).toLowerCase().includes(searchText.toLowerCase())) : myData;

  const table = useReactTable({
    data: filteredData ?? fallbackData,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2 space-x-2">
      <select
        value={columnResizeMode}
        onChange={(e) => setColumnResizeMode(e.target.value)}
        className="border p-2 border-black rounded"
      >
        <option value="onEnd">Resize: "onEnd"</option>
        <option value="onChange">Resize: "onChange"</option>
      </select>
      <select
        value={columnResizeDirection}
        onChange={(e) => setColumnResizeDirection(e.target.value)}
        className="border p-2 border-black rounded"
      >
        <option value="ltr">Resize Direction: "ltr"</option>
        <option value="rtl">Resize Direction: "rtl"</option>
      </select>
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className="h-4" />
        <input
        className="border border-1 rounded-md border-blue-400 p-2 my-2"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="h-2"/>
      <div className="flex flex-row space-x-4 my-2">
        {
          Object.keys(status).map((statusName)=>(
            <label className="space-x-2" key={statusName}>
              <input
              
              type="checkbox"
              checked={status[statusName]}
              onChange={()=> handleStatusChange(statusName)}
              />
              {statusName}
            </label>
          ))
        }
      </div>
      <ExportToExcelButton tableData={filteredData}/>
      {/* <button onClick={downloadExcel} className="border border-2 text-gray-500 bg-red-200">Copy to Clipboard</button> */}
      <p>Searched Total : {filteredData.length} out of which Active Total : {filteredData.filter((ele,idx)=>(ele["State"] === "New" || ele["State"] === "In Progress" || ele["State"] === "Assigned")).length}</p>
      <p>New Total : {filteredData.filter((ele,idx)=>(ele["State"] === "New")).length}</p>
      <p>Assigned Total : {filteredData.filter((ele,idx)=>(ele["State"] === "Assigned")).length}</p>
      <p>WIP Total : {filteredData.filter((ele,idx)=>(ele["State"] === "In Progress")).length}</p>
      <p>Resolved/Closed Total : {filteredData.filter((ele,idx)=>(ele["State"] === "Resolved" || ele["State"] === "Closed")).length}</p>
      <p>Cancelled Total : {filteredData.filter((ele,idx)=>(ele["State"] === "Cancelled")).length}</p>
        {/* <p>{searchText}</p> */}
        {/* <button className="border border-4 border-blue-600 text-gray-700" onClick={downloadCSV}>Download CSV</button> */}
        
        
        <div className="text-xl">{"Solventum Tickets"}</div>
        <div className="overflow-x-auto">
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            table.options.columnResizeDirection
                          } ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                          style: {
                            transform:
                              columnResizeMode === "onEnd" &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    (table.options.columnResizeDirection ===
                                    "rtl"
                                      ? -1
                                      : 1) *
                                    (table.getState().columnSizingInfo
                                      .deltaOffset ?? 0)
                                  }px)`
                                : "",
                          },
                        }}
                      />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      {...{
                        key: cell.id,
                        style: {
                          width: cell.column.getSize(),
                        },
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-4" />
      <button onClick={rerender} className="border text-blue-500 p-2">
        Rerender
      </button>
    </div>
  );
}
