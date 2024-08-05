function getSelectArray(array, labelKey, valkey) {
  return array?.length
    ? array.map(function (item) {
        return { label: item[labelKey], value: item[valkey] };
      })
    : [];
}

export default getSelectArray;
