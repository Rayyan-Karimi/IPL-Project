/**
 * Find the highest number of times one player has been dismissed by another player
 */

import fs from 'fs';
import path from 'path';

const pathOfDeliveriesJsonFile = path.join(process.cwd(), '/src/data/deliveries.json');

fs.readFile(pathOfDeliveriesJsonFile, 'utf8', (deliveriesErr, deliveriesData) => {
    if (deliveriesErr) return console.error("Deliveries input JSON error", deliveriesErr);
    const deliveriesJson = JSON.parse(deliveriesData);
    findHighestDismissalsInIpl(deliveriesJson);
});

const jsonPathOfHighestDismissals = path.join(process.cwd(), '/public/output/08-HighestDismissals.json')

function findHighestDismissalsInIpl(deliveriesJson) {
    const dismissalMap = deliveriesJson
        .filter(delivery => delivery.dismissal_kind !== '' && delivery.dismissal_kind !== 'run out')
        .reduce((dismissalAccumulator, {
            batsman,
            bowler
        }) => {
            // Initialise batsman data
            dismissalAccumulator[batsman] = dismissalAccumulator[batsman] || {};
            // Update/initialise batsman vs bowler
            dismissalAccumulator[batsman][bowler] = (dismissalAccumulator[batsman][bowler] || 0) + 1;
            // Return
            return dismissalAccumulator;
        }, {});
    // creating flat map for each batsman, sort them in descending, take first item of the map
    const highestDismissals = Object.entries(dismissalMap)
        .flatMap(([batsman, bowlers]) => Object.entries(bowlers)
            .map(([bowler, count]) => ({ batsman, bowler, dismissals: count })))
        .sort((sortFunctionFirstObject, sortFunctionSecondObject) =>
            sortFunctionSecondObject.dismissals - sortFunctionFirstObject.dismissals)[0] || null;
    console.log("Highest Dismissals:", highestDismissals);
    fs.writeFileSync(jsonPathOfHighestDismissals, JSON.stringify(highestDismissals, null, 2), 'utf-8');
}