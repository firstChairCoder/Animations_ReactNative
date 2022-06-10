/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
// /* eslint-disable react-native/no-inline-styles */
// import React from "react";
// import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedProps,
//   useAnimatedStyle,
//   useSharedValue,
// } from "react-native-reanimated";
// import { SafeAreaView } from "react-native-safe-area-context";

// import AnimatedPenguin from "../components/AnimatePenguin";

// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
// const { width, height } = Dimensions.get("window");
// const SCALER = 35;
// const MARGIN = 10;
// const SLIDE_HEIGHT = 15;
// const SLIDE_SIZE = 60;
// const SLIDE_WIDTH = width - SLIDE_SIZE - 2 * MARGIN - SCALER;
// const SLIDE_CONT = SLIDE_WIDTH + SLIDE_SIZE;
// const styles = StyleSheet.create({
//   slide: {
//     left: SLIDE_SIZE / 2,
//     backgroundColor: "#FFF",
//     height: SLIDE_HEIGHT,
//     borderRadius: SLIDE_HEIGHT / 2,
//   },
//   slideBg: {
//     backgroundColor: "#2574DE",
//     borderRadius: SLIDE_HEIGHT / 2,
//     left: SLIDE_HEIGHT / 2,
//   },
//   fixedBorder: {
//     height: SLIDE_HEIGHT,
//     width: SLIDE_HEIGHT,
//     backgroundColor: "#2574DE",
//     borderTopLeftRadius: SLIDE_HEIGHT / 2,
//     borderBottomLeftRadius: SLIDE_HEIGHT / 2,
//   },
//   slideWrapper: {
//     justifyContent: "center",
//     height: SLIDE_SIZE,
//   },
//   scaleWrapper: { flexDirection: "row" },
//   input: {
//     width: SCALER,
//     backgroundColor: "linen",
//     height: SCALER,
//     alignSelf: "center",
//     borderRadius: SCALER / 2,
//     textAlign: "center",
//     color: "#2574DE",
//   },
// });

// //Percentage Parser Helper Fn.
// const percentageParser = (current, total) => {
//   "worklet";
//   return `${Math.round((current * 100) / total)}`;
// };

// export const Animation19 = () => {
//   const startPositionX = useSharedValue(0);
//   const x = useSharedValue(0);
//   const penguinPressed = useSharedValue(false);

//   const animatedScale = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateX: -(SLIDE_WIDTH / 2),
//       },
//       {
//         scaleX: interpolate(
//           x.value,
//           [0, SLIDE_WIDTH],
//           [0, 1],
//           Extrapolate.CLAMP
//         ),
//       },
//       {
//         translateX: SLIDE_WIDTH / 2,
//       },
//     ],
//   }));

//   const panGesture = Gesture.Pan()
//     .minDistance(0)
//     .minVelocity(0)
//     .maxPointers(1)
//     .onStart(() => {
//       startPositionX.value = x.value;
//       penguinPressed.value = true;
//     })
//     .onUpdate(({ state, translationX }) => {
//       x.value = Math.min(
//         Math.max(startPositionX.value + translationX, 0),
//         SLIDE_WIDTH
//       );
//     })
//     .onEnd(() => {
//       penguinPressed.value = false;
//     });

//   const animatedSlide = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateX: x.value,
//       },
//       {
//         rotate: `${interpolate(x.value, [0, SLIDE_WIDTH], [0, 720])}deg`,
//       },
//     ],
//   }));

//   const animatedProps = useAnimatedProps(() => {
//     return { text: percentageParser(x.value, SLIDE_WIDTH) };
//   });

//   return (
//     <SafeAreaView
//       mode="margin"
//       style={{ flex: 1, marginTop: 80, paddingHorizontal: 8 }}
//     >
//       <>
//         <View style={styles.scaleWrapper}>
//           <View style={[styles.slideWrapper, { width: SLIDE_CONT }]}>
//             <View style={[styles.slide, { width: SLIDE_WIDTH }]}>
//               <Animated.View
//                 style={[
//                   StyleSheet.absoluteFill,
//                   styles.slideBg,
//                   { width: SLIDE_WIDTH - SLIDE_HEIGHT / 2 },
//                   animatedScale,
//                 ]}
//               />
//               <View style={[StyleSheet.absoluteFill, styles.fixedBorder]} />
//             </View>
//             <Animated.View style={[{ position: "absolute" }, animatedSlide]}>
//               <GestureDetector gesture={panGesture}>
//                 <AnimatedPenguin
//                   size={SLIDE_SIZE}
//                   penguinPressed={penguinPressed}
//                 />
//               </GestureDetector>
//             </Animated.View>
//           </View>

//           <AnimatedTextInput
//             editable={false}
//             style={styles.input}
//             value={`${percentageParser(x.value, SLIDE_WIDTH)}`}
//             // @ts-ignore
//             animatedProps={animatedProps}
//           />
//         </View>
//       </>
//     </SafeAreaView>
//   );
// };

import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  Extrapolate,
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
          Extrapolate.CLAMP
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
    .onUpdate(({ state, translationX }) => {
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
