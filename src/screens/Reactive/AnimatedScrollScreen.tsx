import type { StackScreenProps } from "@react-navigation/stack";
import type { FC } from "react";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Box } from "react-native-design-utility";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import type { ReactiveNavigationParams } from "../../navigation/ReactiveStack";
import { bg } from "./PGHScreen";

const { width } = Dimensions.get("window");
const quote: string[] = ["MONEY", "CLARIFIES;", "BUT", "SO", "DOES,", "WAR!"];
const ITEM_SIZE = width * 0.75;
const styles = StyleSheet.create({
  square: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: bg,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  text: {
    fontSize: 54,
    fontWeight: "700",
    color: "#FFF",
    position: "absolute",
  },
});

interface PageProps {
  title: string;
  idx: number;
  translateX: Animated.SharedValue<number>;
}

const Page: FC<PageProps> = (props) => {
  const animatedInputRange = useMemo(() => {
    return [
      (props.idx - 1) * width,
      props.idx * width,
      (props.idx + 1) * width,
    ];
  }, [props.idx]);

  const animatedBoxStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      props.translateX.value,
      animatedInputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    const borderRadius = interpolate(
      props.translateX.value,
      animatedInputRange,
      [0, ITEM_SIZE / 2, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
      borderRadius,
    };
  }, [props.translateX, animatedInputRange]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      props.translateX.value,
      animatedInputRange,
      [200, 0, -200],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      props.translateX.value,
      animatedInputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  }, [props.translateX, animatedInputRange]);

  return (
    <Box
      w={width}
      h={"100%"}
      center
      style={{ backgroundColor: `rgba(123, 31, 162, 0.${props.idx})` }}
    >
      <Animated.View style={[styles.square, animatedBoxStyle]} />
      <Animated.Text style={[styles.text, animatedTextStyle]}>
        {props.title}
      </Animated.Text>
    </Box>
  );
};

type Props = StackScreenProps<ReactiveNavigationParams, "AnimatedScrollView">;

export const AnimatedScrollScreen: FC<Props> = (props) => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      style={{ flex: 1 }}
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      pagingEnabled
    >
      {quote.map((word, idx) => (
        <Page key={idx} title={word} idx={idx} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  );
};
