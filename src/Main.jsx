import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import * as XLSX from "xlsx";
import UserInput from "./UserInput";
import TrackingList from "./TrackingList";

function Main() {
  const [tabValue, setTabValue] = useState(0);
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [trackingInfo, setTrackingInfo] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (trackingInfo.length > 0) {
      trackingInfo.forEach(info => {
        fetchData(info);
      });
    }
  }, [trackingInfo]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      const slicedData = data.slice(0, 10);
      setExcelData(slicedData);
      if (slicedData.length > 0) {
        const trackingInfos = slicedData.map((order) => ({
          courier_name: order.courier_name,
          tracking_no: order.tracking_number,
        }));
        setTrackingInfo(trackingInfos);
      }
    }
  };

  const fetchData = async (trackingInfo) => {
    let api;
    if (trackingInfo.courier_name === "DHL") {
      api = "getDHL";
    } else if (trackingInfo.courier_name === "GEODIS") {
      api = "getGEODIS";
    }
    else return
    try {
      const response = await fetch(
        `http://localhost:3001/${api}?orderId=${trackingInfo.tracking_no}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const processedData = data.error
        ? { orderId: trackingInfo.tracking_no, error: data.error }
        : data;

      setShipmentData((prevShipmentData) => [
        ...prevShipmentData,
        processedData,
      ]);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error fetching data");
      setShipmentData([]);
    }
  };

  return (
    <Container>
      <h1 className="text-sky-400 text-3xl py-2">POD Tracking Tool</h1>
      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input
          type="file"
          className="form-control"
          required
          onChange={handleFile}
        />
        <button type="submit" className="btn btn-success btn-md ">
          UPLOAD
        </button>
        {typeError && (
          <div className="alert alert-danger" role="alert">
            {typeError}
          </div>
        )}
      </form>
      <div className="viewer">
        {excelData.length > 0 ? (
          <div className="first-elements">
            <ul>
              {trackingInfo.map((info, index) => (
                <li key={index} className="p-4">
                  <div className="flex justify-start items-center p-2">
                    {info.courier_name}: {info.tracking_no}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No File is uploaded</div>
        )}
      </div>
      {console.log(shipmentData)}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="tracking tabs"
      >
        <Tab label="Pending No." />
        <Tab label="Delivered No." />
      </Tabs>
      <Box>
        {tabValue === 0 && (
          <TrackingList status="pending" shipmentData={shipmentData} />
        )}
        {tabValue === 1 && (
          <TrackingList status="delivered" shipmentData={shipmentData} />
        )}
      </Box>
    </Container>
  );
}

export default Main;
