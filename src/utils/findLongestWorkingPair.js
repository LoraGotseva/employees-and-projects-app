// Importing the calculateOverlappingDays function from a separate module
import { calculateOverlappingDays } from "./calculateOverlappingDays";

// Function to find the longest working pair based on overlapping project days
function findLongestWorkingPair(dataMatrix, setResults) {
  
  const projectPairs = {}; // Object to store project pairs and their overlapping days
  
  // Variables to track the maximum working together days, sum of days, 
  // the pair with the longest working duration, and the new results array
  let maxWorkingTogetherDays = 0;
  let sumOfDays = 0;
  let longestWorkingPair = [];
  let newResults = [];

  // Iterate through each pair of employees in the dataMatrix
  for (let i = 0; i < dataMatrix.length; i++) {
    for (let j = i + 1; j < dataMatrix.length; j++) {

      // Check if the pairs are working on the same project
      if (dataMatrix[i][1] === dataMatrix[j][1]) {
        
        // Calculate overlapping days using the calculateOverlappingDays function
        const overlappingDays = calculateOverlappingDays(
          dataMatrix[i][2],
          dataMatrix[i][3],
          dataMatrix[j][2],
          dataMatrix[j][3]
        );

        // If there are overlapping days, process the pair
        if (overlappingDays > 0) {
          const projectID = dataMatrix[i][1];

          // Initialize an array for each project ID if not already present
          if (!projectPairs[projectID]) {
            projectPairs[projectID] = [];
          }

          // Create a pair and duration entry for the project
          const pair = [dataMatrix[i][0], dataMatrix[j][0]];
          const duration = overlappingDays;

          projectPairs[projectID].push({ pair, duration });
        }
      }
    }
  }

  // Iterate through projectPairs to find the longest working pair for each project
  for (const projectID in projectPairs) {
    if (maxWorkingTogetherDays <= projectPairs[projectID][0].duration) {
      maxWorkingTogetherDays = projectPairs[projectID][0].duration;
      longestWorkingPair = projectPairs[projectID][0].pair;
    }

    // Check if the current pair includes the longestWorkingPair
    if (
      projectPairs[projectID][0].pair.every((values) =>
        longestWorkingPair.includes(values)
      )
    ) {
      
      // Update the sumOfDays and push results to the newResults array
      sumOfDays += projectPairs[projectID][0].duration;
      Math.ceil(sumOfDays);

      newResults.push({
        ProjectID: projectID,
        Pair: longestWorkingPair,
        Days: Math.ceil(projectPairs[projectID][0].duration),
      });
    }
  }

  // Update the results state with the newResults array
  setResults(newResults);
}

// Export the findLongestWorkingPair function for external usage
export { findLongestWorkingPair };
