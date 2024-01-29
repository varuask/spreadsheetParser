module.exports = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim();
    }
    if (key === 'A' && typeof obj[key] === 'string') {
      obj[key] = obj[key].split(';');
    }
    if (key === 'B' && typeof obj[key] === 'string') {
      const [segmentA, segmentB] = obj[key].split(';');
      obj[key] = Number(segmentA?.split('|')[1]);
      if (segmentB) {
        obj['ZZ'] = Number(segmentB?.split('|')[1]);
      }
    }
  }
  return obj;
};
