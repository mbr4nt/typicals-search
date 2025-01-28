import neatCsv from "neat-csv";
import fs from "fs/promises";
import { pipeline } from "./pipeline.js";
import { indexData } from "./indexData.js";

// Read CSV file
const csvString = await fs.readFile("input/models.csv", "utf-8");

// Convert CSV to JSON Object
const jsonObject = await neatCsv(csvString);

let models = [];
for(let model of jsonObject) {
    models.push(await pipeline(model));
}

let processed = {
    models
};

// Write JSON Object to file
await fs.writeFile("processed/models.json", JSON.stringify(processed, null, 2));

await indexData(models);

console.log("My job here is done. I now return to the void from whence I came.");