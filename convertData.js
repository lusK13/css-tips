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
    } else {
      throw new Error(`Missing required data ${key}`);
    }
  }
  for (const key of optionalDatas) {
    if (datas[key]) {
      result[key] = datas[key];
    }
  }
  if (convertProperty) {
    for (const key in convertProperty) {
      result[key] = convertProperty[key](result[key]);
    }
  }
  return result;
}
