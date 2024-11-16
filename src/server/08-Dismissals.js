/**
 * Find the highest number of times one player has been dismissed by another player
 */

import fs from 'fs';
import path from 'path';

export function findHighestDismissalsInIpl(deliveriesJson) {
    const dismissalMap = deliveriesJson
        .filter(delivery => delivery.dismissal_kind !== '' && delivery.dismissal_kind !== 'run out')
        .reduce((dismissalAccumulator, {
            batsman,
            bowler
        }) => {
            dismissalAccumulator[batsman] = dismissalAccumulator[batsman] || {};
            dismissalAccumulator[batsman][bowler] = (dismissalAccumulator[batsman][bowler] || 0) + 1;
            return dismissalAccumulator;
        }, {});
    // creating flat map for each batsman, sort them in descending, take first item of the map
    const highestDismissals = Object.entries(dismissalMap)
        .flatMap(([batsman, bowlers]) => Object.entries(bowlers)
            .map(([bowler, count]) => ({ batsman, bowler, dismissals: count })))
        .sort((sortFunctionFirstObject, sortFunctionSecondObject) =>
            sortFunctionSecondObject.dismissals - sortFunctionFirstObject.dismissals)[0] || null;
        const jsonPathOfHighestDismissals = path.join(process.cwd(), '/public/output/08-HighestDismissals.json')
        fs.writeFileSync(jsonPathOfHighestDismissals, JSON.stringify(highestDismissals, null, 2), 'utf-8');
        console.log("Q8. Json generated.");
}