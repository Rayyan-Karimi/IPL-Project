/**
 * Find the strike rate of a batsman for each season
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
        findStrikeRatesOfEachManForEachSeason(matchesJson, deliveriesJson);
    });
});

// Main task function
const jsonPathOfStrikeRatesPerSeasonOfEachBatsman = path.join(process.cwd(), '/public/output/07-StrikeRatesOfEachManForEachSeason.json')
function findStrikeRatesOfEachManForEachSeason(matchesJson, deliveriesJson) {

    const batsmanStats = deliveriesJson.reduce((batsmanStatsAccumulator, delivery) => {
        const batsman = delivery.batsman;
        const season = matchesJson.filter(match => match.id === delivery.match_id)[0].season;
        const batsmanRuns = delivery.batsman_runs;
        batsmanStatsAccumulator[batsman] = batsmanStatsAccumulator[batsman] || {};
        batsmanStatsAccumulator[batsman][season] = batsmanStatsAccumulator[batsman][season] || { runs: 0, ballsPlayed: 0 };
        batsmanStatsAccumulator[batsman][season].runs += Number.parseInt(batsmanRuns);
        batsmanStatsAccumulator[batsman][season].ballsPlayed += 1;
        return batsmanStatsAccumulator;
    }, {});
    // console.log(batsmanStats);

    const batsmanStrikeRatesPerSeason = {};
    for (const batsman in batsmanStats) {
        batsmanStrikeRatesPerSeason[batsman] = {};
        for (const season in batsmanStats[batsman]) {
            const { runs, ballsPlayed } = batsmanStats[batsman][season];
            const strikeRate = (runs / ballsPlayed) * 100;
            batsmanStrikeRatesPerSeason[batsman] = { 'Season': season, StrikeRate: strikeRate.toFixed(2) };
        }
    }
    // console.log(batsmanStrikeRatesPerSeason);
    fs.writeFileSync(jsonPathOfStrikeRatesPerSeasonOfEachBatsman, JSON.stringify(batsmanStrikeRatesPerSeason, null, 2), 'utf-8');
}