import fs from 'fs';
import path from 'path';

export const countMatchesPerYear = async (jsonObject) => {
    const result = {};
    jsonObject.forEach((match) => {
        if (match.season) {
            result[match.season] = (result[match.season] || 0) + 1;
        }
    });
    console.log("Q1. Json generated.");
    const matchesPerYearJsonPath = path.join(process.cwd(), '/public/output/01-MatchesPerYear.json')
    fs.writeFileSync(matchesPerYearJsonPath, JSON.stringify(result, null, 2), 'utf-8');
}

