// Function to parse a date string in the ISO format (YYYY-MM-DD)
function parseISODate(dateString) {
  // Using a regular expression to match the ISO date format
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  // If a match is found
  if (match) {
      // Destructuring the matched values into year, month, and day
      const [, year, month, day] = match;
      
      // Creating a new Date object (month is 0-based, so subtracting 1)
      return new Date(year, month - 1, day);
  }

  // If no match is found, return null
  return null;
}

// Function to parse a date string in the short format (MM/DD/YYYY)
function parseShortDate(dateString) {
  // Using a regular expression to match the short date format
  const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  // If a match is found
  if (match) {
      // Destructuring the matched values into month, day, and year
      const [, month, day, year] = match;

      // Creating a new Date object (month is 0-based, so subtracting 1)
      return new Date(year, month - 1, day);
  }

  // If no match is found, return null
  return null;
}

// Function to parse a date string in the long format (Month DD, YYYY or DD Month YYYY)
function parseLongDate(dateString) {
  // Using a regular expression to match the long date formats
  const match = dateString.match(
      /^(?:([a-zA-Z]+) (\d{2}) (\d{4})|(\d{2}) ([a-zA-Z]+) (\d{4}))$/
  );

  // If a match is found
  if (match) {
      // Destructuring the matched values into month1, day, year1, day2, month2, year2
      const [, month1, day, year1, day2, month2, year2] = match;

      // Choosing the month and year based on the matched values
      const month = month1 || month2;
      const year = year1 || year2;

      // Creating a new Date object using the chosen month, day, and year
      return new Date(`${month} ${day} ${year}`);
  }

  // If no match is found, return null
  return null;
}

// Function to parse a date string using different formats
function parseDate(dateString) {
  // Attempting to parse the date using different parsing functions
  return (
      parseISODate(dateString) ||
      parseShortDate(dateString) ||
      parseLongDate(dateString) ||
      null
  );
}

// Exporting the parsing functions to make them available for use in other modules
export { parseISODate, parseLongDate, parseShortDate, parseDate };
