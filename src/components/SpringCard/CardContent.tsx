import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { getRandomNumberFromRange } from "../../utils/getRandomNumberFromRange";
import { rotateArray } from "../../utils/rotateArray";

const colors = [
  "#007AFF",
  "#5AC8FA",
  "#34C759",
  "#5854D6",
  "#AF52DE",
  "#FF8FA3",
  "#FFB3C1"
];
const styles = StyleSheet.create({
  bar: {
    borderRadius: 3,
    elevation: 5,
    height: 10,
    justifyContent: "center",
    shadowColor: "#CDC",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.08,

    shadowRadius: 2
  }
});

const CardContent = ({ index }: { index: number }) => {
  return (
    <>
      {colors.map((_, colorIndex) => (
        <Animated.View
          key={colorIndex}
          style={[
            styles.bar,
            {
              width: getRandomNumberFromRange(30, 65),
              marginBottom: colorIndex === 2 || colorIndex === 4 ? 16 : 4,
              backgroundColor: rotateArray(colors, index % 2)[colorIndex]
            }
          ]}
        />
      ))}
    </>
  );
};

export default CardContent;
