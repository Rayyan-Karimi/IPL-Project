import fs from 'fs';
import path from 'path';

// Send output path
const matchesPerYearJsonPath = path.join(process.cwd(), '/public/output/01-matches-per-year.json')
// Define output making function using "input JSON"
function countMatchesPerYear(jsonObject) {
    const result = {};
    // Valid check
    if (typeof jsonObject !== 'object') {
        console.error("Error - not an object");
        return;
    }
    // Find result
    jsonObject.forEach((match) => {
        if (match.season) {
            result[match.season] = (result[match.season] || 0) + 1;
        }
    });
    // Log result
    console.log("Matches per year:", result);
    fs.writeFileSync(matchesPerYearJsonPath, JSON.stringify(result, null, 2), 'utf-8');
}



// Main program using "input json"
const matchesJsonPath = path.join(process.cwd(), '/src/data/matches.json');
fs.readFile(matchesJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        const matchesJson = JSON.parse(data);
        countMatchesPerYear(matchesJson);
    } catch (parsingError) {
        console.error("Error during parsing -", parsingError);
    }
});
