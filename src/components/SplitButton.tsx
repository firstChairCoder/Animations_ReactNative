//import liraries
import type { FC } from "react";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";

import PressableScale from "./PressableScale";

const { width } = Dimensions.get("window");
const BTN_HEIGHT = 60;
const PADDING = 20;
const GAP = 10;
const SPLIT_BUTTON_WIDTH = (width - PADDING * 2 - GAP) / 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: BTN_HEIGHT,
    paddingHorizontal: PADDING,
    width: "100%"
  },
  btn: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 30,
    height: BTN_HEIGHT,
    justifyContent: "center"
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    position: "absolute",
    textTransform: "uppercase"
  }
});

type SplitAction = {
  label: string;
  onPress: () => void;
  backgroundColor: string;
};

interface SplitButtonProps {
  isSplit: boolean;
  leftAction: SplitAction;
  mainAction: SplitAction;
  rightAction: SplitAction;
}

const SplitButton: FC<SplitButtonProps> = ({
  isSplit,
  leftAction,
  mainAction,
  rightAction
}) => {
  //Left
  const rLeftButtonStyle = useAnimatedStyle(() => {
    const leftButtonWidth = isSplit ? SPLIT_BUTTON_WIDTH : 0;
    return {
      width: withTiming(leftButtonWidth),
      opacity: withTiming(isSplit ? 1 : 0)
    };
  }, [isSplit]);

  const rLeftTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSplit ? 1 : 0, {
        duration: 150
      })
    };
  }, [isSplit]);

  //Main
  const rMainButtonStyle = useAnimatedStyle(() => {
    const mainButtonWidth = isSplit
      ? SPLIT_BUTTON_WIDTH
      : // IMPORTANT: This has been fixed from the original demo, it was:
        // SplittedButtonWidth * 2 (I forgot to add the gap between the buttons)
        SPLIT_BUTTON_WIDTH * 2 + GAP;
    return {
      width: withTiming(mainButtonWidth),
      marginLeft: withTiming(isSplit ? GAP : 0),
      backgroundColor: withTiming(
        isSplit ? rightAction.backgroundColor : mainAction.backgroundColor
      )
    };
  }, [isSplit]);

  const rMainTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSplit ? 0 : 1)
    };
  }, [isSplit]);

  const rRightTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSplit ? 1 : 0)
    };
  }, [isSplit]);

  return (
    <View style={styles.container}>
      <PressableScale
        onPress={() => true}
        style={[
          { backgroundColor: leftAction.backgroundColor },
          rLeftButtonStyle,
          styles.btn
        ]}
      >
        <Animated.Text numberOfLines={1} style={[styles.label, rLeftTextStyle]}>
          {leftAction.label}
        </Animated.Text>
      </PressableScale>
      <PressableScale
        onPress={isSplit ? rightAction.onPress : mainAction.onPress}
        style={[rMainButtonStyle, styles.btn]}
      >
        <Animated.Text style={[styles.label, rMainTextStyle]}>
          {mainAction.label}
        </Animated.Text>
        <Animated.Text style={[styles.label, rRightTextStyle]}>
          {rightAction.label}
        </Animated.Text>
      </PressableScale>
    </View>
  );
};

export default SplitButton;
