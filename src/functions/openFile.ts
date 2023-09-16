import { exec } from 'child_process';

const openFile = (filePath: string) => {
  const cmd = `open ${filePath}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
};

export default openFile;
