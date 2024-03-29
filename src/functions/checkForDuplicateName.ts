const checkForDuplicateName = (
  fileName: string,
  txtFilesOnWriteDir: string[]
) => {
  let someFileHasTheName = false;

  for (const file of txtFilesOnWriteDir) {
    if (file === `${fileName}.txt`) {
      someFileHasTheName = true;
    }
  }

  return someFileHasTheName;
};

export default checkForDuplicateName;
