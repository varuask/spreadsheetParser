const fs = require('fs');
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
    const writeStream = fs.createWriteStream('outut.jsonl');
    outputData.forEach((element) => {
      const jsonEntity = JSON.stringify(element);
      writeStream.write(jsonEntity + '\n');
    });
    console.log(outputData[0]);
  } catch (err) {
    console.log(`app terminated because of this problem -> ${err.message}`);
  }
};
main();
