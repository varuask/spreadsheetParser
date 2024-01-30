const fs = require('fs');
const { fileValidate, getNumberOfSheets } = require('./utils/helpers');
const xlsxParser = require('./parsers/xlsxParser');
const { outputFormatter } = require('./formatters/outputFormatter');

const main = async () => {
  try {
    const path = process.argv[2];
    await fileValidate(path);
    const sheets = getNumberOfSheets(process.argv[3]);
    const [headers, ...data] = await xlsxParser(path, sheets);
    const filteredData =
      sheets > 1
        ? data.filter((val) => JSON.stringify(val) !== JSON.stringify(headers))
        : data;
    const outputData = outputFormatter(filteredData);
    const writeStream = fs.createWriteStream('outut.jsonl');
    outputData.forEach((element) => {
      const jsonEntity = JSON.stringify(element);
      writeStream.write(jsonEntity + '\n');
    });
  } catch (err) {
    if (
      err.message === `Cannot read properties of undefined (reading 'relsId')`
    ) {
      console.log(
        `Please enter a valid number of sheets and make sure that the sheet does exist`
      );
    } else {
      console.log(`app terminated because of this problem -> ${err.message}`);
    }
  }
};
main();
