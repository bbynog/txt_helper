import moment from 'moment';

const autoGenerateFileName = () => {
  const fileName = moment().format('ddd_DD-MM-YY_HH:mm:ss').toLowerCase();

  return fileName;
};

export default autoGenerateFileName;
