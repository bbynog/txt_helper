import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import DEFAULT_OUTPUT_PATH_DIR from '../constants/DEFAULT_OUTPUT_PATH_DIR';

const askForOutputDir = async () => {
  const rl = readline.createInterface({ input, output });
  const dirToWrite = await rl.question(
    `What will be the directory to write? (<ENTER>: will write file on default dir: ${DEFAULT_OUTPUT_PATH_DIR}) `
  );
  rl.close();

  return `${dirToWrite}`;
};

export default askForOutputDir;
