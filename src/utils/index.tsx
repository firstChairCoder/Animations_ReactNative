export const getGradientRGB = (index, itemsNum) => {
  const multiplier = 255 / (itemsNum - 1);
  const colorVal = index * multiplier;

  return `rgb(${colorVal}, ${Math.abs(208 - colorVal)}, ${255 - colorVal})`;
};