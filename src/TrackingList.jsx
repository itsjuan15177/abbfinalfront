import React from "react";

const TrackingList = ({ status, shipmentData }) => {
  // Ensure shipmentData is always an array to prevent map on undefined error
  const data = shipmentData || [];
  // console.log(data[0].data.shipments[0].status.statusCode)
  return (
    <div>
      <h2>
        {status === "pending" ? "Pending Shipments" : "Delivered Shipments"}
      </h2>
      {data.length === 0 ? (
        <p>No shipments to display</p>
      ) : (
        <ul>
          {data.map((shipment, index) => (
            <li key={index}>
              <strong>Order ID:</strong> {shipment.orderId}
              <br />
              <strong>Status:</strong> {shipment.status}
              <br />
              <strong>POD Date:</strong>{" "}
              {shipment.ETA} <br />
              {/* Adjust according to your data structure */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackingList;
