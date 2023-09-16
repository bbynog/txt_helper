import { readdirSync } from 'fs';

const getTxtFilesFromDir = (dir: string): string[] => {
  const filesOnDir = readdirSync(dir);

  const txtFilesOnOutputDir = filesOnDir.filter((fileName: string) => {
    return fileName.endsWith('.txt');
  });

  return txtFilesOnOutputDir;
};

export default getTxtFilesFromDir;
