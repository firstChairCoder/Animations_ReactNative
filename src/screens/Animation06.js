/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import data from "../mockdata/carouselData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ECF0F1",
  },
});
const { width } = Dimensions.get("window");
const itemWidth = width * 0.6;
const itemHeight = itemWidth * 1.67;
const spacing = 10;
const itemWidthWithSpacing = spacing * 2 + itemWidth;

const Item = ({ scrollX, index, item, activeIndex }) => {
  const currentIndex = useDerivedValue(() => {
    return scrollX.value / itemWidthWithSpacing;
  });

  const inputRange = useMemo(() => [index - 1, index, index + 1]);

  const wrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            currentIndex.value,
            inputRange,
            [itemHeight * 0.1, 0, itemHeight * 0.1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            interpolate(
              currentIndex.value,
              inputRange,
              [itemHeight * 0.8, itemHeight * 0.5, itemHeight * 0.8],
              Extrapolation.CLAMP
            )
          ),
        },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        currentIndex.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            currentIndex.value,
            inputRange,
            [0.2, 1, 0],
            Extrapolation.CLAMP
          ),
        },
        {
          translateY:
            activeIndex.value === currentIndex.value
              ? withRepeat(
                  withTiming(spacing, { duration: 2000 }),
                  Infinity,
                  true
                )
              : withSpring(
                  interpolate(
                    currentIndex.value,
                    inputRange,
                    [spacing * 4, -spacing * 2, spacing * 4],
                    Extrapolation.CLAMP
                  )
                ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        wrapperStyle,
        {
          width: itemWidth,
          height: itemHeight,
          margin: spacing,
          borderRadius: 24,
          overflow: "hidden",
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          padding: spacing,
        }}
      >
        <Animated.View
          style={[
            containerStyle,
            {
              flex: 1,
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              borderRadius: 24,
              backgroundColor: "#FFF",
            },
          ]}
        />
        <View style={{ alignItems: "center" }}>
          <Animated.Image
            style={[
              imageStyle,
              {
                width: itemWidth * 0.7,
                height: itemWidth * 0.7,
                marginBottom: spacing,
              },
            ]}
            source={{ uri: item.icon }}
          />
          <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.name}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export const Animation06 = () => {
  const scrollX = useSharedValue(0);
  const activeIndex = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onMomentumBegin: (ev) => {
      activeIndex.value = -1;
    },
    onMomentumEnd: (ev) => {
      activeIndex.value = Math.floor(ev.contentOffset.x / itemWidthWithSpacing);
    },
    onScroll: (ev) => {
      scrollX.value = ev.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          return (
            <Item
              item={item}
              index={index}
              scrollX={scrollX}
              activeIndex={activeIndex}
            />
          );
        }}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          paddingHorizontal: (width - itemWidthWithSpacing) / 2,
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={itemWidthWithSpacing}
        decelerationRate={"fast"}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

// Inspiration: https://dribbble.com/shots/14749133-Plant-care-mobile-interaction-with-illustrations
