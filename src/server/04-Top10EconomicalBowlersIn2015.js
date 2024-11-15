/**
 * Top 10 economical bowlers in the year 2015
 */
import fs from 'fs';
import path from 'path';

const pathOfDeliveriesJsonFile = path.join(process.cwd(), '/src/data/deliveries.json');
const pathOfMatchesJsonFile = path.join(process.cwd(), '/src/data/matches.json');
// Read both JSONs and call task-function
fs.readFile(pathOfDeliveriesJsonFile, 'utf8', (deliveriesErr, deliveriesData) => {
    if (deliveriesErr) return console.error("Deliveries input JSON error", deliveriesErr);
    const deliveriesJson = JSON.parse(deliveriesData);
    fs.readFile(pathOfMatchesJsonFile, 'utf8', (matchesErr, matchesData) => {
        if (matchesErr) return console.error("Matches input JSON error", matchesErr);
        const matchesJson = JSON.parse(matchesData);
        top10EconomicalBowlersIn2015(matchesJson, deliveriesJson);
    });
});

// Main task function
const jsonPathOfExtraRunsByEachTeamIn2016 = path.join(process.cwd(), '/public/output/04-Top10EconomicalBowlersIn2015.json')
function top10EconomicalBowlersIn2015(matchesJson, deliveriesJson) {
    const matchIdsOf2015 = matchesJson.filter(match => match.season === '2015').map(match => match.id);

    const bowlerStats = deliveriesJson.reduce((bowlerStatsAccumulator, delivery) => {
        if (matchIdsOf2015.includes(delivery.match_id)) {
            const bowler = delivery.bowler;
            const runs = Number.parseInt(delivery.total_runs);
            bowlerStatsAccumulator[bowler] = bowlerStatsAccumulator[bowler] || { runsGiven: 0, ballsBowled: 0 };
            bowlerStatsAccumulator[bowler].runsGiven += runs;
            bowlerStatsAccumulator[bowler].ballsBowled += 1;
        }
        return bowlerStatsAccumulator;
    }, {});

    const top10EconomicalBowlersIn2015 = Object.entries(bowlerStats)
        .map(([name, stats]) => ({
            Bowler: name,
            EconomyRate: ((stats.runsGiven / stats.ballsBowled) * 6).toFixed(2)
        }))
        .sort((a, b) => a.EconomyRate - b.EconomyRate)
        .slice(0, 10);

    fs.writeFileSync(jsonPathOfExtraRunsByEachTeamIn2016, JSON.stringify(top10EconomicalBowlersIn2015, null, 2), 'utf-8');
}