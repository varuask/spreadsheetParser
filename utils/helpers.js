const fs = require('fs');
const supportedFileTypes = ['xlsx'];

const checkExistence = (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        return resolve(false);
      }
      return resolve(true);
    });
  });
};

const fileValidate = async (path) => {
  if (!path) {
    throw new Error('Please enter the file Path and try again');
  }
  const fileExists = await checkExistence(path);
  if (!fileExists) {
    throw new Error('Specified file does not exist');
  }
  const pathArray = path.split('.');
  const fileType = pathArray[pathArray.length - 1];
  if (!supportedFileTypes.includes(fileType)) {
    throw new Error('Unsupported file type');
  }
  return fileType;
};

const getNumberOfSheets = (userInput) => {
  if (!userInput) {
    return 1;
  }
  const sheets = Number(userInput);
  if (isNaN(sheets) || !Number.isInteger(sheets) || sheets < 1) {
    throw new Error('Please enter a suitable number for sheets');
  }
  return sheets;
};

module.exports = { fileValidate, getNumberOfSheets };
