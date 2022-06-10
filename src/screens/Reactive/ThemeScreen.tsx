import React, { useState } from "react";
import { Dimensions, StyleSheet, Switch } from "react-native";
import { Box, Text } from "react-native-design-utility";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import { theme as t } from "../../../theme";

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedText = Animated.createAnimatedComponent(Text);
const SIZE = Dimensions.get("window").width * (2 / 3);
const TRACK_COLOR = {
  true: t.color.purple,
  false: t.color.greyLight,
};
const styles = StyleSheet.create({
  circle: {
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

const Colors = {
  dark: {
    background: t.color.black,
    circle: t.color.greyDarker,
    text: t.color.greyLightest,
  },
  light: {
    background: t.color.white,
    circle: t.color.greyLighter,
    text: t.color.greyDarkest,
  },
};

type Theme = "light" | "dark";

export const ThemeScreen = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const animation = useDerivedValue<number>(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const onChangeTheme = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animation.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return { backgroundColor };
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      animation.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return { color };
  }, []);

  const animatedCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animation.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );
    return { backgroundColor };
  }, []);

  return (
    <AnimatedBox style={animatedStyle} f={1} center>
      <AnimatedText
        style={animatedTextStyle}
        size={70}
        uppercase
        mb={24}
        ls={14}
      >
        Theme
      </AnimatedText>
      <AnimatedBox
        style={[styles.circle, animatedCircleStyle]}
        center
        w={SIZE}
        h={SIZE}
        radius={SIZE / 2}
      >
        <Switch
          value={theme === "light"}
          onValueChange={onChangeTheme}
          trackColor={TRACK_COLOR}
          thumbColor={t.color.purple}
        />
      </AnimatedBox>
    </AnimatedBox>
  );
};
