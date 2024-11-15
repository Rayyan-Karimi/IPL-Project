import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

const matchesCsvFilePath = path.join(process.cwd(), '/src/data/matches.csv');
const matchesJsonFilePath = path.join(process.cwd(), '/src/data/matches.json');
const deliveriesCsvFilePath = path.join(process.cwd(), '/src/data/deliveries.csv');
const deliveriesJsonFilePath = path.join(process.cwd(), '/src/data/deliveries.json');

const convertCsvToJson = async () => {
    try {
        const jsonArray = await csv().fromFile(matchesCsvFilePath);
        fs.writeFileSync(matchesJsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
        console.log('\nCSV to JSON conversion successful, file path:', matchesJsonFilePath);
    } catch (error) {
        console.error('Error converting CSV to JSON:', error);
    }

    try {
        const jsonArray = await csv().fromFile(deliveriesCsvFilePath);
        fs.writeFileSync(deliveriesJsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error converting CSV to JSON:', error);
    }
};
convertCsvToJson();
