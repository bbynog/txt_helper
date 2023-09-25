import moment from 'moment';

const autoGenerateFileName = () => {
  const fileName = moment().format('DD-MM-YY_ddd_HH:mm:ss').toLowerCase();

  return fileName;
};

export default autoGenerateFileName;
