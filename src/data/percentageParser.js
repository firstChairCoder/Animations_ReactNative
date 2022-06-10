const percentageParser = (current, total) => {
  "worklet";
  return `${Math.round((current * 100) / total)}`;
};

export default percentageParser;
