import { statSync } from 'node:fs';
import { input } from '@inquirer/prompts';

const askForDefaultOutputDir = async () => {
  const defaultOutputDir = await input({
    default: './txt',
    message: 'Where do you want to save the txt file by default?',
    validate: (defaultOutputDirInput) => {
      try {
        if (statSync(defaultOutputDirInput).isDirectory()) {
          return true;
        }
      } catch (error) {
        return 'This is not a valid directory! Please choose a valid one...';
      }
      return 'This is not a valid directory! Please choose a valid one...';
    }
  });

  return `${defaultOutputDir}`;
};

export default askForDefaultOutputDir;
