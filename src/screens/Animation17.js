/* eslint-disable max-len */
//WIP!
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

const IMG_URL =
  "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80";
const styles = StyleSheet.create({
  img: { height: 300, width: 300 }
});

export const Animation17 = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const savedPosition = useSharedValue({
    x: 0,
    y: 0
  });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onStart(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate(({ translationX, translationY }) => {
      positionX.value = savedPosition.value.x + translationX / scale.value;
      positionY.value = savedPosition.value.y + translationY / scale.value;
    })
    .onStart(() => {
      savedPosition.value = {
        x: positionX.value,
        y: positionY.value
      };
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scale.value !== 1 || positionX.value !== 0 || positionY.value !== 0) {
        scale.value = withSpring(1, {
          overshootClamping: true
        });
        positionX.value = withSpring(0, {
          overshootClamping: true
        });
        positionY.value = withSpring(0, {
          overshootClamping: true
        });
      } else {
        scale.value = withSpring(2, {
          overshootClamping: true
        });
      }
    });

  const composed = Gesture.Simultaneous(
    panGesture,
    Gesture.Simultaneous(pinchGesture, doubleTapGesture)
  );

  const animatedImg = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value
      },
      {
        translateX: positionX.value
      },
      {
        translateY: positionY.value
      }
    ]
  }));

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GestureDetector gesture={composed}>
        <Animated.Image
          style={[styles.img, animatedImg]}
          source={{ uri: IMG_URL }}
        />
      </GestureDetector>
    </View>
  );
};

// import React from "react";
// import {
//   Animated,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// import TabSectionList from "./src/components/TabSectionList";
// import { mockPlaceDetails } from "./src/data/mock-data";
// import DishItem from "./src/components/DishItem";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   coverPhotoContainer: {
//     maxHeight: 225,
//   },
//   coverPhoto: {
//     width: "100%",

//     height: "100%",
//   },
//   tabBar: {
//     position: "absolute",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   tabItem: {
//     borderColor: "#ddd",
//     backgroundColor: "black",
//   },
//   tabText: {
//     padding: 15,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   sectionHeaderText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//     paddingTop: 15,
//     paddingBottom: 15,
//     paddingHorizontal: 10,
//   },
//   divider: {
//     width: "100%",
//     height: 1,
//     backgroundColor: "#ddd",
//   },
//   sectionList: {
//     backgroundColor: "black",
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#121212",
//   },
// });

// export const Animation17 = () => {
//   const [scrollY] = React.useState(new Animated.Value(0));

//   const coverTranslateY = scrollY.interpolate({
//     inputRange: [-4, 0, 10],
//     outputRange: [-2, 0, 3],
//   });

//   const coverScale = scrollY.interpolate({
//     inputRange: [-200, 0],
//     outputRange: [2, 1],
//     extrapolateRight: "clamp",
//   });

//   const tabBarOpacity = scrollY.interpolate({
//     inputRange: [50, 225],
//     outputRange: [0, 1],
//     extrapolate: "clamp",
//   });
//   return (
//     <>
//       <StatusBar barStyle="light-content" />
//       <SafeAreaView style={styles.safeArea}>
//         <TabSectionList
//           style={styles.sectionList}
//           sections={mockPlaceDetails.dishSection || []}
//           keyExtractor={(item) => item.title}
//           stickySectionHeadersEnabled={false}
//           scrollToLocationOffset={5}
//           tabBarStyle={[styles.tabBar, { opacity: tabBarOpacity }]}
//           ItemSeparatorComponent={() => <View style={styles.divider} />}
//           ListHeaderComponent={
//             <>
//               <Animated.View
//                 style={[
//                   styles.coverPhotoContainer,
//                   {
//                     transform: [
//                       {
//                         translateY: coverTranslateY,
//                       },
//                     ],
//                   },
//                 ]}
//               >
//                 {mockPlaceDetails.coverImage && (
//                   <Animated.Image
//                     source={mockPlaceDetails.coverImage}
//                     style={[
//                       styles.coverPhoto,
//                       {
//                         transform: [
//                           {
//                             scale: coverScale,
//                           },
//                         ],
//                       },
//                     ]}
//                   />
//                 )}
//               </Animated.View>
//             </>
//           }
//           renderTab={({ title, isActive }) => {
//             const borderBottomWidth = isActive ? 2 : 0;
//             return (
//               <View style={[styles.tabItem, { borderBottomWidth }]}>
//                 <Text
//                   style={[
//                     styles.tabText,
//                     { color: isActive ? "#FC6A57" : "white" },
//                   ]}
//                 >
//                   {title}
//                 </Text>
//               </View>
//             );
//           }}
//           renderSectionHeader={({ section }) => (
//             <Text style={styles.sectionHeaderText}>{section.title}</Text>
//           )}
//           renderItem={({ item }) => {
//             return <DishItem data={item} />;
//           }}
//           onScroll={Animated.event(
//             [
//               {
//                 nativeEvent: {
//                   contentOffset: {
//                     y: scrollY,
//                   },
//                 },
//               },
//             ],
//             {
//               useNativeDriver: true,
//             }
//           )}
//         />
//       </SafeAreaView>
//     </>
//   );
// };
