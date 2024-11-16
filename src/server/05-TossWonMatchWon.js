import fs from 'fs';
import path from 'path';

export function eachTeamTossWonMatchesWon(jsonObject) {
    const resultObject = {};
    jsonObject.forEach(match => {
        if (match.result && match.result === 'normal' && match.winner === match.toss_winner) {
            resultObject[match.winner] = (resultObject[match.winner] || 0) + 1;
        }
    });
    const eachTeamTossWonMatchesWonJsonPath = path.join(process.cwd(), '/public/output/05-EachTeamTossWonMatchesWonCount.json')
    fs.writeFileSync(eachTeamTossWonMatchesWonJsonPath, JSON.stringify(resultObject, null, 2), 'utf-8');
    console.log("Q5. Json generated.");
}