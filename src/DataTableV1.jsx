import React from "react";
import { useTable } from "react-table";

const DataTable = ({ data }) => {
  // Extract data for table headers and rows
  const columns = React.useMemo(() => {
    // Map keys from the JSON to columns
    return [
      {
        Header: "Request Header",
        columns: [
          { Header: "Message ID", accessor: "requestHeader.messageId" },
          { Header: "Sender ID", accessor: "requestHeader.senderId" },
          { Header: "Receiver ID", accessor: "requestHeader.receiverId" },
          { Header: "Country Code", accessor: "requestHeader.countryCode" },
          { Header: "Date Time", accessor: "requestHeader.dateTime" },
        ],
      },
      {
        Header: "Order Details",
        columns: [
          { Header: "Customer Name", accessor: "sOHeader.contactName" },
          { Header: "Customer Account", accessor: "sOHeader.customerAccountNumber" },
          { Header: "Order Reference", accessor: "sOHeader.customersOrderReference" },
          { Header: "Delivery City", accessor: "sOHeader.deliveryAddressCity" },
          { Header: "Order Priority", accessor: "sOHeader.orderPriority" },
        ],
      },
    ];
  }, []);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue", width: "100%" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{ border: "solid 1px gray", padding: "10px" }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{ border: "solid 1px gray", padding: "10px" }}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
