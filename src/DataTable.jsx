import React from "react";
import { useTable } from "react-table";

const DataTable = ({ salesHeader, salesLines }) => {
  // Define columns for the sales lines
  const columns = React.useMemo(() => [
    { Header: "Line Number", accessor: "lineNumber" },
    { Header: "Item Number", accessor: "itemNumber" },
    { Header: "Description", accessor: "lineDescription" },
    { Header: "Ordered Quantity", accessor: "orderedSalesQuantity" },
    { Header: "Sales Price", accessor: "salesPrice" },
    { Header: "Requested Receipt Date", accessor: "requestedReceiptDate" },
    { Header: "Batch Details", accessor: "sOBatchDetails[0].itemBatchNumber" },
    { Header: "Batch Quantity", accessor: "sOBatchDetails[0].batchedOrderQuantity" },
  ], []);

  const tableInstance = useTable({ columns, data: salesLines });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      {/* Sales Header Information */}
      <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
        <h3>Sales Order Header</h3>
        <p><strong>Order Number:</strong> {salesHeader.salesOrderNumber}</p>
        <p><strong>Customer Name:</strong> {salesHeader.contactName}</p>
        <p><strong>Delivery Address:</strong> {salesHeader.deliveryAddressName}, {salesHeader.deliveryAddressCity}</p>
      </div>

      {/* Sales Lines Table */}
      <div style={{ overflowX: "auto", maxHeight: "400px", overflowY: "auto", border: "1px solid #ddd" }}>
        <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: "#f4f4f4",
                      textAlign: "left",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      style={{ border: "1px solid #ddd", padding: "8px" }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
