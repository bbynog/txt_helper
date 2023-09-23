import { writeFile } from 'node:fs/promises';

const setDefaultOutputDir = async (defaultOutputDir: string) => {
  await writeFile(
    './src/constants/DEFAULT_OUTPUT_DIR_PATH.ts',
    `const DEFAULT_OUTPUT_DIR_PATH = '${defaultOutputDir}';\n\nexport default DEFAULT_OUTPUT_DIR_PATH;`
  );

  return true;
};

export default setDefaultOutputDir;
