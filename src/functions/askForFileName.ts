// import { stdin as input, stdout as output } from 'node:process';
import { input } from '@inquirer/prompts';
import checkForDuplicateName from './checkForDuplicateName';

const askForFileName = async (
  defaultFileName: string,
  txtFilesFromDir: string[]
) => {
  const fileName = await input({
    default: defaultFileName,
    message: 'What will be the txt file name?',
    validate: (fileNameInput: string) => {
      if (checkForDuplicateName(fileNameInput, txtFilesFromDir)) {
        return 'This file already exists! Please choose another name...';
      }
      return true;
    }
  });

  return `${fileName}`;
};

export default askForFileName;
