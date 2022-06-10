import React from "react";
import { StyleSheet } from "react-native";
import { Box } from "react-native-design-utility";
import type { PinchGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const IMAGE_URL =
  // eslint-disable-next-line max-len
  "https://images.pexels.com/photos/5986353/pexels-photo-5986353.jpeg?cs=srgb&dl=pexels-bert-van-staeyen-5986353.jpg&fm=jpg";
const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export const PinchGHScreen = () => {
  const animation = useSharedValue<number>(1);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>(
      {
        onActive: (event) => {
          if (event.scale < 0.7 || event.scale > 2) {
            return;
          }
          animation.value = event.scale;
        },
        onEnd: () => {
          animation.value = withTiming(1);
        },
      },
      [animation]
    );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animation.value }],
    };
  }, [animation]);

  return (
    <Box f={1}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.Image
          style={[styles.img, animatedStyle]}
          source={{ uri: IMAGE_URL }}
        />
      </PinchGestureHandler>
    </Box>
  );
};
