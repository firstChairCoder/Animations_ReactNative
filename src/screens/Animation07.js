/* eslint-disable react-native/no-inline-styles */
// Inspiration: https://dribbble.com/shots/3845034-Listening-now-Kishi-Bashi

import React from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

const { width, height } = Dimensions.get("window");
// const color = "#FE497F";
const color = "#121212";
// const color = "#364680";
const minF = width * 0.1;
const maxF = width * 0.34;
const clampMin = 25;
const clampMax = 75;

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedPath = Animated.createAnimatedComponent(Path);
Animated.addWhitelistedNativeProps({ text: true });

const clamp = (value, min, max) => {
  "worklet";
  return Math.min(Math.max(min, value), max);
};

const AnimatedText = ({ text, style, ...props }) => {
  const animatedProps = useAnimatedProps(() => {
    if (!text) {
      return {};
    }
    return {
      text: String(text.value),
    };
  });

  return (
    <AnimatedTextInput
      style={[style]}
      editable={false}
      allowFontScaling={true}
      numberOfLines={1}
      value={String(text.value)}
      underlineColorAndroid={"transparent"}
      {...{ animatedProps }}
    />
  );
};

export const Animation07 = () => {
  const posY = useSharedValue(50);
  const currentY = useSharedValue(50);
  const currentX = useSharedValue(width / 2);

  const animatedProps = useAnimatedProps(() => {
    const h = (height * posY.value) / 100;
    const currentH = (height * currentY.value) / 100;
    return {
      // extend beyond the screenwidth to make this feel more natural.
      d: `
    M-100 ${h}
    C ${currentX.value} ${currentH}, ${currentX.value} ${currentH}, ${
        width + 100
      } ${h}
    L${width + 100} ${height}
    L0 ${height}
    Z
  `,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = posY.value;
      ctx.startX = event.x;
    },
    onActive: (event, ctx) => {
      posY.value = clamp(
        ctx.startY + event.translationY / 50,
        clampMin,
        clampMax
      );
      currentY.value = ctx.startY + event.translationY / 18;
      currentX.value = ctx.startX + event.translationX / 3;
    },
    onEnd: (event, ctx) => {
      currentY.value = withSpring(posY.value, {
        damping: 3,
        stiffness: 400,
      });
      currentX.value = withSpring(width / 2, {
        damping: 10,
        stiffness: 100,
      });
    },
  });

  const topViewStyle = useAnimatedStyle(() => {
    return {
      top: 0,
      height: (height * posY.value) / 100,
      transform: [
        {
          translateY: currentY.value / 2,
        },
      ],
    };
  });

  const bottomViewStyle = useAnimatedStyle(() => {
    return {
      bottom: 0,
      height: height - (height * posY.value) / 100,
      transform: [
        {
          translateY: -currentY.value / 2,
        },
      ],
    };
  });

  const topValue = useDerivedValue(() => {
    return Math.floor(interpolate(posY.value, [clampMin, clampMax], [0, 100]));
  });

  const bottomValue = useDerivedValue(() => {
    return Math.ceil(interpolate(posY.value, [clampMin, clampMax], [100, 0]));
  });

  const topTextStyle = useAnimatedStyle(() => {
    return {
      fontSize: Math.floor(
        interpolate(posY.value, [clampMin, clampMax], [minF, maxF])
      ),
    };
  });

  const bottomTextStyle = useAnimatedStyle(() => {
    return {
      fontSize: Math.floor(
        interpolate(posY.value, [clampMin, clampMax], [maxF, minF])
      ),
    };
  });

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar hidden />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={{ position: "absolute", backgroundColor: "transparent" }}
          >
            <Svg width={width} height={height}>
              <AnimatedPath fill={color} animatedProps={animatedProps} />
            </Svg>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "flex-end",
                  paddingBottom: height * 0.1,
                },
                topViewStyle,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AnimatedText
                  text={topValue}
                  style={[
                    topTextStyle,
                    { fontSize: minF + maxF / 2, marginLeft: 20, color: color },
                  ]}
                />
                <Text
                  style={{
                    color: color,
                    fontSize: 24,
                    marginLeft: 20,
                    textAlign: "center",
                  }}
                >
                  Points you {"\n"} need
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              style={[
                {
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "flex-start",
                  paddingTop: height * 0.1,
                },
                bottomViewStyle,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AnimatedText
                  text={bottomValue}
                  style={[
                    {
                      fontSize: minF + maxF / 2,
                      marginLeft: 20,
                      color: "#FFF",
                    },
                    bottomTextStyle,
                  ]}
                />
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 24,
                    marginLeft: 20,
                    textAlign: "center",
                  }}
                >
                  Points you {"\n"} have
                </Text>
              </View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};
