/**
 * Find the highest number of times one player has been dismissed by another player
 */
// is_super_over
import fs from 'fs';
import path from 'path';

const pathOfDeliveriesJsonFile = path.join(process.cwd(), '/src/data/deliveries.json');
const jsonPathOfMostEconomicalSuperOverBowler = path.join(process.cwd(), '/public/output/09-MostEconomicalSuperOverBowler.json')

fs.readFile(pathOfDeliveriesJsonFile, 'utf8', (deliveriesErr, deliveriesData) => {
    if (deliveriesErr) return console.error("Deliveries input JSON error", deliveriesErr);
    const deliveriesJson = JSON.parse(deliveriesData);
    findMostEconomicalSuperOverBowler(deliveriesJson);
});

// Main task function
function findMostEconomicalSuperOverBowler(deliveriesJson) {
    const bowlerStats = deliveriesJson.reduce((bowlerStatsAccumulator, { bowler, total_runs, is_super_over }) => {
        if (is_super_over === '1') {
            bowlerStatsAccumulator[bowler] = bowlerStatsAccumulator[bowler] || { runsGiven: 0, ballsBowled: 0 };
            bowlerStatsAccumulator[bowler].runsGiven += Number.parseInt(total_runs);
            bowlerStatsAccumulator[bowler].ballsBowled += 1;
        }
        return bowlerStatsAccumulator;
    }, {});

    const mostEconomicalSuperOverBowler = Object.entries(bowlerStats)
        .map(([name, { runsGiven, ballsBowled }]) => ({
            Bowler: name,
            EconomyRate: ((runsGiven / ballsBowled) * 6).toFixed(2)
        }))
        .sort((firstItem, secondItem) => firstItem.EconomyRate - secondItem.EconomyRate)
        .slice(0, 1);

    console.log(mostEconomicalSuperOverBowler);
    fs.writeFileSync(jsonPathOfMostEconomicalSuperOverBowler, JSON.stringify(mostEconomicalSuperOverBowler, null, 2), 'utf-8');

}