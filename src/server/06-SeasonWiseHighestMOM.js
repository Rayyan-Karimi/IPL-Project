/**
 * Find a player who has won the highest number of Player of the Match awards for each season
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
            seasonWiseHighestMOM(matchesJson);
        } catch (err) {
            console.error("Output parsing error", err);
        }
    }
});

// Main task function
const seasonWiseHighestMOMJsonPath = path.join(process.cwd(), '/public/output/06-SeasonWiseHighestMOM.json')
function seasonWiseHighestMOM(jsonObject) {
    const seasonWiseMOMCount = {};
    jsonObject.forEach(match => {
        if (match.result && match.result === 'normal' && match.season && match.player_of_match) {
            const season = match.season;
            const manOfMatch = match.player_of_match;
            if (!seasonWiseMOMCount[season]) {
                seasonWiseMOMCount[season] = {};
            }
            seasonWiseMOMCount[season][manOfMatch] = (seasonWiseMOMCount[season][manOfMatch] || 0) + 1;
        }
    });

    const resultObject = {};
    for (const season in seasonWiseMOMCount) {
        let highestMOMPlayer = null;
        let highestMOMCount = 0;
        for (const player in seasonWiseMOMCount[season]) {
            const count = seasonWiseMOMCount[season][player] // player = manOfMatch
            if (count > highestMOMCount) {
                highestMOMCount = count;
                highestMOMPlayer = player;
            }
        }
        resultObject[season] = {
            player: highestMOMPlayer,
            awards: highestMOMCount
        }
    }
    console.log("Each team's toss won + matches won count is:", resultObject);
    fs.writeFileSync(seasonWiseHighestMOMJsonPath, JSON.stringify(resultObject, null, 2), 'utf-8');
}