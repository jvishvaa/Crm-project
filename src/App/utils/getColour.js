const getColour = (key) => {
  const colors = {
    active: "#5CB85C",
    inactive: "#FC0027",
    grayMedium: "#7a7a7a",
  };
  return colors[key] || "#FFFFFF";
};

export default getColour;
