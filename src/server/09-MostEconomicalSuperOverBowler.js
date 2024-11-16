/**
 * Find the highest number of times one player has been dismissed by another player
 */
import fs from 'fs';
import path from 'path';

export function findMostEconomicalSuperOverBowler(deliveriesJson) {
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
    const jsonPathOfMostEconomicalSuperOverBowler = path.join(process.cwd(), '/public/output/09-MostEconomicalSuperOverBowler.json')
    fs.writeFileSync(jsonPathOfMostEconomicalSuperOverBowler, JSON.stringify(mostEconomicalSuperOverBowler, null, 2), 'utf-8');
    console.log("Q9. Json generated.");
}