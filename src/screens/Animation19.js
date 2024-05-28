import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  TextInput,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedPenguin from "../components/AnimatePenguin";
import percentageParser from "../data/percentageParser";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const sliderSize = 60;
const slideHeight = 15;
const margin = 10;
const scaleMonitor = 35;
const primaryBlue = "#94C0F4";
const secondaryBlue = "#2574DE";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: primaryBlue,
    paddingHorizontal: margin,
    flex: 1,
  },
  scaleMonitor: {
    width: scaleMonitor,
    backgroundColor: "white",
    height: scaleMonitor,
    alignSelf: "center",
    borderRadius: scaleMonitor / 2,
    textAlign: "center",
    color: secondaryBlue,
  },
  fixedBorder: {
    height: slideHeight,
    width: slideHeight,
    backgroundColor: secondaryBlue,
    borderTopLeftRadius: slideHeight / 2,
    borderBottomLeftRadius: slideHeight / 2,
  },
  slide: {
    left: sliderSize / 2,
    height: slideHeight,
    backgroundColor: "white",
    borderRadius: slideHeight / 2,
  },
  slideBackground: {
    backgroundColor: secondaryBlue,
    borderRadius: slideHeight / 2,
    left: slideHeight / 2,
  },
  slideWithSlideContainer: {
    height: sliderSize,
    justifyContent: "center",
  },
  slideWithScaleContainer: { flexDirection: "row" },
});

export const Animation19 = () => {
  const { width } = useWindowDimensions();
  const slideWidth = width - sliderSize - 2 * margin - scaleMonitor;
  const sliderWithSlideContainer = slideWidth + sliderSize;

  const startPositionX = useSharedValue(0);
  const x = useSharedValue(0);
  const penguinPressed = useSharedValue(false);

  const animatedSliding = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { rotate: `${interpolate(x.value, [0, slideWidth], [0, 720])}deg` },
    ],
  }));
  const animatedScale = useAnimatedStyle(() => ({
    transform: [
      { translateX: -(slideWidth / 2) },
      {
        scaleX: interpolate(
          x.value,
          [0, slideWidth],
          [0, 1],
          Extrapolation.CLAMP
        ),
      },
      { translateX: slideWidth / 2 },
    ],
  }));
  const animatedProps = useAnimatedProps(() => {
    return { text: percentageParser(x.value, slideWidth) };
  });

  const panGesture = Gesture.Pan()
    .minDistance(0)
    .minVelocity(0)
    .maxPointers(1)
    .onStart(() => {
      startPositionX.value = x.value;
      penguinPressed.value = true;
    })
    .onUpdate(({ _, translationX }) => {
      x.value = Math.min(
        Math.max(startPositionX.value + translationX, 0),
        slideWidth
      );
    })
    .onEnd(() => {
      penguinPressed.value = false;
    });

  return (
    <SafeAreaView mode="margin" style={styles.container}>
      <View>
        <View style={styles.slideWithScaleContainer}>
          <View
            style={[
              styles.slideWithSlideContainer,
              {
                width: sliderWithSlideContainer,
              },
            ]}
          >
            <View
              style={[
                styles.slide,
                {
                  width: slideWidth,
                },
              ]}
            >
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  animatedScale,
                  styles.slideBackground,
                  {
                    width: slideWidth - slideHeight / 2,
                  },
                ]}
              />
              <Animated.View
                style={[StyleSheet.absoluteFill, styles.fixedBorder]}
              />
            </View>
            <Animated.View
              style={[
                {
                  position: "absolute",
                },
                animatedSliding,
              ]}
            >
              {/* @ts-ignore */}
              <GestureDetector gesture={panGesture}>
                <AnimatedPenguin
                  size={sliderSize}
                  penguinPressed={penguinPressed}
                />
              </GestureDetector>
            </Animated.View>
          </View>
          <AnimatedTextInput
            editable={false}
            style={styles.scaleMonitor}
            value={`${percentageParser(x.value, slideWidth)}`}
            // @ts-ignore
            animatedProps={animatedProps}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};


