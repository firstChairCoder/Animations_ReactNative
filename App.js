// /* eslint-disable no-nested-ternary */
// import { BlurView } from "expo-blur";
// import {
//   FlatList,
//   Image,
//   Animated as RNAnimated,
//   StyleSheet,
//   Text,
//   useWindowDimensions,
//   View
// } from "react-native";
// import Animated, {
//   useAnimatedProps,
//   useAnimatedStyle,
//   useDerivedValue,
//   withTiming
// } from "react-native-reanimated";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// //dummy
// import { Grayscale } from "react-native-color-matrix-image-filters";
// import { MotiView } from "moti";
// import { useRef } from "react";

// const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
// const AnimatedGrayscale = Animated.createAnimatedComponent(Grayscale);

// //r-n-color-matrix-image-filters
// // src/components/ContrastScaleListItem.js
// function ContrastScaleListItem({ item, index, viewables }) {
//   const { width } = useWindowDimensions();

//   const blurAnimatedProps = useAnimatedProps(() => {
//     const isVisible = viewables.value.includes(index);
//     return { intensity: withTiming(isVisible ? 0 : 20, { duration: 300 }) };
//   });

//   const style = useAnimatedStyle(() => {
//     const isVisible = viewables.value.includes(index);

//     return {
//       transform: [{ scale: withTiming(isVisible ? 1 : 0.8, { duration: 300 }) }]
//     };
//   }, [viewables]);

//   const grayScaleStyle = useAnimatedStyle(() => {
//     const isVisible = viewables.value.includes(index);
//     return { opacity: withTiming(isVisible ? 0 : 1, { duration: 300 }) };
//   }, [viewables]);

//   return (
//     <>
//       <Animated.View
//         style={[{ flex: 1, gap: 8 }, { maxWidth: (width - 48) / 2 }, style]}
//       >
//         <View
//           style={{ flex: 1, height: 200, borderRadius: 12, overflow: "hidden" }}
//         >
//           <Image style={{ flex: 1 }} source={{ uri: item.url }} />
//           <AnimatedGrayscale
//             style={[{ ...StyleSheet.absoluteFillObject }, grayScaleStyle]}
//             amount={1}
//           >
//             <Image style={{ flex: 1 }} source={{ uri: item.url }} />
//           </AnimatedGrayscale>
//         </View>
//         <Image
//           source={{ uri: item.url }}
//           style={{ flex: 1, height: 200, borderRadius: 12 }}
//         />
//         <Text style={{ fontWeight: "700" }}>{item.title}</Text>
//       </Animated.View>
//       <AnimatedBlurView
//         style={{ ...StyleSheet.absoluteFillObject }}
//         animatedProps={blurAnimatedProps}
//       />
//     </>
//   );
// }

// // src/components/BlurScaleListItem.js
// function BlurScaleListItem({ item, index, viewables }) {
//   const { width } = useWindowDimensions();

//   const blurAnimatedProps = useAnimatedProps(() => {
//     const isVisible = viewables.value.includes(index);
//     return { intensity: withTiming(isVisible ? 0 : 20, { duration: 300 }) };
//   });

//   const style = useAnimatedStyle(() => {
//     const isVisible = viewables.value.includes(index);

//     return {
//       transform: [{ scale: withTiming(isVisible ? 1 : 0.8, { duration: 300 }) }]
//     };
//   }, [viewables]);

//   return (
//     <>
//       <Animated.View
//         style={[{ flex: 1, gap: 8 }, { maxWidth: (width - 48) / 2 }, style]}
//       >
//         <Image
//           source={{ uri: item.url }}
//           style={{ flex: 1, height: 200, borderRadius: 12 }}
//         />
//         <Text style={{ fontWeight: "700" }}>{item.title}</Text>
//       </Animated.View>
//       <AnimatedBlurView
//         style={{ ...StyleSheet.absoluteFillObject }}
//         animatedProps={blurAnimatedProps}
//       />
//     </>
//   );
// }

// //src/components/BlurRotateListItem.js v3

// function BlurRotateListItemV3({ item, index, viewables }) {
//   const { width } = useWindowDimensions();

//   const rotate = viewables.current[index].interpolate({
//     inputRange: [-1, 0, 1],
//     outputRange: [`-15deg`, `0deg`, `15deg`],
//     extrapolate: "clamp"
//   });

//   const rotateX = viewables.current[index].interpolate({
//     inputRange: [-1, 0, 1],
//     outputRange: [`-45deg`, `0deg`, `45deg`],
//     extrapolate: "clamp"
//   });

//   const blurAnimatedProps = useAnimatedProps(() => {
//     const isVisible = viewables.value.includes(index);
//     return { intensity: withTiming(isVisible ? 0 : 20, { duration: 300 }) };
//   });

//   const scale = viewables.current[index].interpolate({
//     inputRange: [-1, 0, 1],
//     outputRange: [0.8, 2, 0.8],
//     extrapolate: "clamp"
//   });

//   return (
//     <>
//       <RNAnimated.View
//         style={[
//           { flex: 1, gap: 8 },
//           { maxWidth: (width - 48) / 2 },
//           {
//             transform: [
//               { perspective: 1000 },
//               { rotate },
//               { rotateX },
//               { scale }
//             ]
//           }
//         ]}
//       >
//         <Image
//           source={{ uri: item.url }}
//           style={{ flex: 1, height: 200, borderRadius: 12 }}
//         />
//         <Text style={{ fontWeight: "700" }}>{item.title}</Text>
//       </RNAnimated.View>
//       <AnimatedBlurView
//         animatedProps={blurAnimatedProps}
//         style={{ ...StyleSheet.absoluteFillObject, zIndex: 1000 }}
//       />
//     </>
//   );
// }

// //src/components/BlurRotateListItem.js v2

// function BlurRotateListItemV2({ item, index, viewables }) {
//   const { width } = useWindowDimensions();

//   const blurAnimatedProps = useAnimatedProps(() => {
//     const isVisible = viewables.value.includes(index);
//     return { intensity: withTiming(isVisible ? 0 : 20, { duration: 300 }) };
//   });

//   const style = useDerivedValue(() => {
//     const isVisible = viewables.value.includes(index);
//     const isAtStart = index < viewables.value[0];

//     return {
//       transform: [
//         { perspective: 1000 },
//         {
//           rotateX: `${isVisible ? 0 : isAtStart ? -45 : 45}deg`
//         },
//         {
//           rotate: `${isVisible ? 0 : isAtStart ? -15 : 15}deg`
//         },
//         { scale: isVisible ? 1 : 0.8 }
//       ]
//     };
//   }, [viewables]);

//   return (
//     <>
//       <MotiView
//         style={[{ flex: 1, gap: 8 }, { maxWidth: (width - 48) / 2 }]}
//         animate={style}
//         transition={{ type: "timing", duration: 300 }}
//       >
//         <Image
//           source={{ uri: item.url }}
//           style={{ flex: 1, height: 200, borderRadius: 12 }}
//         />
//         <Text style={{ fontWeight: "700" }}>{item.title}</Text>
//       </MotiView>
//       <AnimatedBlurView
//         animatedProps={blurAnimatedProps}
//         style={{ ...StyleSheet.absoluteFillObject, zIndex: 1000 }}
//       />
//     </>
//   );
// }

// //src/components/BlurRotateListItem.js

// function BlurRotateListItem({ item, index, viewables }) {
//   const { width } = useWindowDimensions();

//   const blurAnimatedProps = useAnimatedProps(() => {
//     const isVisible = viewables.value.includes(index);
//     return { intensity: withTiming(isVisible ? 0 : 20, { duration: 300 }) };
//   });

//   const style = useAnimatedStyle(() => {
//     const isVisible = viewables.value.includes(index);
//     const isAtStart = index < viewables.value[0];

//     return {
//       transform: [
//         { perspective: 1000 },
//         {
//           rotateX: withTiming(`${isVisible ? 0 : isAtStart ? -45 : 45}deg`, {
//             duration: 300
//           })
//         },
//         {
//           rotate: withTiming(`${isVisible ? 0 : isAtStart ? -15 : 15}deg`, {
//             duration: 300
//           })
//         },
//         { scale: withTiming(isVisible ? 1 : 0.8, { duration: 300 }) }
//       ]
//     };
//   }, [viewables]);

//   return (
//     <>
//       <Animated.View
//         style={[{ flex: 1, gap: 8 }, { maxWidth: (width - 48) / 2 }, style]}
//       >
//         <Image
//           source={{ uri: item.url }}
//           style={{ flex: 1, height: 200, borderRadius: 12 }}
//         />
//         <Text style={{ fontWeight: "700" }}>{item.title}</Text>
//       </Animated.View>
//       <AnimatedBlurView
//         animatedProps={blurAnimatedProps}
//         style={{ ...StyleSheet.absoluteFillObject, zIndex: 1000 }}
//       />
//     </>
//   );
// }

// // src/ListAnimation.js
// const LIST_DATA = [];

// const ListAnimation = (type) => {
//   const insets = useSafeAreaInsets();
//   //bare RN Animation
//   const viewables = useRef(LIST_DATA.map(() => new RNAnimated.Value(0)));

//   //bare RN Animated
//   const onViewableItemsChanged = ({ viewableItems }) => {
//     const viewableIndex = viewableItems.map((item) => item.index);
//     viewables.current.forEach((vi, i) => {
//       const isAtStart = i < viewableIndex[0];

//       RNAnimated.timing(vi, {
//         toValue: viewableIndex.includes(i) ? 0 : isAtStart ? -1 : 1,
//         duration: 300,
//         useNativeDriver: true
//       }).start();
//     });
//   };

//   return (
//     <FlatList
//       contentContainerStyle={{
//         paddingTop: insets.top + 16,
//         paddingBottom: insets.bottom + 16,
//         gap: 16
//       }}
//       numColumns={2}
//       columnWrapperStyle={{ paddingHorizontal: 16, gap: 16 }}
//       data={LIST_DATA}
//       renderItem={({ item, index }) => (
//         <BlurRotateListItem {...{ item, index, viewables }} />
//       )}
//       keyExtractor={(item, i) => `${item.url}_${i}`}
//       //bare RN Animated
//       onViewableItemsChanged={onViewableItemsChanged}
//       viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
//     />
//   );
// };

// export default ListAnimation;

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import Button from "./src/components/Button";
import screens from "./src/data/screensData";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "snow",
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20
  },
  content: {
    paddingBottom: 20,
    paddingLeft: 20
  }
});

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {screens.map(({ name, color, label, disabled = false }, index) => (
        <Button
          key={`~screen` + index}
          onPress={label === "blank" ? true : () => navigation.navigate(name)}
          color={color}
          label={label === "blank" ? " " : label}
          disabled={disabled}
        />
      ))}
    </ScrollView>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // pre-load/cache assets: fonts
        await Font.loadAsync({
          Lobster: require("./assets/fonts/Lobster-Regular.ttf"),
          VolkornCaps: require("./assets/fonts/VollkornSC-Regular.ttf"),
          Volkorn: require("./assets/fonts/Vollkorn-Regular.ttf")
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      const hideSplash = async () => SplashScreen.hideAsync();

      // hide splash screen to show app
      hideSplash();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitle: "",
              headerTransparent: true,
              headerBackTitleVisible: false
            }}
          >
            <Stack.Screen name={"Home"} component={HomeScreen} />
            {screens.map(({ name, component }, index) => (
              <Stack.Screen key={index} {...{ name }} {...{ component }} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
