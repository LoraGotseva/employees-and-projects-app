
export function calculateResult(results, setResults, setResultText) {
   // Convert results to an array if it's an object
   const resultsArray = Array.isArray(results) ? results : Object.values(results);

   // Create a mapping to store unique pairs and their corresponding project IDs and days
   const pairMap = {};
 
   // Iterate through results to populate the pairMap
   resultsArray.forEach((result) => {
     const pairKey = result.Pair.join(",");
 
     if (!pairMap[pairKey]) {
       pairMap[pairKey] = {
         Pairs: result.Pair,
         Projects: [],
         TotalDays: 0, // Initialize total days
       };
     }
 
     const projectInfo = {
       ProjectID: result.ProjectID,
       Days: result.Days,
     };
 
     pairMap[pairKey].Projects.push(projectInfo);
     pairMap[pairKey].TotalDays += result.Days; // Update total days
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
 
   // Instead of calling setResults here, update the state based on user interaction
   setResults(pairMap); 
 
   // Update the result text based on user interaction
   setResultText(newResultText);
  }
  