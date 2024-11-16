import path from 'path';
import fs from 'fs';
import { convertCsvToJson } from './src/server/00-ConvertCsvToJson.js'
import { countMatchesPerYear } from './src/server/01-MatchesPerYear.js'
import { countMatchesWonPerTeamPerYear } from './src/server/02-MatchesWonPerTeamPerYear.js'
import { extraRunsByEachTeamIn2016 } from './src/server/03-2016ExtraRunsPerTeam.js';
import { top10EconomicalBowlersIn2015 } from './src/server/04-Top10EconomicalBowlersIn2015.js';
import { eachTeamTossWonMatchesWon } from './src/server/05-TossWonMatchWon.js'
import { seasonWiseHighestMOM } from './src/server/06-SeasonWiseHighestMOM.js'
import { findStrikeRatesOfEachManForEachSeason } from './src/server/07-StrikeRatesForEachBatsmanForEachSeason.js'
import { findHighestDismissalsInIpl } from './src/server/08-Dismissals.js'
import { findMostEconomicalSuperOverBowler } from './src/server/09-MostEconomicalSuperOverBowler.js'


const pathOfMatchesJsonFile = path.join(process.cwd(), '/src/data/matches.json');
const pathOfDeliveriesJsonFile = path.join(process.cwd(), '/src/data/deliveries.json');
await convertCsvToJson();
fs.readFile(pathOfMatchesJsonFile, 'utf8', (matchesErr, matchesData) => {
    if (matchesErr) {
        console.error("Matches input JSON error", matchesErr);
        return;
    }
    fs.readFile(pathOfDeliveriesJsonFile, 'utf8', (deliveriesErr, deliveriesData) => {
        if (deliveriesErr) {
            console.error("Deliveries input JSON error", deliveriesErr);
            return;
        }
        try {
            const matchesJson = JSON.parse(matchesData);
            const deliveriesJson = JSON.parse(deliveriesData);
            countMatchesPerYear(matchesJson);
            countMatchesWonPerTeamPerYear(matchesJson);
            extraRunsByEachTeamIn2016(matchesJson, deliveriesJson);
            top10EconomicalBowlersIn2015(matchesJson, deliveriesJson);
            eachTeamTossWonMatchesWon(matchesJson);
            seasonWiseHighestMOM(matchesJson);
            findStrikeRatesOfEachManForEachSeason(matchesJson, deliveriesJson);
            findHighestDismissalsInIpl(deliveriesJson);
            findMostEconomicalSuperOverBowler(deliveriesJson);

        } catch (parsingError) {
            console.error("Error during parsing -", parsingError);
        }
    });
});