// Importing date parsing functions from the specified module
import { parseISODate, parseLongDate, parseShortDate, parseDate } from "./dateParsers";

// Function to calculate the number of overlapping days between two date ranges
function calculateOverlappingDays(dateFrom1, dateTo1, dateFrom2, dateTo2) {
    // Parsing the start and end dates of the first date range
    const startDate1 = parseDate(dateFrom1);
    const endDate1 = dateTo1 === "NULL" ? new Date() : parseDate(dateTo1);

    // Parsing the start and end dates of the second date range
    const startDate2 = parseDate(dateFrom2);
    const endDate2 = dateTo2 === "NULL" ? new Date() : parseDate(dateTo2);

    // Finding the maximum of the start dates and minimum of the end dates
    const startMax = Math.max(startDate1, startDate2);
    const endMin = Math.min(endDate1, endDate2);

    // Checking if there is an actual overlap between the two date ranges
    if (startMax <= endMin) {
        // Calculating the overlap duration in days
        const overlapDuration = Math.abs(
            (endMin - startMax) / (1000 * 60 * 60 * 24)
        );
        return overlapDuration;
    }

    // If there is no overlapping period, return 0
    return 0;
}

// Exporting the calculateOverlappingDays function to make it available for use in other modules
export { calculateOverlappingDays };
