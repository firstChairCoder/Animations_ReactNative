import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

const LOGIN_VIEW_HEIGHT = 150 + 70; //static value
const OverlayBg = ({ isOpenAnimation }) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const translateY = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, -LOGIN_VIEW_HEIGHT]
  });

  const backgroundColor = interpolateColor(isOpenAnimation, {
    inputRange: [0, 0.1, 1],
    outputRange: ["#2289D6", "#FFF", "#FFF"]
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor
        }
      ]}
    />
  );
};
export default OverlayBg;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: LOGIN_VIEW_HEIGHT,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  }
});
