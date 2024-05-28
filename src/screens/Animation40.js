// /* eslint-disable react-native/no-inline-styles */
// //Inspo: https://dribbble.com/shots/6555779-Menu-Transition
// //this is because we would like to have this container + the menucontainer on the same zIndex so they'll both be visible when themenu is visible.        //
// import { Feather } from "@expo/vector-icons";
// import { MotiScrollView, MotiText, MotiView } from "@motify/components";
// import { useDynamicAnimation } from "@motify/core";
// import { faker } from "@faker-js/faker";
// import { AnimatePresence } from "framer-motion";
// import * as React from "react";
// import {
//   Dimensions,
//   Pressable,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { Easing } from "react-native-reanimated";

// const { width, height } = Dimensions.get("screen");
// const color = "#1E37FE";
// const headerHeight = 64;
// const spacing = 20;

// const menu = ["About", "Work", "Philosophy", "Services", "Contact"];
// const colors = ["papayawhip", "coral", "fuchsia", "gold", "#17161a"];

// faker.seed(10);
// export const Animation40 = () => {
//   const [state, setState] = React.useState("closed");
//   const [selectedItem, setSelectedItem] = React.useState(menu[0]);
//   const sentences = React.useMemo(() => {
//     return [...Array(5).keys()].map(() => faker.lorem.paragraph(1));
//   }, []);

//   const animated = useDynamicAnimation(() => ({
//     transform: [{ translateX: width }, { translateY: 0 }],
//   }));

//   React.useEffect(() => {
//     switch (state) {
//       default:
//       case "opened":
//         animated.animateTo({
//           transform: [{ translateX: 0 }, { translateY: 0 }],
//         });
//         break;
//       case "closed":
//         animated.animateTo({
//           transform: [{ translateX: width }, { translateY: 0 }],
//         });
//         break;
//       case "closed-top":
//         animated.animateTo({
//           transform: [{ translateX: 0 }, { translateY: -height }],
//         });
//         break;
//     }
//   }, [state]);

//   const isVisible = state === "opened";
//   return (
//     <View style={{ flex: 1 }}>
//       <StatusBar hidden />
//       <View
//         style={{
//           paddingTop: 42,
//           height: headerHeight + 42,
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingLeft: spacing,
//           flexDirection: "row",
//           zIndex: 2,
//           backgroundColor: "rgba(0,0,0,.03)",
//         }}
//       >
//         <MotiText
//           animate={{ color: isVisible ? "#fff" : "#000" }}
//           transition={{ delay: 500 }}
//           style={{ fontSize: 20, letterSpacing: 3, opacity: 0.8 }}
//         >
//           Batman Codes
//         </MotiText>
//         <Pressable
//           onPress={() => {
//             // eslint-disable-next-line no-shadow
//             setState((state) => (state === "opened" ? "closed" : "opened"));
//           }}
//         >
//           <View
//             style={{
//               height: headerHeight,
//               width: headerHeight,
//               letterSpacing: 20,
//               textTransform: "uppercase",
//               marginBottom: spacing * 2,
//             }}
//           >
//             <AnimatePresence>
//               {!isVisible ? (
//                 <MotiView
//                   from={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   key="closed"
//                   style={{ position: "absolute" }}
//                   transition={{ type: "timing", delay: 500 }}
//                 >
//                   <Feather name="menu" size={24} color="#000" />
//                 </MotiView>
//               ) : (
//                 <MotiView
//                   from={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   key="opened"
//                   style={{
//                     position: "absolute",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                   transition={{ type: "timing", delay: 500 }}
//                 >
//                   <Feather name="x" size={24} color="#fff" />
//                 </MotiView>
//               )}
//             </AnimatePresence>
//           </View>
//         </Pressable>
//       </View>

//       <MotiScrollView contentContainerStyle={{ padding: spacing }}>
//         <AnimatePresence>
//           {menu.map((m, i) => {
//             return (
//               m === selectedItem && (
//                 <MotiView key={m}>
//                   <Text
//                     numberOfLines={1}
//                     adjustFontSizeToFit
//                     style={{
//                       fontSize: 24,
//                       fontWeight: "800",
//                       letterSpacing: 20,
//                       textTransform: "uppercase",
//                       marginBottom: spacing * 2,
//                     }}
//                   >
//                     {selectedItem}
//                   </Text>
//                   {sentences.map((sentence, index) => {
//                     return (
//                       <Text
//                         key={`sentence-${index}`}
//                         style={{
//                           marginBottom: spacing,
//                           lineHeight: 24,
//                           letterSpacing: 0.5,
//                           opacity: 0.7,
//                         }}
//                       >
//                         {sentences}
//                       </Text>
//                     );
//                   })}
//                 </MotiView>
//               )
//             );
//           })}
//         </AnimatePresence>
//       </MotiScrollView>
//       <MotiView
//         state={animated}
//         animateInitialState={false}
//         onDidAnimate={(_, finished, value) => {
//           const yValue = animated.current?.transform?.filter((v) =>
//             v.hasOwnProperty("translateY")
//           )[0].translateY;

//           if (yValue === -height && finished) {
//             // Reset to the initial position in case when the user
//             // pressed on the button.

//             // Initial open -> close is just modifying the translateX
//             // When the user is pressing on a menu item we would like to
//             // translate on the Y-axis and after this is finished,
//             // reset the values so it will always start from the closed state
//             // but we don't want to animate this changes so that's why there's a
//             // duration: 1 to make it instant.
//             // setState('closed')
//             animated.animateTo({
//               transform: [
//                 {
//                   translateX: [
//                     { value: width, duration: 1, type: "timing" },
//                     { value: width, duration: 1, type: "timing" },
//                   ],
//                 },
//                 {
//                   translateY: [
//                     { value: 0, duration: 1, type: "timing" },
//                     { value: 0, duration: 1, type: "timing" },
//                   ],
//                 },
//               ],
//             });
//           }
//         }}
//         transition={{
//           type: "timing",
//           duration:
//             animated.current?.transform?.filter((v) =>
//               v.hasOwnProperty("translateY")
//             )[0].translateY === -height
//               ? 1
//               : 1000,
//           easing: Easing.bezier(0.85, 0, 0.15, 1),
//         }}
//         style={[
//           StyleSheet.absoluteFillObject,
//           {
//             backgroundColor: color,
//             paddingVertical: Math.max(headerHeight + spacing, height / 4),
//             flex: 1,
//             paddingHorizontal: spacing,
//             justifyContent: "center",
//           },
//         ]}
//       >
//         <MotiView
//           animate={{ opacity: isVisible ? 1 : 0 }}
//           transition={{ delay: isVisible ? 500 : 0, type: "timing" }}
//           style={{ flex: 1, justifyContent: "space-evenly" }}
//         >
//           {menu.map((item) => {
//             return (
//               <Pressable
//                 key={item}
//                 onPress={() => {
//                   setState("closed-top");
//                   setSelectedItem(item);
//                 }}
//               >
//                 <MotiText style={{ color: "#fff", fontSize: 42 }}>
//                   {item}
//                 </MotiText>
//               </Pressable>
//             );
//           })}
//         </MotiView>
//       </MotiView>
//     </View>
//   );
// };


import { View } from "react-native"

export const Animation40 = () => {
  return <View style={{ flex: 1, backgroundColor: "lime" }} />
}