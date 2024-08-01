export const getRandomColor = (index) => {
  const colors = [
    "blue",
    "cyan",
    "geekblue",
    "gold",
    "green",
    "lime",
    "magenta",
    "orange",
    "pink",
    "purple",
    "red",
    "volcano",
    "yellow",
    "warning",
    "success",
    "processing",
  ];

  return colors[index % colors.length];
};
