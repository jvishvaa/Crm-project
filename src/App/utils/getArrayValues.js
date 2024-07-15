/* eslint-disable */
function getArrayValues(array, key) {
  return array.map(function (item) {
    return item[key];
  });
}

export default getArrayValues;
