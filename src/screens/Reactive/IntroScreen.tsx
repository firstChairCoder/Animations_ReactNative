import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Box } from "react-native-design-utility";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

import { theme } from "../../../theme";

const styles = StyleSheet.create({
  shape: {
    width: 100,
    height: 100,
    backgroundColor: theme.color.blueDarker,
  },
});

const handleRotation = (animation: Animated.SharedValue<number>) => {
  "worklet";

  return `${Math.PI * 2 * animation.value}rad`;
};

export const IntroScreen = () => {
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withRepeat(withSpring(1), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: (animation.value * 100) / 2,
      opacity: animation.value / 2,
      transform: [
        {
          rotate: handleRotation(animation),
        },
        {
          scale: animation.value * 1.5,
        },
      ],
    };
  });
  return (
    <Box f={1} center>
      <Animated.View style={[styles.shape, animatedStyle]} />
    </Box>
  );
};
