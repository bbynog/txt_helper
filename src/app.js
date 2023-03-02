"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const moment_1 = __importDefault(require("moment"));
const promises_1 = require("node:fs/promises");
const node_process_1 = require("node:process");
const readline = __importStar(require("node:readline/promises"));
const process_1 = require("process");
const config_1 = require("./config/config");
const askForFileName = () => __awaiter(void 0, void 0, void 0, function* () {
    const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
    const fileName = yield rl.question("What will be the txt file name? ");
    return `${fileName}`;
});
const checkForDuplicateName = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const filesOnWriteDir = yield (0, promises_1.readdir)(config_1.WRITE_PATH_DIR);
    let someFileHasTheName = false;
    for (const file of filesOnWriteDir) {
        if (file === `${fileName}.txt`) {
            someFileHasTheName = true;
        }
    }
    return someFileHasTheName;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Welcome to txt_helper! `);
    let setFileName = true;
    let fileName = "";
    while (setFileName) {
        const tempFileName = yield askForFileName();
        const hasDuplicateName = yield checkForDuplicateName(tempFileName);
        if (hasDuplicateName) {
            console.log("This file already exists! Please choose another name...");
        }
        else {
            fileName = tempFileName;
            setFileName = false;
        }
    }
    const FILE_PATH = `${config_1.WRITE_PATH_DIR}/${fileName}.txt`;
    const now = (0, moment_1.default)().format(`DD/MM/YYYY HH:mm:ss`);
    yield (0, promises_1.writeFile)(FILE_PATH, `${now}\n`);
    console.log(`${fileName}.txt created successfully on ${FILE_PATH}! Opening on VSCode...`);
    (0, child_process_1.exec)(`code ${FILE_PATH}`);
    (0, process_1.exit)();
});
main();
