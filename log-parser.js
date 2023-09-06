"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var Table = require("cli-table3");
// Inititalizing objects for storing data
var endpointCounts = {};
var minuteCounts = {};
var statusCounts = {};
// Paths of the 3 log files
var logFilePaths = [
    "./dummy-data/api-dev-out.log",
    "./dummy-data/api-prod-out.log",
    "./dummy-data/prod-api-prod-out.log",
];
// Function to process each file and calculate data
function processLogFile(logFilePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var rl, endpointRegex, _d, rl_1, rl_1_1, line, parts, timestamp, endpointMatch, endpoint, minute, statusCodeMatch1, statusCodeMatch2, statusCodeMatch, statusCode, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    rl = readline.createInterface({
                        input: fs.createReadStream(logFilePath),
                        output: process.stdout,
                        terminal: false,
                    });
                    endpointRegex = /(?:GET|POST|PUT|DELETE)\s(\/[^\s]*)/;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _d = true, rl_1 = __asyncValues(rl);
                    _e.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _e.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = rl_1_1.value;
                    _d = false;
                    line = _c;
                    parts = line.split(" ");
                    timestamp = parts[0] + " " + parts[1];
                    endpointMatch = line.match(endpointRegex);
                    if (endpointMatch) {
                        endpoint = endpointMatch[1];
                        // Adding data to the object
                        if (!endpointCounts[endpoint]) {
                            endpointCounts[endpoint] = 1;
                        }
                        else {
                            endpointCounts[endpoint]++;
                        }
                    }
                    minute = timestamp.substr(0, 16);
                    // Adding minute data to the object
                    if (!minuteCounts[minute]) {
                        minuteCounts[minute] = 1;
                    }
                    else {
                        minuteCounts[minute]++;
                    }
                    statusCodeMatch1 = line.match(/"HTTP\/1\.1"\s(\d{3})/);
                    statusCodeMatch2 = line.match(/HTTP\/1\.1"\s(\d{3})/);
                    statusCodeMatch = statusCodeMatch1 || statusCodeMatch2;
                    // Check if status code is present
                    if (statusCodeMatch) {
                        statusCode = statusCodeMatch[1];
                        // Adding data to the object
                        if (!statusCounts[statusCode]) {
                            statusCounts[statusCode] = 1;
                        }
                        else {
                            statusCounts[statusCode]++;
                        }
                    }
                    _e.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
// Function to process all log files
function processAllLogFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, logFilePaths_1, logFilePath, endpointTable, endpoint, minuteTable, minute, statusTable, statusCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Reading data and calculating... Wait for a moment...");
                    _i = 0, logFilePaths_1 = logFilePaths;
                    _a.label = 1;
                case 1:
                    if (!(_i < logFilePaths_1.length)) return [3 /*break*/, 4];
                    logFilePath = logFilePaths_1[_i];
                    return [4 /*yield*/, processLogFile(logFilePath)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    endpointTable = new Table({
                        head: ["Endpoint", "Count"],
                    });
                    for (endpoint in endpointCounts) {
                        endpointTable.push([endpoint, endpointCounts[endpoint]]);
                    }
                    minuteTable = new Table({
                        head: ["Minute", "Count"],
                    });
                    for (minute in minuteCounts) {
                        minuteTable.push([minute, minuteCounts[minute]]);
                    }
                    statusTable = new Table({
                        head: ["Status Code", "Count"],
                    });
                    for (statusCode in statusCounts) {
                        statusTable.push([statusCode, statusCounts[statusCode]]);
                    }
                    // Logging the data into console
                    console.log("Endpoint Counts:");
                    console.log(endpointTable.toString());
                    console.log("\nTotal API Calls per HTTP Status Code:");
                    console.log(statusTable.toString());
                    console.log("\nAPI Calls per Minute:");
                    console.log(minuteTable.toString());
                    return [2 /*return*/];
            }
        });
    });
}
// Executing the main function
processAllLogFiles();
