import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define the base input folder path
const inputFolderPath = join(__dirname, '../input');

/**
 * Loads and parses a JSON file from the input folder.
 * @param {string} relativeFilePath - The file path relative to the input folder.
 * @returns {Promise<Object>} - The parsed JSON data.
 */
export async function loadAndParseInputJson(relativeFilePath) {
    try {
        // Construct the full path to the JSON file
        const filePath = join(inputFolderPath, relativeFilePath);

        // Read and parse the JSON file
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading or parsing JSON file (${relativeFilePath}):`, error);
        throw error; // Re-throw the error for the caller to handle
    }
}