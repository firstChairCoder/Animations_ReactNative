import React, { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHeaderHeight } from "@react-navigation/elements";
import { Box, Text } from "react-native-design-utility";
import Animated, {
  cancelAnimation,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "../../../theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const INNER_CIRCLE_COLOR = theme.color.redDark;
const OUTER_CIRCLE_COLOR = theme.color.greenLight;
const styles = StyleSheet.create({
  num: {
    color: theme.color.greyDark,
    fontSize: 40,
    textAlign: "center",
  },
  btn: {
    position: "absolute",
    bottom: 80,
    padding: 16,
    backgroundColor: theme.color.greenLight,
    borderRadius: 16,
  },
});

export const SvgLoaderScreen = () => {
  const { width, height } = useWindowDimensions();
  const progress = useSharedValue<number>(0);
  const percent = useDerivedValue<string>(
    () => `${Math.floor(progress.value * 100)}%`,
    []
  );

  const headerHeight = useHeaderHeight();
  const { top } = useSafeAreaInsets();
  const circle = useMemo(() => {
    const cx = width / 2;
    const cy = height / 2 + top - headerHeight / 1.35;
    const radius = width * 0.3;
    const circumference = 2 * Math.PI * radius;
    return { cx, cy, radius, circumference };
  }, [headerHeight]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: (1 - progress.value) * circle.circumference,
    };
  }, []);

  const onPress = useCallback(() => {
    cancelAnimation(progress);
    let duration = 10000;
    if (progress.value === 0) {
      progress.value = withTiming(1, { duration });
    } else {
      duration *= progress.value;
      progress.value = withTiming(0, { duration });
    }
  }, []);

  return (
    <Box f={1} center>
      <ReText text={percent} style={styles.num} />
      <Svg
        style={{
          position: "absolute",
        }}
      >
        {/* TODO: Border Radius around outer circle */}
        <Circle
          cx={circle.cx}
          cy={circle.cy}
          r={circle.radius}
          stroke={INNER_CIRCLE_COLOR}
          strokeWidth={24}
        />
        <AnimatedCircle
          cx={circle.cx}
          cy={circle.cy}
          r={circle.radius}
          stroke={OUTER_CIRCLE_COLOR}
          strokeWidth={30}
          strokeDasharray={circle.circumference}
          animatedProps={animatedProps}
        />
      </Svg>

      <Pressable onPress={onPress} style={styles.btn}>
        <Text>Start</Text>
      </Pressable>
    </Box>
  );
};
