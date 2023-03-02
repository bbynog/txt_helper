import { exec } from "child_process";
import moment from "moment";
import { readdir, writeFile } from "node:fs/promises";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { exit } from "process";
import { WRITE_PATH_DIR } from "./config/config";

const askForFileName = async () => {
  const rl = readline.createInterface({ input, output });
  const fileName = await rl.question("What will be the txt file name? ");
  rl.close();
  return `${fileName}`;
};

const checkForDuplicateName = async (fileName: string) => {
  const filesOnWriteDir = await readdir(WRITE_PATH_DIR);
  let someFileHasTheName = false;

  for (const file of filesOnWriteDir) {
    if (file === `${fileName}.txt`) {
      someFileHasTheName = true;
    }
  }

  return someFileHasTheName;
};

const main = async () => {
  console.log(`Welcome to txt_helper! `);
  let setFileName = true;
  let fileName = "";

  while (setFileName) {
    const tempFileName = await askForFileName();
    const hasDuplicateName = await checkForDuplicateName(tempFileName);
    if (hasDuplicateName) {
      console.log("This file already exists! Please choose another name...");
    } else {
      fileName = tempFileName;
      setFileName = false;
    }
  }

  const FILE_PATH = `${WRITE_PATH_DIR}/${fileName}.txt`;
  const now = moment().format(`DD/MM/YYYY HH:mm:ss`);

  await writeFile(FILE_PATH, `${now}\n`);

  console.log(
    `${fileName}.txt created successfully on ${FILE_PATH}! Opening on VSCode...`
  );

  exec(`code ${FILE_PATH}`);
  exit();
};

main();
