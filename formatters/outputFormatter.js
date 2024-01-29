const setKeyValuePair = (obj, oldKey, newKey) => {
  const finalKeyValue = {};
  if (obj[oldKey] || obj[oldKey] === 0) {
    finalKeyValue[newKey] = obj[oldKey];
  }
  return finalKeyValue;
};

const createOutputObject = (obj) => {
  const socials = {
    ...setKeyValuePair(obj, 'S', 'facebook'),
    ...setKeyValuePair(obj, 'T', 'googlepus'),
    ...setKeyValuePair(obj, 'U', 'twitter'),
  };
  const location = {
    ...setKeyValuePair(obj, 'K', 'street'),
    ...setKeyValuePair(obj, 'L', 'city'),
    ...setKeyValuePair(obj, 'R', 'state'),
    ...setKeyValuePair(obj, 'M', 'country'),
    ...setKeyValuePair(obj, 'N', 'address'),
    ...setKeyValuePair(obj, 'O', 'latitude'),
    ...setKeyValuePair(obj, 'P', 'longitude'),
    ...setKeyValuePair(obj, 'Q', 'zip'),
  };
  const content = {
    ...setKeyValuePair(obj, 'H', 'id'),
    ...setKeyValuePair(obj, 'I', 'slug'),
    ...setKeyValuePair(obj, 'J', 'body'),
  };
  const contact = {
    ...setKeyValuePair(obj, 'C', 'email'),
    ...setKeyValuePair(obj, 'D', 'fax'),
    ...setKeyValuePair(obj, 'E', 'mobile'),
    ...setKeyValuePair(obj, 'F', 'phone'),
    ...setKeyValuePair(obj, 'G', 'website'),
  };
  const contentChildrenCount = {
    ...setKeyValuePair(obj, 'B', 'review'),
    ...setKeyValuePair(obj, 'ZZ', 'lead'),
  };
  const finalObject = {
    id: 1,
    ...setKeyValuePair(obj, 'A', 'category'),
    ...(Object.keys(contentChildrenCount).length > 0 && {
      contentChildrenCount,
    }),
    ...(Object.keys(contact).length > 0 && { contact }),
    ...(Object.keys(content).length > 0 && { content }),
    ...(Object.keys(location).length > 0 && { location }),
    ...(Object.keys(socials).length > 0 && { socials }),
    ...setKeyValuePair(obj, 'V', 'status'),
    ...setKeyValuePair(obj, 'W', 'title'),
  };
  return finalObject;
};

const outputFormatter = (inputArr) => {
  const outputArr = [];
  inputArr.forEach((element) => {
    outputArr.push(createOutputObject(element));
  });
  return outputArr;
};

module.exports = { outputFormatter };
