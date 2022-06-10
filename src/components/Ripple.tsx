import type { FC } from "react";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import type { TapGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
}

export const Ripple: FC<Props> = (props) => {
  const centerX = useSharedValue<number>(0);
  const centerY = useSharedValue<number>(0);
  const scale = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(0);
  const width = useSharedValue<number>(0);
  const height = useSharedValue<number>(0);

  const ref = useAnimatedRef<Animated.View>();

  const handleTapGesture =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: (event) => {
        const layout = measure(ref);
        width.value = layout.width;
        height.value = layout.height;

        cancelAnimation(scale);
        cancelAnimation(opacity);
        centerX.value = event.x;
        centerY.value = event.y;
        scale.value = 0;
        opacity.value = 0.7;
      },
      onActive: () => {
        scale.value = withTiming(1, { duration: 500 });
        opacity.value = withTiming(0, { duration: 500 });
        if (props.onTap) {
          runOnJS(props.onTap)();
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onFinish: () => {},
    });

  const rippleAnimationStyle = useAnimatedStyle(() => {
    const radius = Math.sqrt(width.value ** 2 + height.value ** 2);
    return {
      position: "absolute",
      left: 0,
      top: 0,
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      backgroundColor: "#cdcdcd",
      opacity: opacity.value,
      transform: [
        { translateX: centerX.value - radius },
        { translateY: centerY.value - radius },
        { scale: scale.value },
      ],
    };
  }, []);

  return (
    <TapGestureHandler onGestureEvent={handleTapGesture}>
      <Animated.View ref={ref} style={props.style}>
        <View style={styles.container}>
          <Animated.View style={rippleAnimationStyle} />
        </View>
        {props.children}
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
});
