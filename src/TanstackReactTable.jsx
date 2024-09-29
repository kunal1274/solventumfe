import * as React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Define fallback data outside the component (stable reference)
const fallbackData = [];

// Basic data
const defaultData = [
  {
    firstName: "tanner",
    lastName: "linsley",
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

// Column helper
const columnHelper = createColumnHelper();

const ticketColumns = [
  columnHelper.accessor("Number", {
    cell: (info) => info.getValue(),
    header: () => "Number",
  }),
  columnHelper.accessor("Description", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Description</span>,
    enableResizing: true,
  }),
  columnHelper.accessor("Short Description", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Short Description</span>,
    enableResizing: true,
  }),
  columnHelper.accessor("Tags", {
    cell: (info) => info.getValue(),
    header: () => "Tags",
  }),
  columnHelper.accessor("Opened", {
    cell: (info) => info.getValue(),
    header: () => "Opened",
  }),
  columnHelper.accessor("Caller", {
    cell: (info) => info.getValue(),
    header: () => "Caller",
  }),
  columnHelper.accessor("Affected user", {
    cell: (info) => info.getValue(),
    header: () => "Affected User",
  }),
  columnHelper.accessor("Priority", {
    cell: (info) => info.getValue(),
    header: () => "Priority",
  }),
  columnHelper.accessor("State", {
    cell: (info) => info.getValue(),
    header: () => "State",
  }),
  columnHelper.accessor("Assigned to", {
    cell: (info) => info.getValue(),
    header: () => "Assigned To",
  }),
  columnHelper.accessor("Updated", {
    cell: (info) => info.getValue(),
    header: () => "Updated",
  }),
  columnHelper.accessor("Updated by", {
    cell: (info) => info.getValue(),
    header: () => "Updated By",
  }),
  columnHelper.accessor("Work notes", {
    cell: (info) => info.getValue(),
    header: () => "Work Notes",
  }),
  columnHelper.accessor("Latest Work Note", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Latest Work Note</span>,
  }),
  columnHelper.accessor("Resolved", {
    cell: (info) => info.getValue(),
    header: () => "Resolved",
  }),
  columnHelper.accessor("Resolved by", {
    cell: (info) => info.getValue(),
    header: () => "Resolved By",
  }),
];

export default function TanstackReactTable({ myData }) {
  // Using useMemo to memoize columns to prevent re-creation on every render

  // just for checking if one column is coming or not .

  const columns = React.useMemo(() => ticketColumns, []);

  const columns2 = React.useMemo(() => {
    return [
      columnHelper.accessor("Company", {
        id: "company",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("New Alias", {
        id: "newAlias",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Old Alias", {
        id: "oldAlias",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Network domain", {
        id: "networkDomain",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("User ID", {
        id: "userId",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("User name", {
        id: "userName",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("Enabled", {
        id: "enabled",
        cell: (info) => info.getValue(),
      }),
    ];
  }, []);
  const columns1 = React.useMemo(
    () => [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
        id: "fullName",
        cell: (info) => <b>{info.getValue()}</b>,
        header: () => <h2>Full Name</h2>,
      }),
      columnHelper.accessor("age", {
        header: () => "Age",
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("visits", {
        header: () => <span>Visits</span>,
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("progress", {
        header: "Profile Progress",
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => (row.visits * row.progress) / 100, {
        id: "avgVisit",
        header: () => <span>Avg Visits</span>,
        cell: (info) => info.getValue(),
      }),
    ],
    [] // Empty dependency array ensures this is only created once
  );

  // Memoizing the initial data state
  const [data, _setData] = React.useState(() => [...myData]);
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

  const rerender = React.useReducer(() => ({}), {})[1];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        React Table with Tailwind CSS
      </h1>
      <div className="overflow-x-auto shadow-lg border border-gray-300 rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100 border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    //className="text-left p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider"
                    className={`text-left p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider ${
                      header.column.columnDef.id === "description" ||
                      header.column.columnDef.id === "workNotes"
                        ? "w-1/4" // Make these columns wider
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    //className="p-4 text-sm text-gray-700"
                    className={`p-4 text-sm text-gray-700 ${
                      cell.column.columnDef.id === "description" ||
                      cell.column.columnDef.id === "workNotes"
                        ? "w-1/4" // Apply wider width for specific columns
                        : "w-auto"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id} className="bg-gray-50 border-t">
                {footerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left p-4 text-sm font-semibold text-gray-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => rerender()}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
        >
          Rerender
        </button>
      </div>
    </div>
  );
}
