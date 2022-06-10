import type { StackScreenProps } from "@react-navigation/stack";
import type { FC } from "react";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box } from "react-native-design-utility";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useWorkletCallback,
} from "react-native-reanimated";

import ColorPicker from "../../components/ColorPicker";
import type { ReactiveNavigationParams } from "../../navigation/ReactiveStack";

const colors = ["#000", "#FFF"];
const { width } = Dimensions.get("window");
const PICKER_WIDTH = width * 0.9;
const PREV_SIZE = width * 0.9;
const styles = StyleSheet.create({
  picker: {
    height: 30,
    width: PICKER_WIDTH,
    borderRadius: 10,
  },
  preview: {
    width: PREV_SIZE,
    height: PREV_SIZE,
    borderRadius: PREV_SIZE / 2,
    backgroundColor: "#000",
  },
});

type Props = StackScreenProps<ReactiveNavigationParams>;

export const ColorPickerScreen: FC<Props> = () => {
  const selection = useSharedValue<string | number>(colors[0]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: selection.value,
    };
  }, []);

  const onColorChanged = useWorkletCallback((color: number | string) => {
    selection.value = color;
  }, []);

  return (
    <Box f={1}>
      <Box f={3} center>
        <Animated.View style={[styles.preview, animatedStyle]} />
      </Box>
      <Box f={1} center>
        <ColorPicker
          style={styles.picker}
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          onColorChanged={onColorChanged}
        />
      </Box>
    </Box>
  );
};
