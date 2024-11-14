/**
 * Find the number of times each team won the toss and also won the match
 */
import fs from 'fs';
import path from 'path';

const matchesJsonPath = path.join(process.cwd(), '/src/data/matches.json');
// Read JSON and call task-function
fs.readFile(matchesJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error("Input JSON error", err);
        return;
    } else {
        try {
            const matchesJson = JSON.parse(data);
            eachTeamTossWonMatchesWon(matchesJson);
        } catch (err) {
            console.error("Output parsing error", err);
        }
    }
});

// Main task function
const eachTeamTossWonMatchesWonJsonPath = path.join(process.cwd(), '/public/output/05-EachTeamTossWonMatchesWonCount.json')
function eachTeamTossWonMatchesWon(jsonObject) {
    const resultObject = {};
    jsonObject.forEach(match => {
        if (match.result && match.result === 'normal' && match.winner === match.toss_winner) {
            resultObject[match.winner] = (resultObject[match.winner] || 0) + 1;
        }
    });
    console.log("Each team's toss won + matches won count is:", resultObject);
    fs.writeFileSync(eachTeamTossWonMatchesWonJsonPath, JSON.stringify(resultObject, null, 2), 'utf-8');
}