import { Feather as Icon } from "@expo/vector-icons";
import type { StackScreenProps } from "@react-navigation/stack";
import type { FC } from "react";
import React, { useCallback } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { Box } from "react-native-design-utility";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { ReactiveNavigationParams } from "../../navigation/ReactiveStack";
import { clamp } from "../../utils/clamp";

const { width } = Dimensions.get("window");
const THRESHOLD = width * 0.3;

type Props = StackScreenProps<ReactiveNavigationParams, "Perspective">;
type PanGestureContext = { translateX: number };

export const PerspectiveMenuScreen: FC<Props> = () => {
  const translateX = useSharedValue(0);

  const handlePanGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >({
    onStart: (_, context) => {
      cancelAnimation(translateX);
      context.translateX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = clamp(event.translationX + context.translateX, {
        min: -width,
        max: 0,
      });
    },
    onEnd: () => {
      if (translateX.value <= -THRESHOLD) {
        translateX.value = withTiming(-width / 2);
      }

      if (translateX.value > -THRESHOLD) {
        translateX.value = withTiming(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      translateX.value,
      [-width / 2, 0],
      [3, 0],
      Extrapolation.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      [-width / 2, 0],
      [15, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { perspective: 100 },
        { translateX: translateX.value },
        { rotateY: `${rotateY}deg` },
      ],
      borderRadius,
    };
  }, []);

  const toggleMenu = useCallback(() => {
    if (translateX.value <= -THRESHOLD) {
      translateX.value = withTiming(0);
    }

    if (translateX.value > -THRESHOLD) {
      translateX.value = withTiming(-width / 2);
    }
  }, []);

  return (
    <PanGestureHandler
      onGestureEvent={handlePanGesture}
      hitSlop={{ left: -50 }}
    >
      <Animated.View
        style={[{ flex: 1, backgroundColor: "plum" }, animatedStyle]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Box dir="row-reverse" p={16}>
            <Icon name="menu" size={24} color="#000" onPress={toggleMenu} />
          </Box>
        </SafeAreaView>
      </Animated.View>
    </PanGestureHandler>
  );
};
