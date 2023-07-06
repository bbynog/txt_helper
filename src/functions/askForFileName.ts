import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const askForFileName = async () => {
  const rl = readline.createInterface({ input, output });
  const fileName = await rl.question(
    'What will be the txt file name? (<ENTER>: auto generate name) '
  );
  rl.close();

  return `${fileName}`;
};

export default askForFileName;
