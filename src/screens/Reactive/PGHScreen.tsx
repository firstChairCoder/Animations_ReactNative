import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box } from "react-native-design-utility";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const ITEM_SIZE = 100;
const RAD = Dimensions.get("window").width * 0.9;
export const bg = "rgba(123,31,162,0.5)";
const styles = StyleSheet.create({
  shape: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: bg,
    borderRadius: 20,
  },
});

type PanGestureContext = {
  translateX: number;
  translateY: number;
};

export const PGHScreen = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (_) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < RAD / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  }, []);

  return (
    <Box f={1} center>
      <Box
        w={RAD}
        h={RAD}
        radius={RAD / 2}
        style={{ borderWidth: 10, borderColor: bg }}
        position="absolute"
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.shape, animatedStyle]} />
      </PanGestureHandler>
    </Box>
  );
};
