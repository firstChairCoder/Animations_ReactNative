import React, { useCallback } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Box } from "react-native-design-utility";
import type {
  HandlerStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 100,
    height: 100,
  },
});

export const TapGHScreen = () => {
  const animation = useSharedValue<number>(0);

  const onDoubleTapStateChange = useCallback(
    (e: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (e.nativeEvent.state === State.ACTIVE) {
        animation.value = withSpring(1, undefined, (finished) => {
          if (finished) {
            animation.value = withDelay(
              500,
              withSpring(0, { overshootClamping: true })
            );
          }
        });
      }
    },
    [animation]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animation.value,
        },
      ],
    };
  }, []);

  return (
    <Box f={1}>
      <TapGestureHandler
        numberOfTaps={2}
        maxDelayMs={250}
        onHandlerStateChange={onDoubleTapStateChange}
      >
        <Box>
          <ImageBackground
            style={styles.bg}
            source={require("../../../assets/images/cold-brew.jpg")}
          >
            <Animated.Image
              style={[styles.img, animatedStyle]}
              source={require("../../../assets/images/like.png")}
            />
          </ImageBackground>
        </Box>
      </TapGestureHandler>
    </Box>
  );
};
