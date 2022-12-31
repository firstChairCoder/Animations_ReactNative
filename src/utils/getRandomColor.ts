// export const getRandomColor = ({
// 	colors = ["#F00", "#0F0", "#00F", "#FF0", "#0FF", "#F0F"],
// }: {
// 	colors: string[];
// }) => {
// 	const i = Math.floor((Math.random() * colors.length) % colors.length);

// 	return colors[i];
// };

const colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];
export const getRandomColor = () => {
  const i = Math.floor((Math.random() * colors.length) % colors.length);
  return colors[i];
};
