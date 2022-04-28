import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  redStripe: {
    height: height / 5,
    width: width * 2,
    backgroundColor: "#CC1326",
    transform: [{ rotateZ: "35deg" }, { translateX: -height / 3 }],
  },
  blueStripe: {
    height: height / 5,
    width: width * 2,
    backgroundColor: "#73B0E9",
    transform: [{ rotateZ: "35deg" }, { translateX: -height / 3 }],
  },
  whiteStripe: {
    height: height / 5,
    width: width * 2,
    backgroundColor: "#FFF",
    transform: [{ rotateZ: "35deg" }, { translateX: -height / 3 }],
  },
});

export const Animation14 = () => {
  const yTranslation = useSharedValue(0);

  const stripeAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withRepeat(
            withTiming(yTranslation.value, {
              duration: 14000,
              easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
          ),
        },
      ],
    };
  });

  useEffect(() => {
    yTranslation.value = -height / 3;
  }, []);

  return (
    <Animated.View style={[styles.container, stripeAnimationStyle]}>
      <View style={styles.redStripe} />
      <View style={styles.whiteStripe} />
      <View style={styles.blueStripe} />
      <View style={styles.whiteStripe} />
      <View style={styles.redStripe} />
      <View style={styles.whiteStripe} />
      <View style={styles.blueStripe} />
      <View style={styles.whiteStripe} />
      <View style={styles.redStripe} />
      <View style={styles.whiteStripe} />
      <View style={styles.blueStripe} />
      <View style={styles.whiteStripe} />
      <View style={styles.redStripe} />
    </Animated.View>
  );
};
