// //TODO: Convert to display
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Animated,
//   Dimensions,
//   Image,
//   Pressable,
//   StyleSheet,
// } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { Box, Text, UtilityThemeProvider } from "react-native-design-utility";
// import { FlatList } from "react-native-gesture-handler";
// import { LinearGradient } from "expo-linear-gradient";

// import { getData } from "./src/data/api";
// import { theme } from "./theme";
// import Rating from "./src/components/Rating";
// import Genre from "./src/components/Genre";
// import listData from "./src/data/listData";

// const { width, height } = Dimensions.get("window");
// const BACKDROP_HEIGHT = (2 / 3) * height;
// const ITEM_SIZE = width * 0.7;
// const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
// const SPACING = 8;
// const styles = StyleSheet.create({
//   poster: {
//     width: "100%",
//     height: ITEM_SIZE * 1.3,
//     resizeMode: "cover",
//     borderRadius: 24,
//     marginBottom: 8,
//   },
//   backdropContainer: { width, height: BACKDROP_HEIGHT, position: "absolute" },
//   backdropImg: { width, height: BACKDROP_HEIGHT, position: "absolute" },
//   wrapper: {
//     height,
//     position: "absolute",
//     overflow: "hidden",
//   },
//   gradient: {
//     height: BACKDROP_HEIGHT,
//     width,
//     position: "absolute",
//     bottom: -10,
//   },
//   card: {
//     padding: SPACING * 2,
//     alignItems: "center",
//     backgroundColor: "honeydew",
//     borderRadius: 32,
//   },
// });

// const BackDrop = ({ data, scroll }: any) => {
//   return (
//     <Box style={styles.backdropContainer}>
//       <FlatList
//         data={data.reverse()}
//         keyExtractor={(item) => "~item-" + item.key}
//         renderItem={({ item, index }) => {
//           if (!item.backdrop) {
//             return null;
//           }

//           const xInterpolate = scroll.interpolate({
//             inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
//             outputRange: [0, width],
//           });

//           return (
//             <Animated.View style={[styles.wrapper, { width: xInterpolate }]}>
//               <Image
//                 style={styles.backdropImg}
//                 source={{
//                   uri: item.backdrop,
//                 }}
//               />
//             </Animated.View>
//           );
//         }}
//         contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
//         removeClippedSubviews={false}
//       />
//       <LinearGradient
//         colors={["rgba(0, 0, 0, 0.2)", "white"]}
//         style={styles.gradient}
//       />
//     </Box>
//   );
// };

// export default function App() {
//   const [data, setData] = useState<any>([]);
//   const scrollVal = useRef(new Animated.Value(0)).current;
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getData();
//         //empty items
//         setData([{ key: "pad-left" }, ...response, { key: "pad-right" }]);
//         return data;
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     if (data.length === 0) {
//       fetchData();
//     }
//   }, [data]);

//   return (
//     <UtilityThemeProvider theme={theme}>
//       <Box f={1}>
//         <BackDrop data={data} scroll={scrollVal} />
//         <Animated.FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={listData}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item, index }) => {
//             if (!item.description) {
//               return <Box w={EMPTY_ITEM_SIZE} />;
//             }

//             const yInterpolate = scrollVal.interpolate({
//               inputRange: [
//                 (index - 2) * ITEM_SIZE,
//                 (index - 1) * ITEM_SIZE,
//                 index * ITEM_SIZE,
//               ],
//               outputRange: [100, 50, 100],
//               extrapolate: "clamp",
//             });

//             const innerStyle = {
//               transform: [
//                 {
//                   translateY: yInterpolate,
//                 },
//               ],
//             };

//             return (
//               <Pressable onPress={() => true}>
//                 <Box w={ITEM_SIZE}>
//                   <Animated.View style={[styles.card, innerStyle]}>
//                     <Image source={{ uri: item.image }} style={styles.poster} />
//                     <Text size={24} numberOfLines={1}>
//                       {item.title}
//                     </Text>
//                     <Text size={16} numberOfLines={3}>
//                       {item.description}
//                     </Text>
//                     {/* <Rating rating={item.rating} /> */}
//                     <Genre genres={item.categories} />
//                   </Animated.View>
//                 </Box>
//               </Pressable>
//             );
//           }}
//           contentContainerStyle={{ alignItems: "center" }}
//           bounces={false}
//           decelerationRate={0.997}
//           scrollEventThrottle={16}
//           renderToHardwareTextureAndroid
//           snapToAlignment="start"
//           snapToInterval={ITEM_SIZE}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollVal } } }],
//             { useNativeDriver: false }
//           )}
//         />
//       </Box>
//       <StatusBar style="auto" />
//     </UtilityThemeProvider>
//   );
// }

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { Box, Text, UtilityThemeProvider } from "react-native-design-utility";
import { LinearGradient } from "expo-linear-gradient";

import Genre from "./src/components/Genre";
import { getData } from "./src/data/api";
import listData from "./src/data/listData";
import { theme } from "./theme";
import { CoffeeScreen } from "./src/screens/CoffeeScreen";
import { DetailsScreen } from "./src/screens/DetailsScreen";

const { width, height } = Dimensions.get("window");
const BACKDROP_HEIGHT = (5 / 6) * height;
const ITEM_SIZE = width * 0.7;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const SPACING = 8;
const styles = StyleSheet.create({
  poster: {
    width: "100%",
    height: ITEM_SIZE * 1.3,
    resizeMode: "cover",
    borderRadius: 24,
    marginBottom: 8,
  },
  backdropContainer: { width, height: BACKDROP_HEIGHT, position: "absolute" },
  backdropImg: { width, height: BACKDROP_HEIGHT, position: "absolute" },
  wrapper: {
    height,
    position: "absolute",
    overflow: "hidden",
  },
  gradient: {
    height: BACKDROP_HEIGHT,
    width,
    position: "absolute",
    bottom: -10,
    borderRadius: 20,
  },
  card: {
    padding: SPACING * 2,
    alignItems: "center",
    backgroundColor: "honeydew",
    borderRadius: 32,
  },
});

const BackDrop = ({ data, scroll }: any) => {
  return (
    <Box style={styles.backdropContainer}>
      <FlatList
        data={data.reverse()}
        keyExtractor={(item) => "~item-" + item.key}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }

          const xInterpolate = scroll.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
          });

          return (
            <Animated.View style={[styles.wrapper, { width: xInterpolate }]}>
              <Image
                style={styles.backdropImg}
                source={{
                  uri: item.backdrop,
                }}
              />
            </Animated.View>
          );
        }}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        removeClippedSubviews={false}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.2)", "white"]}
        style={styles.gradient}
      />
    </Box>
  );
};

export type StackParams = {
  Home: undefined;
  Coffee: undefined;
  Details: {
    name: string;
  };
  // Parallax;
  // FlingGesture;
  // BasicAnimatedScreen;
};

const Stack = createStackNavigator<StackParams>();

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>([]);
  const padData = [{ id: "pad-left" }, ...listData, { id: "pad-right" }];
  const scrollVal = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        //empty items
        setData([{ key: "pad-left" }, ...response, { key: "pad-right" }]);
        return data;
      } catch (err) {
        console.error(err);
      }
    };

    if (data.length === 0) {
      fetchData();
    }
  }, [data]);

  return (
    <Box f={1}>
      <BackDrop data={data} scroll={scrollVal} />
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={padData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const yInterpolate = scrollVal.interpolate({
            inputRange: [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ],
            outputRange: [100, 50, 100],
            extrapolate: "clamp",
          });

          const innerStyle = {
            transform: [
              {
                translateY: yInterpolate,
              },
            ],
          };

          if (item.id === "pad-left" || item.id === "pad-right") {
            return <Box w={EMPTY_ITEM_SIZE} />;
          }

          return (
            <Pressable onPress={() => navigation.navigate("Coffee")}>
              <Box w={ITEM_SIZE}>
                <Animated.View style={[styles.card, innerStyle]}>
                  <Image source={{ uri: item.image }} style={styles.poster} />
                  <Text size={24} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text size={16} numberOfLines={3}>
                    {item.description}
                  </Text>
                  {/* <Rating rating={item.rating} /> */}
                  <Genre genres={item.categories} />
                </Animated.View>
              </Box>
            </Pressable>
          );
        }}
        contentContainerStyle={{ alignItems: "center" }}
        bounces={false}
        decelerationRate={0.997}
        scrollEventThrottle={16}
        renderToHardwareTextureAndroid
        snapToAlignment="start"
        snapToInterval={ITEM_SIZE}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollVal } } }],
          { useNativeDriver: false }
        )}
      />
    </Box>
  );
};

export default function App() {
  return (
    <UtilityThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={"Home"} component={HomeScreen} />
          <Stack.Screen name={"Coffee"} component={CoffeeScreen} />
          <Stack.Screen name={"Details"} component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UtilityThemeProvider>
  );
}
