import React, { useState, useEffect } from "react";
import "./App.css";
import Heading from "./components/atoms/Heading";
import Div from "./components/molecules/Div";
import MainContent from "./components/organisms/MainContent";
import { strSplit, convertArrToMatrix } from "./utils/dataUtils";
import { findLongestWorkingPair } from "./utils/findLongestWorkingPair";

function App() {
  // State to hold the data from the CSV file
  const [data, setData] = useState([]);
  // State to store the result text for display
  const [resultText, setResultText] = useState("");
  // State to store the raw results
  const [results, setResults] = useState([]);
  // State to track whether data has been loaded
  const [dataLoaded, setDataLoaded] = useState(false);

  // Effect to set dataLoaded to true when data changes
  useEffect(() => {
    if (data.length > 0) {
      setDataLoaded(true);
    }
  }, [data]);

  // Function to handle file upload
  function handleFileUpload(e) {
    e.persist(); // Persist the synthetic event to be used asynchronously

    // Get the selected file from the input
    const file = e.target.files[0];
    // Create a FileReader to read the contents of the file
    const reader = new FileReader();
    // Array to store any validation errors
    const errors = [];
    // Allowed file type
    const allowedType = "text/csv";

    // Check if the selected file is a CSV file
    if (!allowedType.includes(file?.type)) {
      alert("Only CSV files are allowed.");
      return;
    }

    // Read the contents of the file as text
    reader.readAsText(file);

    // Callback function triggered when the file reading is complete
    reader.onload = function () {
      // Split the text into an array of rows
      const dataArr = strSplit(reader.result);
      // Convert the array of rows into a matrix (2D array)
      const dataMatrix = convertArrToMatrix(dataArr);

      // Check for invalid rows (not containing exactly 4 elements)
      dataMatrix.forEach((row, index) => {
        if (row.length !== 4) {
          errors.push(index + 1);
        }
      });

      // If there are validation errors, alert the user and stop processing
      if (errors.length !== 0) {
        errors.forEach((error) => alert(`Data on row ${error} is invalid!`));
        return;
      }
      // Set the data state with the valid matrix
      setData(dataMatrix);
      // Trigger the function to find the longest working pair and update results state
      findLongestWorkingPair(dataMatrix, setResults);
    };
  }

  // Function to process and display the results
  function pairResult() {
    // Create a mapping to store unique pairs and their corresponding project IDs and days
    const pairMap = {};

    // Iterate through results to populate the pairMap
    results.forEach((result) => {
      // Generate a unique key for each pair by joining employee IDs
      const pairKey = result.Pair.join(",");

      // Check if the pair is not in the map, initialize its entry
      if (!pairMap[pairKey]) {
        pairMap[pairKey] = {
          Pairs: result.Pair,
          Projects: [],
          TotalDays: 0, // Initialize total days
        };
      }

      // Create project information
      const projectInfo = {
        ProjectID: result.ProjectID,
        Days: result.Days,
      };

      // Add project info to the pair's entry in the map
      pairMap[pairKey].Projects.push(projectInfo);

      // Update total days for the pair
      pairMap[pairKey].TotalDays += result.Days; 
    });

    // Generate the result text from the pairMap
    const newResultText = Object.values(pairMap).map((pairInfo) => (
      <div key={pairInfo.Pairs.join(",")}>
        <p>Results: </p>
        <p>Employee IDs: {pairInfo.Pairs.join(", ")}</p>
        <div>
          {pairInfo.Projects.map((proj) => (
            <p key={proj.ProjectID}>
              Project ID: {proj.ProjectID}, Days: {proj.Days}
            </p>
          ))}
        </div>
        <p>Total Days: {pairInfo.TotalDays}</p>
      </div>
    ));

    // Set the new result text in the state
    setResultText(newResultText);
  }

  // Function to display the data table
  function showTable() {
    // Get the reference to the data table element by its ID
    var table = document.getElementById("data-table");

    // Set the display style to "block" to make the table visible
    table.style.display = "block";
  }

  // Function to display the results section
  function showResult() {
    // Get the reference to the result element using a class selector
    var result = document.querySelector(".result");

    // Check if the result element exists and data has been loaded
    if (result && dataLoaded) {
      // If conditions are met, set the display style to "block" to make the results visible
      result.style.display = "block";
    } else {
      // If no result element or data is not loaded, show an alert asking to upload a CSV file
      alert("Please, upload a CSV file first!");
    }
  }

  // Render the main component
  return (
    <Div className="App">
      <Heading title="Employees & Projects" />
      <MainContent
        handleFileUpload={handleFileUpload}
        pairResult={pairResult}
        showTable={showTable}
        showResult={showResult}
        data={data}
        resultText={resultText}
      />
    </Div>
  );
}

// Export the main component
export default App;
