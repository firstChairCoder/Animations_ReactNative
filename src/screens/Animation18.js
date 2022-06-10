/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { interpolate } from "popmotion";

import { channels } from "../mockdata/channelsData";
import ChannelItem from "../components/ChannelItem";

const { height } = Dimensions.get("window");
const imageBigHeight = Math.round(height * 0.7);
const styles = StyleSheet.create({
  footerWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
  },
  footer: { color: "white", textAlign: "center" },
});

export const Animation18 = () => {
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  //   const animatedFooterOpacity = useDerivedValue(() =>
  //     interpolate(
  //       scrollY.value,
  //       [
  //         (channels.length - 2) * imageBigHeight,
  //         (channels.length - 1) * imageBigHeight,
  //       ],
  //       [0, 1],
  //       Extrapolate.CLAMP
  //     )
  //   );

  //   const animatedFooterStyle = useAnimatedStyle(() => ({
  //     opacity: animatedFooterOpacity.value,
  //   }));

  return (
    <SafeAreaView mode="margin" style={{ flex: 1, backgroundColor: "#444" }}>
      <Animated.FlatList
        data={channels}
        keyExtractor={(item) => item.path}
        renderItem={({ item: { path, credit }, index }) => (
          <ChannelItem
            key={index}
            index={index}
            credit={credit}
            path={path}
            scrollY={scrollY}
          />
        )}
        contentContainerStyle={{
          height: (channels.length - 1) * imageBigHeight + (height - top),
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={imageBigHeight}
        decelerationRate={"fast"}
      />

      <View
        style={[
          styles.footerWrapper,
          { height: height - imageBigHeight - top },
        ]}
      >
        <Animated.Text style={[styles.footer]}>The End</Animated.Text>
      </View>
    </SafeAreaView>
  );
};
