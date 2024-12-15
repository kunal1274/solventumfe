import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { FixedSizeList } from "react-window";

const fallbackDataInitial = [];

const columnHelper = createColumnHelper();

const outboundColumns = [
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: () => "id",
      }),
  columnHelper.accessor("Message Id", {
    cell: (info) => info.getValue(),
    header: () => "Message ID",
  }),
  columnHelper.accessor("Legal entity", {
    cell: (info) => info.getValue(),
    header: () => "Legal Entity",
  }),
  columnHelper.accessor("Interface name", {
    cell: (info) => info.getValue(),
    header: () => "Interface Name",
  }),
  columnHelper.accessor("Flow", {
    cell: (info) => info.getValue(),
    header: () => "Flow",
  }),
  columnHelper.accessor("Key field", {
    cell: (info) => info.getValue(),
    header: () => "Key Field",
  }),
  columnHelper.accessor("Response status", {
    cell: (info) => info.getValue(),
    header: () => "Response Status",
  }),
  columnHelper.accessor("CS Remark", {
    cell: (info) => info.getValue(),
    header: () => "CS Remark",
  }),
  columnHelper.accessor("CS Progress Status", {
    cell: (info) => info.getValue(),
    header: () => "CS Progress Status",
  }),
  columnHelper.accessor("Log description", {
    cell: (info) => info.getValue(),
    header: () => "Log Description",
  }),
  columnHelper.accessor("Payload JSON", {
    cell: (info) => (
      <pre className="whitespace-pre-wrap text-xs">
        {JSON.stringify(info.getValue(), null, 2)}
      </pre>
    ), // Pretty-print JSON
    header: () => "Payload JSON",
  }),
  columnHelper.accessor("Response date and time", {
    cell: (info) => info.getValue(),
    header: () => "Response Date and Time",
  }),
  columnHelper.accessor("Created by", {
    cell: (info) => info.getValue(),
    header: () => "Created By",
  }),
  columnHelper.accessor("Modified by", {
    cell: (info) => info.getValue(),
    header: () => "Modified By",
  }),
  columnHelper.accessor("Modified date and time", {
    cell: (info) => info.getValue(),
    header: () => "Modified Date and Time",
  }),
];


export default function TanstackTableJsonAnalysisBulk({ myData,fallbackData }) {
    // Using useMemo to memoize columns to prevent re-creation on every render
  
    // just for checking if one column is coming or not .
  
const columns = React.useMemo(() => outboundColumns, []);

  // Memoizing the initial data state
  const [data, _setData] = React.useState(() => [...myData]);
  const [rerenderCompleted, setRerenderCompleted] = React.useState(false);
  const [modalContent,setModalContent] = React.useState(null);
  //const [data, _setData] = React.useState(myData);
  //   console.log("My Data", myData);
  //   console.log("Data now ", data);

  // Use useMemo to create the table instance
  const table = useReactTable({
    data: myData ?? fallbackData, // fallbackData ensures stability
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 200, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
  });

   // Estimate row height (if rows are uniform)
   const rowHeight = 50;

  const rerender = React.useReducer(() => ({}), {})[1];

  React.useEffect(() => {
    if (rerenderCompleted) {
        setModalContent(<p>Rerendering has completed successfully!</p>);
      //alert("Rerendering has completed successfully!");
      setRerenderCompleted(false); // Reset the state
    }
  }, [rerenderCompleted]);

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Outbound Data Table</h1>
      <div className="overflow-x-auto shadow-lg border border-gray-300 rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100 border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`text-left p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider ${
                      header.column.columnDef.id === "Payload JSON"
                        ? "w-1/4" // Adjust width for the Payload JSON column
                        : "w-auto" // Dynamically resize other columns
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          </table>
          <FixedSizeList
                    height={
                        myData.length > 0
                          ? Math.min(myData.length * rowHeight, 600) // Cap the height at 600px
                          : rowHeight // Match the height of a single row when no data
                      } // Adjust based on available space
                    itemCount={table.getRowModel().rows.length}
                    itemSize={rowHeight}
                    className="border border-gray-300"
                >
                    {({ index, style }) => {
                        const row = table.getRowModel().rows[index];
                        return (
                            <div
                                key={row.id}
                                style={style}
                                className="border-b hover:bg-gray-100 transition-colors flex"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <div
                                        key={cell.id}
                                        className={`p-4 text-sm text-gray-700 ${
                                            cell.column.columnDef.id === "Payload JSON"
                                                ? "whitespace-pre-wrap text-xs"
                                                : ""
                                        }`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                ))}
                            </div>
                        );
                    }}
                </FixedSizeList>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => {
            rerender();
            setRerenderCompleted(true); // Set the state when rerender starts
            //alert("Rerendering has been triggered successfully!"); // Show alert
            setModalContent(<p>Rerendering has been triggered successfully!</p>);
        }}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
        >
          Rerender
        </button>
      </div>
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
