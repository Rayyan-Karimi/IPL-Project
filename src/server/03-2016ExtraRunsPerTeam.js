import fs from 'fs';
import path from 'path';

export function extraRunsByEachTeamIn2016(matchesJson, deliveriesJson) {
    const arrayOfMatchIdsOf2016 = [];
    matchesJson.forEach(match => {
        if (match.season === '2016') {
            arrayOfMatchIdsOf2016.push(match.id);
        }
    });
    const objectOfExtraRunsByEachTeamIn2016 = {};
    deliveriesJson.forEach(({ match_id, bowling_team, extra_runs }) => {
        if (arrayOfMatchIdsOf2016.includes(match_id)) {
            objectOfExtraRunsByEachTeamIn2016[bowling_team] = (Number.parseInt(objectOfExtraRunsByEachTeamIn2016[bowling_team]) || 0) + Number.parseInt(extra_runs);
        }
    });
    console.log("Q3. Json generated.");
    const jsonPathOfExtraRunsByEachTeamIn2016 = path.join(process.cwd(), '/public/output/03-2016ExtraRunsPerteam.json')
    fs.writeFileSync(jsonPathOfExtraRunsByEachTeamIn2016, JSON.stringify(objectOfExtraRunsByEachTeamIn2016, null, 2), 'utf-8');
}