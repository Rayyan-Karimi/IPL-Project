// const fs = require('fs');
import fs from 'fs';
// const path = require('path');
import path from 'path';
// const csv = require('csvtojson');
import csv from 'csvtojson';

// console.log(process.cwd());
const matchesCsvFilePath = path.join(process.cwd(), '/src/data/matches.csv');
const matchesJsonFilePath = path.join(process.cwd(), '/src/data/matches.json');
const deliveriesCsvFilePath = path.join(process.cwd(), '/src/data/deliveries.csv');
const deliveriesJsonFilePath = path.join(process.cwd(), '/src/data/deliveries.json');

const convertCsvToJson = async () => {
    console.log("\nConverting matches CSV to JSON");
    try {
        const jsonArray = await csv().fromFile(matchesCsvFilePath);
        fs.writeFileSync(matchesJsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
        console.log('\nCSV to JSON conversion successful, file path:', matchesJsonFilePath);
    } catch (error) {
        console.error('Error converting CSV to JSON:', error);
    }

    console.log("Converting deliveries CSV to JSON");
    try {
        const jsonArray = await csv().fromFile(deliveriesCsvFilePath);
        fs.writeFileSync(deliveriesJsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf-8');
        console.log('\nCSV to JSON conversion successful, file path:', deliveriesJsonFilePath);
    } catch (error) {
        console.error('Error converting CSV to JSON:', error);
    }
};
convertCsvToJson();
