/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Inspiration:https://dribbble.com/shots/12294992-Beats-Concept-App
import * as React from "react";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { motify, MotiView } from "moti";
import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInRight,
  FadeOut,
  Keyframe,
  Layout,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const { height } = Dimensions.get("window");
const spacing = 20;
const duration = 500;
const logoSize = 48;
const imageSize = height * 0.6;
const keyFrame = new Keyframe({
  0: { transform: [{ translateX: 0 }], opacity: 1 },
  100: { transform: [{ translateX: -imageSize }], opacity: 0 },
});
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedPath = motify(Path)();
const transition = { type: "timing", duration: duration };
const data = [
  {
    color: "Shadow Grey",
    imageUri:
      "https://user-images.githubusercontent.com/2805320/151819516-7dbcf10e-4fb0-4eda-bddb-e101794643ef.png",
    text: "#E2C489",
    bg: "#585A5A",
  },

  {
    color: "Red",
    imageUri:
      "https://user-images.githubusercontent.com/2805320/151819530-f68f6e3e-5673-4cc6-8347-4cd17dccc38a.png",
    bg: "#BA2C37",
    text: "#FEFEFF",
  },
  {
    color: "Matte Black",
    imageUri:
      "https://user-images.githubusercontent.com/2805320/151819537-58398ed6-e01d-470f-80f1-a2a1e6da91e5.png",
    bg: "#49494A",
    text: "#FEFEFF",
  },
  {
    color: "White",
    imageUri:
      "https://user-images.githubusercontent.com/2805320/151819541-6833ed61-8973-4030-a9cc-74516f5a95c9.png",
    text: "#A29087",
    bg: "#E4DED9",
  },
  {
    color: "Black & Red",
    imageUri:
      "https://user-images.githubusercontent.com/2805320/151819535-f595047c-7baf-416a-a6e3-34ca2e183432.png",
    // text: 'rgb(226,92,75)'
    text: "#FEFEFF",
    bg: "#D92F45",
  },
  {
    color: "Midnight Black",
    imageUri:
      "https://user-images.githubusercontent.com/2805320/151819525-8de91cd3-c513-410d-9ec8-4481d1f816e3.png",
    text: "#E2C489",
    bg: "#49494A",
  },
  {
    color: "Blue",
    imageUri:
      "https://user-images.githubusercontent.com/2805320/151819542-56900434-9278-417d-a610-01b0e7f6b941.png",
    bg: "#414F6B",
    text: "#E5C2B0",
  },
];

const description = [
  {
    title: "Form factor",
    value: "Over ear",
  },
  {
    title: "Connection",
    value: "Wireless",
  },
  {
    title: "Power source",
    value: "Battery",
  },
];

const BeatsLogoSvg = React.memo(({ color, size = 100, ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 802 802`}
      xmlSpace="preserve"
      {...props}
    >
      <AnimatedPath
        d="M522.932 400.982c0-67.342-54.582-121.93-121.922-121.93-67.342 0-121.93 54.588-121.93 121.93 0 67.34 54.588 121.93 121.93 121.93 67.34 0 121.922-54.59 121.922-121.93"
        animate={{
          fill: color,
        }}
        transition={transition}
        style={{
          fill: color ?? "#ed1c24",
          fillOpacity: 1,
          fillRule: "nonzero",
          stroke: "none",
        }}
      />
      <AnimatedPath
        d="M401.018.967c-38.11 0-74.923 5.442-109.841 15.397v216.222c31.58-20.638 69.288-32.68 109.833-32.68 111.044 0 201.072 90.024 201.072 201.076 0 111.051-90.028 201.077-201.072 201.077-111.051 0-201.08-90.026-201.08-201.077 0-3.572.102-7.12.282-10.649l-.281.223V55.24C80.994 124.565 1 253.392 1 400.98 1 621.904 180.097 801 401.018 801 621.936 801 801 621.903 801 400.982 801 180.064 621.936.967 401.018.967"
        animate={{
          fill: color,
        }}
        transition={transition}
        style={{
          fill: color ?? "#ed1c24",
          fillOpacity: 1,
          fillRule: "nonzero",
          stroke: "none",
        }}
      />
    </Svg>
  );
});

export const Animation43 = () => {
  const [index, setIndex] = React.useState(0);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  const activeItem = data[index];
  const nextActiveItem = data[(index + 1) % data.length];

  return (
    <MotiView
      style={{
        flex: 1,
        padding: spacing,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: activeItem.bg, zIndex: -1 },
        ]}
        key={`bg-${index}`}
        entering={FadeIn.duration(duration)}
        exiting={FadeOut.delay(duration / 2).duration(duration)}
      />
      <BeatsLogoSvg size={logoSize} color={activeItem.text ?? "#fefeff"} />

      <Animated.Image
        source={{ uri: activeItem.imageUri }}
        style={{
          width: imageSize,
          height: imageSize,
          position: "absolute",
          right: -imageSize * 0.4,
          top: Constants.statusBarHeight + spacing,
        }}
        resizeMode="contain"
        key={`image-${index}`}
        exiting={keyFrame}
        entering={SlideInRight.duration(duration)}
      />

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <>
          <Animated.View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AnimatedPressable
              key={activeItem.color}
              exiting={SlideOutLeft}
              layout={Layout.duration(duration)}
              entering={FadeInRight.duration(duration)}
            >
              <Text
                style={[
                  { color: activeItem.text ?? "#fefeff", fontSize: 22 },
                  { fontFamily: "Inter_500Medium" },
                ]}
              >
                {activeItem.color}
              </Text>
            </AnimatedPressable>
            <AnimatedPressable
              key={nextActiveItem.color}
              style={{ opacity: 0.3 }}
              layout={Layout.duration(duration)}
              exiting={SlideOutLeft}
              entering={SlideInRight.duration(duration)}
              onPress={() => setIndex((index) => (index + 1) % data.length)}
            >
              <Text
                style={[
                  { color: activeItem.text ?? "#fefeff", fontSize: 22 },
                  { fontFamily: "Inter_500Medium" },
                ]}
              >
                {nextActiveItem.color}
              </Text>
            </AnimatedPressable>
          </Animated.View>
          <Animated.Text
            style={[
              {
                color: activeItem.text ?? "#fefeff",
                fontSize: 72,
                textTransform: "uppercase",
                letterSpacing: -1,
              },
              { fontFamily: "Inter_900Black" },
            ]}
          >
            Beats
          </Animated.Text>
        </>
        <Animated.View
          style={{ justifyContent: "space-evenly", marginBottom: spacing }}
          key={`details-${index}`}
          exiting={FadeOut.duration(duration)}
          entering={FadeIn.duration(duration)}
        >
          {description.map((description, index) => (
            <View style={{ marginBottom: spacing * 2 }} key={index}>
              <Text
                style={{
                  color: activeItem.text ?? "#fefeff",
                  opacity: 0.5,
                  fontSize: 18,
                  marginBottom: spacing * 4,
                  fontFamily: "Inter_400Regular",
                }}
              >
                {description.title}
              </Text>
              <Text
                style={{
                  color: activeItem.text ?? "#feffef",
                  opacity: 1,
                  fontSize: 18,
                  fontFamily: "Inter_600SemiBold",
                }}
              >
                {description.value}
              </Text>
            </View>
          ))}
        </Animated.View>
      </View>

      <Pressable
        onPress={() => true}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: spacing,
          marginVertical: spacing,
          borderRadius: 12,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign
            name="apple1"
            size={16}
            color="#fff"
            style={{ marginRight: spacing / 2 }}
          />
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: "Inter_400Regular",
            }}
          >
            Add to bag
          </Text>
        </View>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
          $299.95
        </Text>
      </Pressable>
    </MotiView>
  );
};
