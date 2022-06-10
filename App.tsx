import type { NavigatorScreenParams } from "@react-navigation/native";
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
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Genre from "./src/components/Genre";
import { getData } from "./src/data/api";
import listData from "./src/data/listData";
import { theme } from "./theme";
import { CoffeeScreen } from "./src/screens/CoffeeScreen";
import { DetailsScreen } from "./src/screens/DetailsScreen";
import { ParallaxScreen } from "./src/screens/ParallaxScreen";
import { FlingScreen } from "./src/screens/FlingScreen";
import type { ReactiveNavigationParams } from "./src/navigation/ReactiveStack";
import ReactiveStack from "./src/navigation/ReactiveStack";

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

export type StackCoffeeParams = {
  Coffee: undefined;
  Details: {
    name: string;
  };
  Parallax: undefined;
  Fling: undefined;
};

export type RootNavigatorParams = {
  Home: undefined;
  StackCoffee: NavigatorScreenParams<StackCoffeeParams>;
  StackReactive: NavigatorScreenParams<ReactiveNavigationParams>;
};

const Stack = createStackNavigator<RootNavigatorParams>();
const stackArr = [
  "StackCoffee",
  "StackReactive",
  "StackCoffee",
  "StackCoffee",
  "StackCoffee",
];

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

          // const whichStack = stackArr[index + 1];

          return (
            <Pressable
              onPress={() => {
                if (index === 2) {
                  return navigation.navigate("StackReactive");
                } else {
                  return navigation.navigate("StackCoffee");
                }
              }}
            >
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

const CofStack = createStackNavigator<StackCoffeeParams>();

const CoffeeStack = () => {
  return (
    <CofStack.Navigator screenOptions={{ headerShown: false }}>
      <CofStack.Screen name={"Coffee"} component={CoffeeScreen} />
      <CofStack.Screen name={"Details"} component={DetailsScreen} />
      <CofStack.Screen name={"Parallax"} component={ParallaxScreen} />
      <CofStack.Screen name={"Fling"} component={FlingScreen} />
    </CofStack.Navigator>
  );
};

export default function App() {
  return (
    <UtilityThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={"Home"} component={HomeScreen} />
            <Stack.Screen name={"StackCoffee"} component={CoffeeStack} />
            <Stack.Screen name={"StackReactive"} component={ReactiveStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </UtilityThemeProvider>
  );
}
