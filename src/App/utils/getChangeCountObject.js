function getChangedCountValues(obj1, obj2) {
  let changedCount = 0;

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
        if (
          obj1[key].length !== obj2[key].length ||
          !obj1[key].every((value, index) => value === obj2[key][index])
        ) {
          changedCount++;
        }
      } else if (obj1[key] !== obj2[key]) {
        changedCount++;
      }
    }
  }

  return changedCount;
}

export default getChangedCountValues;
