function getTruncateString(str, maxLength = 30) {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

export default getTruncateString;
