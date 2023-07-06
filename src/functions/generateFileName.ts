import moment from 'moment';

const generateFileName = () => {
  const generatedFileName = moment()
    .format('ddd_DD-MM-YY_HH:mm:ss')
    .toLowerCase();

  return generatedFileName;
};

export default generateFileName;
