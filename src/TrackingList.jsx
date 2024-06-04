import React from "react";
import "./TrackingList.css";
import * as XLSX from "xlsx";

const TrackingList = ({ status, shipmentData }) => {
  const data = shipmentData || [];
  console.log("Data:", data);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Shipments");
    XLSX.writeFile(workbook, "shipments.xlsx");
  };

  return (
    <div>
      <h2>
        {status === "pending" ? "Pending Shipments" : "Delivered Shipments"}
      </h2>
      {data.length > 0 && (
        <button onClick={downloadExcel}>Download Excel</button>
      )}
      {data.length === 0 ? (
        <p>No shipments to display</p>
      ) : (
        <table className="shipment-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>POD Date</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((shipment, index) => (
              <tr key={index}>
                <td>{shipment.orderId}</td>
                <td>{shipment.status}</td>
                <td>{shipment.ETA}</td>
                <td>{shipment.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TrackingList;
