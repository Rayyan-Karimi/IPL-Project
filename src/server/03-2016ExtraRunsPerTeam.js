/**
 * Find a player who has won the highest number of Player of the Match awards for each season
 */
import fs from 'fs';
import path from 'path';

const deliveriesJsonPath = path.join(process.cwd(), '/src/data/deliveries.json');
// Read JSON and call task-function
fs.readFile(deliveriesJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error("Input JSON error", err);
        return;
    } else {
        try {
            const deliveriesJson = JSON.parse(data);
            extraRunsByEachTeamIn2016(deliveriesJson);
        } catch (err) {
            console.error("Output parsing error", err);
        }
    }
});

// Main task function
const extraRunsByEachTeamIn2016JsonPath = path.join(process.cwd(), '/public/output/03-2016ExtraRunsPerteam.json')
function extraRunsByEachTeamIn2016(jsonObject) {
    /* @TODO: add matches and deliveries. map by match ID from matches, if match.season == 2016 then 
     * use the ID to find extra runs and team name, and map them.
     */
    const result = {};
    jsonObject.forEach(delivery => {
        if (delivery.bowling_team && delivery.extra_runs) {
            const season = delivery.season;
            const manOfMatch = delivery.player_of_match;
            if (!result[season]) {
                result[season] = {};
            }
            result[season][manOfMatch] = (result[season][manOfMatch] || 0) + 1;
        }
    });

    console.log("The extra runs conceded by each team in 2016 is:", result);
    fs.writeFileSync(extraRunsByEachTeamIn2016JsonPath, JSON.stringify(result, null, 2), 'utf-8');
}