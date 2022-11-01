import React from "react";
import { StyleSheet } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

import { LOGIN_VIEW_HEIGHT, SCREEN_HEIGHT } from "../../screens";
const OverlayBg = ({ isOpenAnimation }) => {
  const translateY = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, -LOGIN_VIEW_HEIGHT],
  });

  const backgroundColor = interpolateColor(isOpenAnimation, {
    inputRange: [0, 0.1, 1],
    outputRange: ["#2289D6", "#FFF", "#FFF"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor,
        },
      ]}
    />
  );
};
export default OverlayBg;

const styles = StyleSheet.create({
  container: {
    height: LOGIN_VIEW_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
