// /* eslint-disable react-native/no-inline-styles */
// import React from "react";
// import { Image, StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { BlurView } from "expo-blur";
// import Animated, {
//   SensorType,
//   useAnimatedSensor,
//   useAnimatedStyle,
// } from "react-native-reanimated";

// const BORDER_RADIUS = 20;
// const INTENSITY = 30;
// const CARD_WIDTH = 230;
// const CARD_HEIGHT = 380;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   imageStyle: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     borderRadius: BORDER_RADIUS,
//   },
//   animatedViewStyle: {
//     width: CARD_WIDTH + 20,
//     height: CARD_HEIGHT + 20,
//     borderRadius: BORDER_RADIUS,
//     overflow: "hidden",
//     position: "absolute",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export const Animation29 = () => {
//   const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
//     interval: 100,
//   });

//   const style = useAnimatedStyle(() => {
//     const { pitch, yaw } = animatedSensor.sensor.value;

//     let yawValue =
//       30 * (yaw < 0 ? 2.5 * Number(yaw.toFixed(2)) : Number(yaw.toFixed(2)));
//     let pitchValue = 36 * pitch.toFixed(2);

//     return {
//       transform: [{ translateX: pitchValue }, { translateY: yawValue }],
//     };
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <Image
//         style={styles.imageStyle}
//         source={require("../../assets/images/blur_card.png")}
//       />
//       <BlurView intensity={INTENSITY} style={StyleSheet.absoluteFill} />

//       <Animated.View style={[styles.animatedViewStyle, style]}>
//         <Image
//           style={{ flex: 1 }}
//           source={require("../../assets/images/blur_card.png")}
//         />
//       </Animated.View>
//     </SafeAreaView>
//   );
// };

import React from "react";
import { View } from "react-native";
export const Animation29 = () => {
  return <View style={{ flex: 1, backgroundColor: "lemonchiffon" }} />;
};
