const { fileValidate, getNumberOfSheets } = require('./utils/helpers');
const xlsxParser = require('./parsers/xlsxParser');
const { outputFormatter } = require('./formatters/outputFormatter');

const main = async () => {
  try {
    const path = process.argv[2];
    await fileValidate(path);
    const sheets = getNumberOfSheets(process.argv[4]);
    const [, ...data] = await xlsxParser(path, sheets);
    const outputData = outputFormatter(data);
    console.log(outputData[0]);
  } catch (err) {
    console.log(`app terminated because of this problem -> ${err.message}`);
  }
};
main();
