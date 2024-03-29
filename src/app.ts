#! /usr/bin/env node

import { writeFile } from 'node:fs/promises';
import { exit } from 'process';
import askForFileName from './functions/askForFileName';
import autoGenerateFileName from './functions/autoGenerateFileName';
import generateTxtData from './functions/generateTxtData';
import askForOutputDir from './functions/askForOutputDir';
import getTxtFilesFromDir from './functions/getTxtFilesFromDir';
import openFile from './functions/openFile';
import DEFAULT_OUTPUT_DIR_PATH from './constants/DEFAULT_OUTPUT_DIR_PATH';
import askForDefaultOutputDir from './functions/askForDefaultOutpurDir';
import setDefaultOutputDir from './functions/setDefaultOutputDir';

(async () => {
  let isFileNameAutoGenerated = false;
  let outputDir = '';

  if (!DEFAULT_OUTPUT_DIR_PATH) {
    const defaultOutputDir = await askForDefaultOutputDir();
    await setDefaultOutputDir(defaultOutputDir);
    outputDir = defaultOutputDir;
  } else {
    outputDir = await askForOutputDir();
  }

  const txtFilesFromOutputDir = getTxtFilesFromDir(outputDir);

  const defaultFileName = autoGenerateFileName();
  const usersFileNameInput = await askForFileName(
    defaultFileName,
    txtFilesFromOutputDir
  );

  if (usersFileNameInput === defaultFileName) {
    isFileNameAutoGenerated = true;
  }

  const filePath = `${outputDir}/${usersFileNameInput}.txt`;

  const txtData = generateTxtData(isFileNameAutoGenerated, usersFileNameInput);

  await writeFile(filePath, txtData);

  openFile(filePath);

  console.log(
    `${usersFileNameInput}.txt created successfully on ${filePath}! Opening it...`
  );

  exit(0);
})();
