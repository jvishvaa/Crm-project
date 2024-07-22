/* eslint-disable */
function getFilterItemFromArray(
  arr,
  filterKey,
  compareValue,
  isNotEqual = false
) {
  return arr.filter((item) => {
    if (Array.isArray(compareValue)) {
      return isNotEqual
        ? !compareValue.includes(item[filterKey])
        : compareValue.includes(item[filterKey]);
    } else if (typeof compareValue === "string") {
      return isNotEqual
        ? item[filterKey] !== compareValue
        : item[filterKey] === compareValue;
    }
    return false;
  });
}

export default getFilterItemFromArray;
