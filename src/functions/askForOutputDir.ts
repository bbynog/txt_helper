import { statSync } from 'node:fs';
import DEFAULT_OUTPUT_PATH_DIR from '../constants/DEFAULT_OUTPUT_DIR_PATH';
import { input } from '@inquirer/prompts';

const askForOutputDir = async () => {
  const outputDir = await input({
    default: DEFAULT_OUTPUT_PATH_DIR,
    message: 'Where do you want to save the txt file?',
    validate: (outputDirInput) => {
      try {
        if (statSync(outputDirInput).isDirectory()) {
          return true;
        }
      } catch (error) {
        return 'This is not a valid directory! Please choose a valid one...';
      }
      return 'This is not a valid directory! Please choose a valid one...';
    }
  });

  return `${outputDir}`;
};

export default askForOutputDir;
