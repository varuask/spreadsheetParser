const { getXlsxStream } = require('xlstream');
const inputFormatter = require('../formatters/inputFormatter');

const xlsxStreamer = async (path, sheetIndex, resultSet) => {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await getXlsxStream({
        filePath: path,
        sheet: sheetIndex,
      });
      stream.on('data', (chunk) => {
        resultSet.push(inputFormatter(chunk.raw.obj));
      });
      stream.on('end', () => {
        resolve(true);
      });
      stream.on('error', (err) => {
        reject(err);
      });
    } catch (err) {
      reject(new Error(err.message));
    }
  });
};

const xlsxParser = async (path, sheetsNum) => {
  const data = [];
  try {
    for (let i = 0; i < sheetsNum; i++) {
      await xlsxStreamer(path, i, data);
    }
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = xlsxParser;
