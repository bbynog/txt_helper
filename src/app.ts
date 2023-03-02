import { exec } from 'child_process';
import moment from 'moment';
import { readdir, writeFile } from 'node:fs/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import { exit } from 'process';
import { WRITE_PATH_DIR } from './config/config';

const askForFileName = async () => {
  const rl = readline.createInterface({ input, output });
  const fileName = await rl.question(
    'What will be the txt file name? (default: auto generate name) '
  );
  rl.close();
  return `${fileName}`;
};

const checkForDuplicateName = async (
  filesOnWriteDir: string[],
  fileName: string
) => {
  let someFileHasTheName = false;

  for (const file of filesOnWriteDir) {
    if (file === `${fileName}.txt`) {
      someFileHasTheName = true;
    }
  }

  return someFileHasTheName;
};

const generateFileName = () => {
  const generatedFileName = moment()
    .format('ddd_DD-MM-YY_HH:mm:ss')
    .toLowerCase();

  return generatedFileName;
};

const main = async () => {
  console.log(`Welcome to txt_helper! `);
  let setFileNameProcess = true;
  let fileName = '';
  let isFileNameAutoGenerated = false;

  const filesOnWriteDir = await readdir(WRITE_PATH_DIR);

  while (setFileNameProcess) {
    const tempFileName = await askForFileName();
    if (tempFileName === '') {
      fileName = generateFileName();
      isFileNameAutoGenerated = true;
      setFileNameProcess = false;

      break;
    }

    const hasDuplicateName = await checkForDuplicateName(
      filesOnWriteDir,
      tempFileName
    );
    if (hasDuplicateName) {
      console.log('This file already exists! Please choose another name...');
    } else {
      fileName = tempFileName;
      setFileNameProcess = false;
    }
  }

  const FILE_PATH = `${WRITE_PATH_DIR}/${fileName}.txt`;
  const now = moment().format(`ddd - DD/MM/YYYY - HH:mm`);

  await writeFile(
    FILE_PATH,
    `${isFileNameAutoGenerated ? '' : `${fileName} - `}${now}h\n`
  );

  console.log(
    `${fileName}.txt created successfully on ${FILE_PATH}! Opening it...`
  );

  exec(`open ${FILE_PATH}`);
  exit();
};

main();
