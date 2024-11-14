import fs from 'fs';
import path from 'path';

// Main
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


// Function use
const matchesPerYearJsonPath = path.join(process.cwd(), '/public/output/02-MatchesPerTeamPerYear.json')
function countMatchesPerYear(jsonObject) {
    const result = {};
    if (typeof jsonObject !== 'object') {
        console.error("Error - not an object");
        return;
    }
    jsonObject.forEach((match) => {
        if (match.result && match.result === 'normal' && match.winner && match.season) {
            const winner = match.winner;
            const season = match.season;
            if (!result[season]) {
                result[season] = {};
            }
            result[season][winner] = (result[season][winner] || 0) + 1;
        }
    });
    // Log result
    console.log("Matches per team per year:", result);
    fs.writeFileSync(matchesPerYearJsonPath, JSON.stringify(result, null, 2), 'utf-8');
}