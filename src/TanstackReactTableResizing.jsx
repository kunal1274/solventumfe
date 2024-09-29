import React, { useState } from "react";

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
    accessorKey: "Short Description",
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
    accessorKey: "Latest Work Note",
    cell: (info) => info.getValue(),
    header: () => "Latest Update",
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
    header: () => "Focus",
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

export default function TanstackReactTableResizing({ myData,searchText,handleChange }) {
  //const [data] = React.useState(() => [...myData]);
  const [columns] = React.useState(() => [...ticketColumns]);
  //const [myFinalData,setMyFinalData] = useState([...myData]);

  //   console.log("My Data resizing", myData);
  //   console.log("data in resize", data);

  const [columnResizeMode, setColumnResizeMode] = React.useState("onChange");
  const [columnResizeDirection, setColumnResizeDirection] =
    React.useState("ltr");

  const rerender = React.useReducer(() => ({}), {})[1];

  // const myFinalData = searchText ? 
 // myData.filter((ele,idx)=> Object.values(ele).toLowerCase().includes(searchText.toLowerCase())) : myData;

  const table = useReactTable({
    data: myData ?? fallbackData,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2">
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
        <input className="b-2 p-2 my-2 " type="text" placeholder="Search..." onChange={handleChange}/>
        <p>{searchText}</p>
        <button className="b-2 border text-violet-600 p-1 my-1 text-md" onClick={()=> myData.filter((ele,idx)=>{
          return ele["Description"].toLowerCase().includes(searchText.toLowerCase());
        })}>Search</button>
        <div className="text-xl">{"<table/>"}</div>
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
