import fs from 'fs';
import path from 'path';

export function top10EconomicalBowlersIn2015(matchesJson, deliveriesJson) {
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

    const jsonPathOfExtraRunsByEachTeamIn2016 = path.join(process.cwd(), '/public/output/04-Top10EconomicalBowlersIn2015.json')
    fs.writeFileSync(jsonPathOfExtraRunsByEachTeamIn2016, JSON.stringify(top10EconomicalBowlersIn2015, null, 2), 'utf-8');
    console.log("Q4. Json generated.");

}