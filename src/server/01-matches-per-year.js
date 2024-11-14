import Papa from 'papaparse';
import fs from 'fs';

const matchesCsv = "../data/matches.csv";

function countMatchesPerYear(csvFile) {
    const csvFileContents = fs.readFileSync(csvFile, 'utf8');
    Papa.parse(csvFileContents, {
        header: true,
        complete: function (results) {
            const matches = results.data;
            const matchCountByYear = {};
            matches.forEach(match => {
                const season = match.season;
                if (season) {
                    matchCountByYear[season] = (matchCountByYear[season] || 0) + 1;
                }
            });
            console.log(matchCountByYear);
        },
        error: function (err) {
            console.error("Error parsing csv:", error);
        }
    });
}
countMatchesPerYear(matchesCsv);