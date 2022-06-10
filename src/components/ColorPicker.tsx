import type { LinearGradientProps } from "expo-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import type { FC } from "react";
import React, { useCallback } from "react";
import type { LayoutChangeEvent } from "react-native";
import { StyleSheet } from "react-native";
import type {
  PanGestureHandlerGestureEvent,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { clamp } from "../utils/clamp";

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
  },
  picker: {
    position: "absolute",
    height: 32,
    width: 32,
    backgroundColor: "#FFF",
    borderRadius: 32 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  innerPicker: {
    width: "60%",
    height: "60%",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
});

type PanGestureContext = { translateX: number };

interface Props extends LinearGradientProps {
  onColorChanged: (color: number | string) => void;
}

const ColorPicker: FC<Props> = (props) => {
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);
  const rootWidth = useSharedValue<number>(0);
  const pickerWidth = useSharedValue<number>(0);

  const onRootLayout = useCallback((e: LayoutChangeEvent) => {
    "worklet";
    rootWidth.value = e.nativeEvent.layout.width;
  }, []);

  const onPickerLayout = useCallback((e: LayoutChangeEvent) => {
    "worklet";
    pickerWidth.value = e.nativeEvent.layout.width;
  }, []);

  const tapGestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onActive: (event) => {
        translateX.value = withTiming(event.x - pickerWidth.value / 2);
        translateY.value = withTiming(-pickerWidth.value);
        scale.value = withTiming(1.5);
      },
      onEnd: () => {
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
      },
    });

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      translateY.value = withTiming(-pickerWidth.value);
      scale.value = withTiming(1.5);
    },
    onActive: (event, context) => {
      translateX.value = clamp(event.translationX + context.translateX, {
        max: rootWidth.value - pickerWidth.value,
        min: 0,
      });
    },
    onEnd: () => {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });

  const pickerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  }, []);

  const innerPickerAnimatedStyle = useAnimatedStyle(() => {
    const maxLen = rootWidth.value - pickerWidth.value;
    const breakPoints = props.colors.map((_, index) => {
      return (index * maxLen) / (props.colors.length - 1);
    });
    const backgroundColor = interpolateColor(
      translateX.value,
      breakPoints,
      props.colors
    );
    props.onColorChanged(backgroundColor);
    return {
      backgroundColor,
    };
  }, [props.colors, props.onColorChanged]);

  return (
    <TapGestureHandler onGestureEvent={tapGestureHandler}>
      <Animated.View style={[props.style, styles.root]} onLayout={onRootLayout}>
        <LinearGradient {...props} />
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View
            style={[styles.picker, pickerAnimatedStyle]}
            onLayout={onPickerLayout}
          >
            <Animated.View
              style={[styles.innerPicker, innerPickerAnimatedStyle]}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ColorPicker;
