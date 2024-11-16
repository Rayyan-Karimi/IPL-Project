import fs from 'fs';
import path from 'path';

export const countMatchesWonPerTeamPerYear = async (jsonObject) => {
    const matchesWonPerTeamPerYear = {};
    jsonObject.forEach(({ result, season, winner }) => {
        if (result && result === 'normal' && winner && season) {
            matchesWonPerTeamPerYear[season] = matchesWonPerTeamPerYear[season] || {};
            matchesWonPerTeamPerYear[season][winner] = (matchesWonPerTeamPerYear[season][winner] || 0) + 1;
        }
    });
    console.log("Q2. Json generated.");
    const matchesPerYearJsonPath = path.join(process.cwd(), '/public/output/02-MatchesPerTeamPerYear.json')
    fs.writeFileSync(matchesPerYearJsonPath, JSON.stringify(matchesWonPerTeamPerYear, null, 2), 'utf-8');
}