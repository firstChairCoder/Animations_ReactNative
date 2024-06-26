/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from "react";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Pressable, StyleSheet, View } from "react-native";

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

const WRAPPER_WIDTH = 524;
const WRAPPER_HEIGHT = WRAPPER_WIDTH / 2.5;
const KNOB_SIZE = WRAPPER_WIDTH / 3.75;

const initialState = 0;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    flex: 1,
    justifyContent: "center"
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: "#9992F8",
    borderRadius: 52,
    flexDirection: "row",
    height: WRAPPER_HEIGHT,
    justifyContent: "center",
    width: WRAPPER_WIDTH
  },
  knob: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: KNOB_SIZE * 2,
    height: KNOB_SIZE,
    justifyContent: "center",
    position: "absolute",
    width: KNOB_SIZE
  },
  actionButtonsContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  iconWrapper: {
    alignItems: "center",
    borderRadius: KNOB_SIZE * 2,
    height: KNOB_SIZE,
    justifyContent: "center",
    margin: (WRAPPER_HEIGHT - KNOB_SIZE) / 2,
    width: KNOB_SIZE
  },

  iconDec: {
    backgroundColor: "#051730",
    borderRadius: 4,
    height: 4,
    width: 42
  },
  iconInc: {
    backgroundColor: "#051730",
    borderRadius: 4,
    height: 4,
    width: 42
  },
  iconIncVertical: {
    backgroundColor: "#051730",
    borderRadius: 4,
    height: 42,
    position: "absolute",
    width: 4
  },
  text: {
    color: "#051730",
    fontSize: 56,
    fontWeight: "500"
  }
});

export const Animation23 = () => {
  const [count, setCount] = useState(initialState);
  const wrapperX = useSharedValue(0);
  const knobX = useSharedValue(0);
  const wrapperY = useSharedValue(0);
  const knobY = useSharedValue(0);
  const decrementContScale = useSharedValue(1);
  const incrementContScale = useSharedValue(1);
  const incrementDecrementGesture = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = wrapperX.value;
      ctx.startY = wrapperY.value;
      ctx.direction = undefined;
    },
    onActive: (event, ctx) => {
      if (ctx.direction === undefined) {
        ctx.direction =
          Math.abs(event.velocityX) > Math.abs(event.velocityY) ? "x" : "y";
      }

      if (ctx.direction === "y") {
        incrementDecrementGesture.value = withTiming(1);
        wrapperY.value = interpolate(
          event.translationY,
          [0, WRAPPER_HEIGHT],
          [0, (WRAPPER_HEIGHT - KNOB_SIZE) / 3]
        );

        knobY.value = interpolate(
          event.translationY,
          [0, KNOB_SIZE],
          [0, (WRAPPER_HEIGHT - KNOB_SIZE) / 1.6]
        );
      } else {
        wrapperX.value = interpolate(
          event.translationX,
          [0, WRAPPER_WIDTH],
          [0, KNOB_SIZE / 2]
        );
        knobX.value = interpolate(
          event.translationX,
          [0, KNOB_SIZE],
          [0, KNOB_SIZE / 3]
        );
      }
      if (ctx.direction === "x" && event.translationX >= 0) {
        incrementContScale.value = withTiming(1.2);
        decrementContScale.value = withTiming(1);
      } else if (ctx.direction === "x" && event.translationX <= 0) {
        decrementContScale.value = withTiming(1.2);
        incrementContScale.value = withTiming(1);
      }
    },
    onEnd: (event, ctx) => {
      if (ctx.direction === "x" && event.translationX >= 0) {
        runOnJS(setCount)(count + 1);
        incrementContScale.value = withTiming(1);
      } else if (ctx.direction === "x" && event.translationX <= 0) {
        runOnJS(setCount)(count - 1);
        decrementContScale.value = withTiming(1);
      }

      if (ctx.direction === "y") {
        wrapperY.value = withSpring(0);
        knobY.value = withSpring(0);
        incrementDecrementGesture.value = withTiming(0);
        runOnJS(setCount)(initialState);
      } else if (ctx.direction === "x") {
        wrapperX.value = withSpring(0);
        knobX.value = withSpring(0);
      }
    }
  });

  const wrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: wrapperX.value
        },
        {
          translateY: wrapperY.value
        }
      ]
    };
  });
  const knobStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: knobX.value
        },
        {
          translateY: knobY.value
        }
      ]
    };
  });

  const decrementStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            incrementDecrementGesture.value,
            [0, 1],
            [0, 157]
          )
        },
        {
          rotate: `${interpolate(
            incrementDecrementGesture.value,
            [0, 1],
            [0, 314]
          )}deg`
        }
      ]
    };
  });

  const incrementStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            incrementDecrementGesture.value,
            [0, 1],
            [0, -157]
          )
        },
        {
          rotate: `${interpolate(
            incrementDecrementGesture.value,
            [0, 1],
            [0, 224]
          )}deg`
        }
      ]
    };
  });
  const incrementVerticalPartStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(incrementDecrementGesture.value, [0, 1], [1, 0]),
      transform: [
        {
          translateY: interpolate(
            incrementDecrementGesture.value,
            [0, 1],
            [0, 100]
          )
        }
      ]
    };
  });
  const decrementContStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(decrementContScale.value, [1, 0], [1, 0])
        },
        {
          translateX: interpolate(
            decrementContScale.value,
            [0, 1],
            [KNOB_SIZE, 0]
          )
        }
      ]
    };
  });
  const incrementContStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(incrementContScale.value, [1, 0], [1, 0])
        },
        {
          translateX: interpolate(
            incrementContScale.value,
            [0, 1],
            [-KNOB_SIZE, 0]
          )
        }
      ]
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.wrapper, wrapperStyle]}>
          <View style={styles.actionButtonsContainer}>
            <AnimatedButton
              style={[styles.iconWrapper, decrementContStyle]}
              onPress={() => setCount((count) => count - 1)}
            >
              <Animated.View style={[styles.iconDec, decrementStyle]} />
            </AnimatedButton>
            <AnimatedButton
              style={[styles.iconWrapper, incrementContStyle]}
              onPress={() => setCount((count) => count + 1)}
            >
              <Animated.View style={[styles.iconInc, incrementStyle]} />
              <Animated.View
                style={[styles.iconIncVertical, incrementVerticalPartStyle]}
              />
            </AnimatedButton>
          </View>
          <Animated.View style={[styles.knob, knobStyle]}>
            <Animated.Text style={[styles.text]}>{count}</Animated.Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
