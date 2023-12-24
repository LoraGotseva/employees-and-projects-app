// Function to split a string into an array of lines, handling different line break characters
function strSplit(str) {
    return str.split(/(\r\n|\n|\r)/g);
}

// Function to convert an array of string rows into a 2D array (matrix), filtering out empty rows and trimming cell values
function convertArrToMatrix(arr) {
    return arr
        // Filter out rows with only whitespace or no content
        .filter((row) => row.trim().length !== 0)
        // Map each row by splitting it into an array of cells and trimming each cell value
        .map((row) => row.split(",").map((cell) => cell.trim()));
}

// Export the functions to make them available for use in other modules
export {
    strSplit,
    convertArrToMatrix,
}
