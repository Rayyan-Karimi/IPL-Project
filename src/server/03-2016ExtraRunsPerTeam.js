/**
 * Find a player who has won the highest number of Player of the Match awards for each season
 */
import fs from 'fs';
import path from 'path';

const pathOfDeliveriesJsonFile = path.join(process.cwd(), '/src/data/deliveries.json');
const pathOfMatchesJsonFile = path.join(process.cwd(), '/src/data/matches.json');

// Read both JSONs and call task-function
fs.readFile(pathOfDeliveriesJsonFile, 'utf8', (deliveriesErr, deliveriesData) => {
    if (deliveriesErr) {
        console.error("Deliveries input JSON error", deliveriesErr);
        return;
    } else {
        try {
            const deliveriesJson = JSON.parse(deliveriesData);
            fs.readFile(pathOfMatchesJsonFile, 'utf8', (matchErr, matchData) => {
                if (matchErr) {
                    console.error("Matches input JSON error", matchErr);
                    return;
                } else {
                    try {
                        const matchesJson = JSON.parse(matchData);
                        try {
                            extraRunsByEachTeamIn2016(matchesJson, deliveriesJson);
                        } catch (err) {
                            console.error("Output parsing error", err);
                            return;
                        }
                    } catch (matchParseError) {
                        console.error("Error parsing matches JSON", matchParseError);
                        return;
                    }
                }
            })
        } catch (deliveryParseError) {
            console.error("Error parsing deliveries JSON", deliveryParseError);
            return;
        }
    }
});

// Main task function
const jsonPathOfExtraRunsByEachTeamIn2016 = path.join(process.cwd(), '/public/output/03-2016ExtraRunsPerteam.json')
function extraRunsByEachTeamIn2016(matchesJson, deliveriesJson) {
    const arrayOfMatchIdsOf2016 = [];
    const objectOfExtraRunsByEachTeamIn2016 = {};
    matchesJson.forEach(match => {
        if (match.season === '2016') {
            arrayOfMatchIdsOf2016.push(match.id);
        }
    });
    // console.log(arrayOfMatchIdsOf2016);

    deliveriesJson.forEach(delivery => {
        const deliveryMatchId = delivery.match_id;
        if (arrayOfMatchIdsOf2016.includes(deliveryMatchId)) {
            const team = delivery.bowling_team;
            const extraRuns = delivery.extra_runs;
            // console.log("Typeof Team:", typeof team, "type of extra runs:", typeof extraRuns);
            objectOfExtraRunsByEachTeamIn2016[team] = (Number.parseInt(objectOfExtraRunsByEachTeamIn2016[team]) || 0) + Number.parseInt(extraRuns);
        }
    });
    console.log("The extra runs conceded by each team in 2016 is:", objectOfExtraRunsByEachTeamIn2016);
    fs.writeFileSync(jsonPathOfExtraRunsByEachTeamIn2016, JSON.stringify(objectOfExtraRunsByEachTeamIn2016, null, 2), 'utf-8');
}