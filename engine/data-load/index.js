import neatCsv from "neat-csv";
import fs from "fs/promises";
import { pipeline } from "./pipeline.js";
import { indexData } from "./indexData.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { waitForMeilisearch } from "./waitForMeilisearch.js";

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

const industries = ["workplace", "healthcare", "education"];
let allRows = [];

for(let industry of industries) {
    // Read CSV file
    const csvString = await fs.readFile(join(__dirname, `./input/${industry}.csv`), "utf-8");
    console.log(`Processing ${industry}.csv`);

    // Convert CSV to JSON Object
    const rows = await neatCsv(csvString);

    for(let row of rows) {
        row.industry = industry;
        allRows.push(row);
    }
}

let typicals = [];
for(let typical of allRows) {
    typicals.push(await pipeline(typical));
}

let processed = {
    typicals
};

// Write JSON Object to file
await fs.writeFile(join(__dirname, "./processed/typicals.json"), JSON.stringify(processed, null, 2));

//await waitForMeilisearch();

await indexData(typicals);

//await takeDump();

console.log("My job here is done. I now return to the void from whence I came.");