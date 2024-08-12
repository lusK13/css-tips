function convertDatas2(
  datas,
  requiredDatas = [],
  optionalDatas = [],
  convertProperty
) {
  const result = {};

  for (const key of requiredDatas) {
    if (datas[key] !== undefined) {
      result[key] = datas[key];
    }
  }

  for (const key of optionalDatas) {
    if (datas[key] !== undefined) {
      result[key] = datas[key];
    }
  }

  if (convertProperty) {
    for (const key in convertProperty) {
      if (!(requiredDatas.includes(key) || optionalDatas.includes(key))) {
        throw new Error(`Missing in required or optional data: ${key}`);
      }
      const convertFunction = convertProperty[key];
      if (typeof convertFunction === "function") {
        result[key] = convertFunction(datas[key], datas);
      } else {
        result[key] = convertFunction;
      }
      if (result[key] === undefined) {
        if (requiredDatas.includes(key)) {
          throw new Error(`Missing required data: ${key}`);
        }
        delete result[key];
      }
    }
  }

  const missingDatas = requiredDatas.filter(
    (key) => !Object.keys(result).includes(key)
  );

  if (missingDatas.length > 0) {
    throw new Error(`Missing required data: ${missingDatas.join(", ")}`);
  }
  return result;
}

function convertDatas(
  datas,
  requiredDatas = [],
  optionalDatas = [],
  convertProperty
) {
  const result = {};
  for (const key of requiredDatas) {
    if (datas[key]) {
      result[key] = datas[key];
    }
  }
  for (const key of optionalDatas) {
    if (datas[key]) {
      result[key] = datas[key];
    }
  }
  if (convertProperty) {
    for (const key in convertProperty) {
      if (!(requiredDatas.includes(key) || optionalDatas.includes(key))) {
        throw new Error(`Missing in input required or optionnal data: ${key}`);
      }
      if (typeof convertProperty[key] === "function") {
        result[key] = convertProperty[key](result[key]);
      } else {
        result[key] = convertProperty[key];
      }
      if (result[key] === undefined) {
        if (requiredDatas.includes(key)) {
          throw new Error(`Missing required data: ${key}`);
        }
        delete result[key];
      }
    }
  }
  const missingDatas = requiredDatas.filter(
    (key) => !Object.keys(result).includes(key)
  );
  if (missingDatas.length > 0) {
    throw new Error(`Missing required data: ${missingDatas.join(", ")}`);
  }
  return result;
}
function remapKeysDatas(datas, oldKeys, newKeys, deleteOtherKeys = false) {
  const result = {};
  for (const key in datas) {
    const index = oldKeys.indexOf(key);
    if (index !== -1) {
      result[newKeys[index]] = datas[key];
    } else {
      if (!deleteOtherKeys) {
        result[key] = datas[key];
      }
    }
  }

  return result;
}
