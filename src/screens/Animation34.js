// //WIP!
// /* eslint-disable react-native/no-inline-styles */
// import { useRef } from "react";
// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { State, TapGestureHandler } from "react-native-gesture-handler";
// import Animated, {
//   cond,
//   eq,
//   interpolate,
//   set,
//   SpringUtils,
//   useCode,
// } from "react-native-reanimated";
// import {
//   onGestureEvent,
//   withSpringTransition,
//   withTimingTransition,
// } from "react-native-redash/lib/module/v1";

// import {
//   AnimatedPlaceholder,
//   HeaderBackArrow,
//   Logo,
//   OverlayBg,
// } from "../components/Logins";

// const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// const LOGIN_VIEW_HEIGHT = 150 + 70 //static value

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#2289d6",
//   },
//   logoContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   heading: {
//     alignItems: "flex-start",
//     marginHorizontal: 25,
//     marginTop: 50,
//   },
//   image: {
//     height: 24,
//     width: 24,
//     resizeMode: "contain",
//   },
//   prefix: {
//     fontSize: 20,
//     paddingHorizontal: 10,
//   },
//   textInput: {
//     flex: 1,
//     fontSize: 20,
//   },
//   textInputContainer: {
//     flexDirection: "row",
//     margin: 25,
//   },
// });

// export const Animation34 = () => {
//   const scale = useRef(new Animated.Value(0));
//   const scaleAnimation = withTimingTransition(scale.current);

//   const innerLoginY = interpolate(scaleAnimation, {
//     inputRange: [0, 1],
//     outputRange: [LOGIN_VIEW_HEIGHT, 0],
//   });

//   const gestureState = useRef(new Animated.Value(State.UNDETERMINED));
//   const gestureHandler = onGestureEvent({ state: gestureState.current });

//   const backArrowGestureState = useRef(new Animated.Value(State.UNDETERMINED));
//   const backArrowGestureHandler = onGestureEvent({
//     state: backArrowGestureState.current,
//   });

//   const isOpen = useRef(new Animated.Value(0));
//   const isOpenAnimation = withSpringTransition(isOpen.current, {
//     ...SpringUtils.makeDefaultConfig(),
//     overshootClamping: true,
//     damping: new Animated.Value(20),
//   });

//   const outerLoginY = interpolate(isOpenAnimation, {
//     inputRange: [0, 1],
//     outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, LOGIN_VIEW_HEIGHT / 2],
//   });

//   const headingOpacity = interpolate(isOpenAnimation, {
//     inputRange: [0, 1],
//     outputRange: [1, 0],
//   });

//   useCode(() =>
//     cond(
//       eq(gestureState.current, State.END),
//       [cond(eq(isOpen.current, 0), set(isOpen.current, 1))],
//       [gestureState.current]
//     )
//   );
//   useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

//   useCode(
//     () =>
//       cond(eq(backArrowGestureState.current, State.END), [
//         set(gestureState.current, State.UNDETERMINED),
//         set(isOpen.current, 0),
//       ]),
//     [backArrowGestureState.current]
//   );

//   return (
//     <View style={styles.container}>
//       <View style={{ ...styles.logoContainer }}>
//         <Logo scale={scaleAnimation} />
//       </View>
//       <HeaderBackArrow
//         isOpenAnimation={isOpenAnimation}
//         gestureHandler={{ ...backArrowGestureHandler }}
//       />

//       <Animated.View
//         style={{
//           backgroundColor: "white",
//           ...StyleSheet.absoluteFill,
//           transform: [{ translateY: outerLoginY }],
//         }}
//       >
//         <OverlayBg isOpenAnimation={isOpenAnimation} />
//         <Animated.View>
//           <Animated.View
//             style={{
//               height: LOGIN_VIEW_HEIGHT,

//               backgroundColor: "white",

//               transform: [{ translateY: innerLoginY }],
//             }}
//           >
//             <Animated.View
//               style={{ ...styles.heading, opacity: headingOpacity }}
//             >
//               <Text style={{ fontSize: 24 }}>Get moving with Uber</Text>
//             </Animated.View>

//             <TapGestureHandler {...gestureHandler}>
//               <Animated.View>
//                 <Animated.View
//                   pointerEvents="none"
//                   style={{ ...styles.textInputContainer }}
//                 >
//                   <AnimatedPlaceholder isOpenAnimation={isOpenAnimation} />
//                   <Image
//                     source={require("../../assets/images/india.png")}
//                     style={{ ...styles.image }}
//                   />
//                   <Text style={{ ...styles.prefix }}>+91</Text>
//                   <TextInput
//                     keyboardType="number-pad"
//                     style={{ ...styles.textInput }}
//                     placeholder="Enter your mobile number"
//                   />
//                 </Animated.View>
//               </Animated.View>
//             </TapGestureHandler>
//           </Animated.View>
//         </Animated.View>
//       </Animated.View>
//     </View>
//   );
// };

import { View } from "react-native";
export const Animation34 = () => {
  return <View style={{ flex: 1, backgroundColor: "lemonchiffon" }} />;
};
