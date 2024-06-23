import { useRef } from "react";
import { SafeAreaView } from "react-native";
import type {
  PanGestureHandlerGestureEvent,
  TapGestureHandlerGestureEvent
} from "react-native-gesture-handler";
import {
  PanGestureHandler,
  TapGestureHandler
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

import SpringCard from "../components/SpringCard";

// interface ComponentNameProps {}
const NUMBER_CARDS = 7;

export const AnimatedCardsScreen = () => {
  const ref = useRef<PanGestureHandler>(null);
  // This shared value "starts" the press animation by setting it to a number [0,1]
  const snapProgress = useSharedValue<null | number>(null);
  //this one "records" all gesture movements
  const gestureProgress = useSharedValue(0);
  const y = useSharedValue(100);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number }
  >({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      snapProgress.value = null;
      y.value = ctx.startY + event.translationY;
      const progress = interpolate(
        y.value,
        [-1000, -200, -100, 100, 200, 1000],
        [1.2, 1.1, 1, 0, -0.1, -0.2],
        Extrapolation.EXTEND
      );
      gestureProgress.value = progress;
    },
    onEnd: ({ velocityY }) => {
      let toValue!: number;
      let cappedVelocity!: number;

      if (y.value <= 0 || -velocityY >= 1000) {
        toValue = 1;
        cappedVelocity =
          y.value < -100 ? 0 : Math.max(Math.min(-velocityY / 10, 8), -2);
        y.value = -100;
      } else if (y.value > 0 || -velocityY <= -1000) {
        toValue = 0;
        cappedVelocity =
          y.value > 100 ? 0 : Math.min(Math.max(-velocityY / 10, -5), 2);
        y.value = 100;
      }

      gestureProgress.value = withSpring(toValue, {
        damping: 15,
        stiffness: 100,
        restSpeedThreshold: 0.01,
        restDisplacementThreshold: 0.001,
        velocity: cappedVelocity
      });
    }
  });

  const onPress = () => {
    "worklet";

    const toValue = y.value <= -100 ? 0 : 1;
    snapProgress.value = toValue;
    // set gesture progress and pan y to match the press animation
    y.value = toValue >= 1 ? -100 : 100;
    gestureProgress.value = toValue;
  };

  const tapGestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onEnd: () => {
        onPress();
      }
    });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PanGestureHandler
        ref={ref}
        minDist={1}
        onGestureEvent={panGestureHandler}
      >
        <Animated.View style={{ flex: 1 }}>
          <TapGestureHandler onGestureEvent={tapGestureHandler} waitFor={ref}>
            <Animated.View style={{ flex: 1 }}>
              {[...Array(NUMBER_CARDS)].map((_, index) => (
                <SpringCard
                  key={index}
                  snap={snapProgress}
                  gestureProgress={gestureProgress}
                  // We do this because we want the element with 0 index to snap to the top left
                  index={Math.abs(NUMBER_CARDS - 1 - index)}
                />
              ))}
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};
