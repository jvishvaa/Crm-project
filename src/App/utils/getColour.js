const getColour = (key) => {
  const colors = {
    active: "#5CB85C",
    inactve: "FC0027",
  };
  return colors?.key || "FFFFFF";
};

export default getColour;
