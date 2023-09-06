import * as fs from "fs";
import * as readline from "readline";
import * as Table from "cli-table3";

// Inititalizing objects for storing data
const endpointCounts: { [key: string]: number } = {};
const minuteCounts: { [key: string]: number } = {};
const statusCounts: { [key: string]: number } = {};

// Paths of the 3 log files
const logFilePaths = [
    "./dummy-data/api-dev-out.log",
    "./dummy-data/api-prod-out.log",
    "./dummy-data/prod-api-prod-out.log",
];

// Function to process each file and calculate data
async function processLogFile(logFilePath: string) {
    // Creating interface using readline
    const rl = readline.createInterface({
        input: fs.createReadStream(logFilePath),
        output: process.stdout,
        terminal: false,
    });

    // Regex to check if endpoint is present in a log
    const endpointRegex = /(?:GET|POST|PUT|DELETE)\s(\/[^\s]*)/;

    // Iterating through all the logs
    for await (const line of rl) {
        // Getting required strings
        const parts: string[] = line.split(" ");
        const timestamp: string = parts[0] + " " + parts[1];

        // Checking if endpoint is found in a log
        const endpointMatch = line.match(endpointRegex);
        if (endpointMatch) {
            const endpoint: string = endpointMatch[1];

            // Adding data to the object
            if (!endpointCounts[endpoint]) {
                endpointCounts[endpoint] = 1;
            } else {
                endpointCounts[endpoint]++;
            }
        }

        // Getting the minute string from a log
        const minute: string = timestamp.substr(0, 16);
        // Adding minute data to the object
        if (!minuteCounts[minute]) {
            minuteCounts[minute] = 1;
        } else {
            minuteCounts[minute]++;
        }

        // Regex to find the status code
        const statusCodeMatch1: RegExpMatchArray | null = line.match(
            /"HTTP\/1\.1"\s(\d{3})/
        );
        const statusCodeMatch2: RegExpMatchArray | null =
            line.match(/HTTP\/1\.1"\s(\d{3})/);

        // Check both patterns for the status code
        const statusCodeMatch = statusCodeMatch1 || statusCodeMatch2;

        // Check if status code is present
        if (statusCodeMatch) {
            const statusCode: string = statusCodeMatch[1];
            // Adding data to the object
            if (!statusCounts[statusCode]) {
                statusCounts[statusCode] = 1;
            } else {
                statusCounts[statusCode]++;
            }
        }
    }
}

// Function to process all log files
async function processAllLogFiles() {
    console.log("Reading data and calculating... Wait for a moment...");

    // Calling processLogFile for each path
    for (const logFilePath of logFilePaths) {
        await processLogFile(logFilePath);
    }

    // Creating a table for organizing data
    const endpointTable = new Table({
        head: ["Endpoint", "Count"],
    });

    for (const endpoint in endpointCounts) {
        endpointTable.push([endpoint, endpointCounts[endpoint]]);
    }

    const minuteTable = new Table({
        head: ["Minute", "Count"],
    });

    for (const minute in minuteCounts) {
        minuteTable.push([minute, minuteCounts[minute]]);
    }

    const statusTable = new Table({
        head: ["Status Code", "Count"],
    });

    for (const statusCode in statusCounts) {
        statusTable.push([statusCode, statusCounts[statusCode]]);
    }

    // Logging the data into console
    console.log("Endpoint Counts:");
    console.log(endpointTable.toString());

    console.log("\nTotal API Calls per HTTP Status Code:");
    console.log(statusTable.toString());

    console.log("\nAPI Calls per Minute:");
    console.log(minuteTable.toString());
}

// Executing the main function
processAllLogFiles();
