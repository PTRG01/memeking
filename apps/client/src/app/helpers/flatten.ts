/* eslint-disable-next-line */
export const flattenObject = (obj: object, parentKey?: string) => {
  let result = {};

  Object.entries(obj).forEach(([key, value]) => {
    const _key = parentKey ? parentKey + '.' + key : key;
    if (typeof value === 'object') {
      result = { ...result, ...flattenObject(value, _key) };
    } else {
      result[_key] = value;
    }
  });

  return result;
};
export default flattenObject;
