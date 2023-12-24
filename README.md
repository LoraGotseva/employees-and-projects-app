# Employees & Projects React Application
This is a React JS application that identifies the pair of employees who
have worked together on common projects for the longest period
of time and the time for each of those projects.
## Table of contents
- [Getting Started with Create React App](#getting-started-with-create-react-app)
- [Features](#features)
    - [Upload a CSV file](#upload-a-csv-file)
       - [handleFileUpload Function](#handlefileupload-function)
    - [Calculate the result](#calculate-the-result)
        - [findLongestWorkingPair Function](#findlongestworkingpair-function)
        - [Data Processing](#data-processing)
        - [Calculating the overlapping days](#calculating-the-overlapping-days)
        - [Date Parsing](#date-parsing) 
    - [Show the result](#show-the-result)    
- [Appearance](#appearance)
- [Credit](#credit)

## Getting Started with Create React App



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### 

## Features
In this project you can upload a csv file  containing IDs of employees, projects, as well as the start date of work on a particular project and the completion date for a specific employee.
## Upload a CSV file

The uploaded file should be in this format: 
``143, 10, 2013-11-01, 2014-01-05
218, 12, 2012-05-10, 2012-05-13
143, 12, 2009-01-01, 2012-05-13
218, 10, 2014-01-01, NULL``

The file will visualize like the following table: 
| Employee ID | Project ID | Start Date | End Date
| --- | --- | --- | --- |
| 143 | 10 | 2013-11-01 | 2014-01-05
| 218 | 12 | 2012-05-10 | 2012-05-13
| 143 | 12 | 2009-01-01| 2012-05-13
| 218 | 10 | 2014-01-01 | NULL

The most common date formats are supported: 
- ISO Date: "2015-03-25" (The International Standard)
- Short Date: "03/25/2015"
- Long Date: "25 Mar 2015"

### handleFileUpload Function

#### <i>Purpose:</i>

The handleFileUpload function is designed to handle the upload of a CSV file in a React application. It performs asynchronous file reading using the FileReader API, validates the file type, checks for formatting errors, and updates the application state with the parsed data.

#### <i>Parameters:</i>
<b>e</b>: A synthetic event representing the file upload event triggered by the user.

#### <i>Steps:</i>
1. Persist Synthetic Event:

   <span style="color:orange;">e.persist()</span> - 
   Persists the synthetic event to ensure it remains available for asynchronous operations, particularly within the file reading callback.

2. Extract File Information:

    <span style="color:orange;">const file = e.target.files[0]</span> -
Retrieves the selected file from the input element.
3. Initialize FileReader:

    <span style="color:orange;">const reader = new FileReader()</span> -
Creates a new FileReader instance to read the contents of the file.
4. File Type Validation:

    <span style="color:orange;">const allowedType = "text/csv";<br>
if (!allowedType.includes(file?.type)) { ... } </span> - 
Checks if the selected file is a CSV file. If not, displays an alert and terminates further processing.

5. Read File Contents:

    <span style="color:orange;">reader.readAsText(file)</span> - 
Initiates the reading of the file contents as text.

6. File Reading Callback:

    <span style="color:orange;">reader.onload = function () { ... } </span> - 
Defines a callback function to handle the file reading completion.

7. Parse File Contents:

    <span style="color:orange;">const dataArr = strSplit(reader.result) </span> - 
Splits the text content into an array of rows using the strSplit utility function.

8. Convert to Matrix:

    <span style="color:orange;">const dataMatrix = convertArrToMatrix(dataArr) </span> - 
Converts the array of rows into a matrix (2D array) using the convertArrToMatrix utility function.

9. Data Validation:

    <span style="color:orange;">dataMatrix.forEach((row, index) => { ... }) </span> - 
Checks for invalid rows (rows not containing exactly 4 elements). Displays alerts for any validation errors.

10. Update State:

    <span style="color:orange;">setData(dataMatrix); </span> - 
Sets the application state with the valid matrix data.

11. Invoke Data Processing Function:

    <span style="color:orange;">findLongestWorkingPair(dataMatrix, setResults); </span> - 
Calls a function (findLongestWorkingPair) to process the data and update the results state.
## Calculate the result
### findLongestWorkingPair Function
#### <i>Purpose</i>
The findLongestWorkingPair function is designed to analyze a matrix of employee data, identify pairs of employees working on the same project, calculate the overlapping days of their work, and determine the longest working pair for each project. The results are then formatted and stored for further use.

#### <i>Parameters</i>
<b>dataMatrix:</b> A 2D array representing the employee data, where each row contains information about an employee's ID, project ID, start date, and end date.

<b>setResults:</b> A function used to update the state with the results of the analysis.

#### <i>Steps</i>
1. Initialize Variables:

    Initializes an object (<span style="color:orange;">projectPairs</span>) and variables ( <span style="color:orange;">maxWorkingTogetherDays, sumOfDays, longestWorkingPair, newResults</span>) to track project pairs and related information.

2. Iterate Over Employee Pairs:

    Nested loops iterate through each pair of employees in the  <span style="color:orange;">dataMatrix</span>.
3. Check for Same Project:

    Checks if the pairs are working on the same project  (<span style="color:orange;">dataMatrix[i][1] === dataMatrix[j][1]</span>).
4. Calculate Overlapping Days:

    Calculates overlapping days using the  <span style="color:orange;">calculateOverlappingDays function</span>.
5. Process Overlapping Pairs:

    If there are overlapping days, stores the pair, project ID, and overlapping days in the  <span style="color:orange;">projectPairs object</span>.
6. Find Longest Working Pair:

    Iterates through  <span style="color:orange;">projectPairs</span> to find the longest working pair for each project.
7. Update Results:

    Updates variables tracking the maximum working together days and the longest working pair.
8. Build Result Object:

    Creates result objects with project ID, employee IDs of the longest working pair, and the total working days.
9. Update State:

    Updates the state (<span style="color:orange;">setResults</span>) with the new results array.
### Data Processing 
#### strSplit Function
<i>Purpose:</i>

The strSplit function is designed to split a string into an array of lines, handling different line break characters such as \r\n, \n, and \r.

<i>Parameters:</i>

<b>str:</b> The input string to be split into an array of lines.

<i>Steps:</i>

1. Uses the split method with a regular expression to split the input string based on different line break characters.
2. Returns an array where each element represents a line of the original string.

#### convertArrToMatrix Function
<i>Purpose:</i>

The convertArrToMatrix function converts an array of string rows into a 2D array (matrix). It filters out empty rows and trims whitespace from each cell value.

<i>Parameters:</i>

<b>arr:</b> An array of string rows representing the data.

<i>Steps:</i>

1. Filters out rows with only whitespace or no content, using the filter method.
2. Maps each remaining row by splitting it into an array of cells using the comma as a delimiter.
3. Trims each cell value using the trim method.
4. Returns the resulting 2D array (matrix) where each row corresponds to a line from the original array.
### Calculating the overlapping days
#### calculateOverlappingDays Function
<i>Purpose:</i>

The calculateOverlappingDays function calculates the number of overlapping days between two date ranges. It utilizes parsed date values obtained from a specified date parsing module.

<i>Parameters: </i>

<b>dateFrom1:</b> Start date of the first date range.

<b>dateTo1:</b> End date of the first date range. If set to "NULL," the current date is used.

<b>dateFrom2:</b> Start date of the second date range.

<b>dateTo2:</b> End date of the second date range. If set to "NULL," the current date is used.

<i>Steps:</i>

1. Parse Dates:

    Parses the start and end dates of both date ranges using the parseDate function from the specified date parsing module.
2. Handle "NULL" Values:

    If the end date of either date range is set to "NULL," it is replaced with the current date.
3. Calculate Overlapping Period:

    Finds the maximum of the start dates and the minimum of the end dates to determine the overlapping period.
4. Check for Overlap:

    If there is an actual overlap, calculates the duration of the overlap in days.
5. Return Result:

    Returns the calculated overlap duration. If there is no overlapping period, it returns 0.
### Date Parsing
### parseISODate Function

<i>Purpose:</i>

The parseISODate function parses a date string in the ISO format (YYYY-MM-DD) and returns a JavaScript Date object.

<i>Parameters:</i>

<b>dateString:</b> The date string in the ISO format.

<i>Steps:</i>

1. Uses a regular expression to match the ISO date format.
2. If a match is found, destructures the matched values into year, month, and day.
3. Creates a new Date object using the matched year, month (subtracting 1 since months are 0-based), and day.
4. Returns the parsed Date object. If no match is found, returns null.

### parseShortDate Function

<i>Purpose:</i>

The parseShortDate function parses a date string in the short format (MM/DD/YYYY) and returns a JavaScript Date object.

<i>Parameters:</i>

<b>dateString</b>: The date string in the short format.

<i>Steps:</i>

1. Uses a regular expression to match the short date format.
2. If a match is found, destructures the matched values into month, day, and year.
3. Creates a new Date object using the matched year, month (subtracting 1 since months are 0-based), and day.
4. Returns the parsed Date object. If no match is found, returns null.

### parseISODate Function

<i>Purpose:</i>

The parseISODate function parses a date string in the ISO format (YYYY-MM-DD) and returns a JavaScript Date object.

<i>Parameters:</i>

<b>dateString</b>: The date string in the ISO format.

<i>Steps:</i>

1. Uses a regular expression to match the ISO date format.
2. If a match is found, destructures the matched values into year, month, and day.
3. Creates a new Date object using the matched year, month (subtracting 1 since months are 0-based), and day.
4. Returns the parsed Date object. If no match is found, returns null.

### parseShortDate Function

<i>Purpose:</i>

The parseShortDate function parses a date string in the short format (MM/DD/YYYY) and returns a JavaScript Date object.

<i>Parameters:</i>

<b>dateString</b>: The date string in the short format.

<i>Steps:</i>

1. Uses a regular expression to match the short date format.
2. If a match is found, destructures the matched values into month, day, and year.
3. Creates a new Date object using the matched year, month (subtracting 1 since months are 0-based), and day.
4. Returns the parsed Date object. If no match is found, returns null.

### parseLongDate Function

<i>Purpose:</i>

The parseLongDate function parses a date string in various long formats and returns a JavaScript Date object.

<i>Parameters:</i>

<b>dateString</b>: The date string in long formats (DD Month YYYY).

<i>Steps:</i>

1. Uses a regular expression to match different long date formats.
2. If a match is found, destructures the matched values into month1, day, year1, day2, month2, and year2.
3. Chooses the month and year based on the matched values.
4. Creates a new Date object using the chosen month, day, and year.
5. Returns the parsed Date object. If no match is found, returns null.


### parseDate Function

<i>Purpose:</i>

The parseDate function attempts to parse a date string using different formats (ISO, Short, and Long). It returns a JavaScript Date object or null if parsing fails.

<i>Parameters:</i>

<b>dateString</b>: The date string to be parsed.

<i>Steps:</i>

1. Attempts to parse the date using the parseISODate, parseShortDate, and parseLongDate functions.
2. Returns the first valid Date object. If none of the parsers succeed, returns null.
## Show the result
### pairResult Function
<i>Purpose:</i>

The pairResult function is responsible for generating a summary of results by organizing them into unique pairs of employee IDs along with corresponding project IDs and total working days. It transforms the raw result data into a more structured format for presentation.

<i>Steps:</i>
1. Initialize Pair Map:

    Create an empty mapping (pairMap) to store unique pairs and their related project information.
2. Populate Pair Map:

    Iterate through the results array to populate the pairMap.
    For each result, generate a unique key for the pair by joining the employee IDs.
    Check if the pair already exists in the map; if not, initialize its entry with an empty array for projects and a total days counter.
    
3. Update Pair Map with Project Information:

    For each result, create project information containing the project ID and the number of days.
Add the project information to the pair's entry in the map.
4. Update Total Days:

    Update the total days counter for each pair in the map.
5. Generate Result Text:

    Convert the information in the pairMap into a formatted result text.
    Create a React element for each unique pair, displaying employee IDs, project details, and total days.
6. Set Result Text in State:

    Update the state with the new result text.
### showTable Function
<i>Purpose:</i>

The showTable function is designed to display the data table on the web page.

<i>Steps:</i>

1. Get Table Element:

    Retrieves the reference to the HTML table element using its ID ("data-table").
2. Set Display Style:

    Sets the CSS display style of the table element to "block," making it visible.
### showResult Function
<i>Purpose:</i>

The showResult function is responsible for displaying the results section on the web page, subject to certain conditions.

<i>Steps:</i>
1. Get Result Element:

    Retrieves the reference to the HTML element with the class "result" using a query selector.
2. Check Result and Data Loaded:

    Checks if the result element exists and if data has been loaded (boolean variable dataLoaded).
3. Set Display Style:

    If the conditions are met, sets the CSS display style of the result element to "block" to make it visible.
4. Alert if No Result or Data:

    If the result element does not exist or data is not loaded, displays an alert instructing the user to upload a CSV file.

## Appearance 
The overall appearance of the project is created using React components, which are organized into different folders (you can see them in the components folder). Additionally, clean CSS has been added (which you can also explore in App.css) to craft a user-friendly interface. The background image is sourced from the [internet](https://www.wallpaperflare.com/) and is used solely for educational purposes.

## Credit 
<span style="color: pink">Created by Lora Vasileva Gotseva</span>
