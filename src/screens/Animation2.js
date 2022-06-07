import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import faker from "faker";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { FlingGestureHandler, Directions } from "react-native-gesture-handler";
import stickers from "../mockdata/stickersData";

const { width, height } = Dimensions.get("window");
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const SCALE_FACTOR = 0.2;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "contain",
  },
});

faker.seed(1);
const data = stickers.map((image) => {
  return {
    key: faker.datatype.uuid(),
    image,
    name: faker.commerce.product(),
  };
});

const Item = ({ item, index, scrollY }) => {
  const v = useDerivedValue(() => {
    return (scrollY.value / ITEM_HEIGHT) * 2;
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            v.value,
            [index - 1, index, index + 1, index + 2],
            [3, 1, 1 - SCALE_FACTOR, 1 - SCALE_FACTOR * 2]
          ),
        },
      ],
      opacity: interpolate(
        v.value,
        [index - 1, index, index + 1, index + 2],
        [0, 1, 0.85, 0.7]
      ),
    };
  });
  return (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={[{ justifyContent: "center", alignItems: "center" }, style]}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
    </Animated.View>
  );
};

export const Animation2 = () => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((ev) => {
    scrollY.value = ev.contentOffset.y;
  });
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlingGestureHandler direction={Directions.DOWN}>
        <FlingGestureHandler direction={Directions.UP}>
          <AnimatedFlatList
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={(props) => {
              return <Item {...props} scrollY={scrollY} />;
            }}
            decelerationRate={"fast"}
            scrollEventThrottle={16}
            snapToInterval={ITEM_HEIGHT / 2}
            snapToEnd
            onScroll={onScroll}
            contentContainerStyle={{
              paddingTop: height - ITEM_HEIGHT,
              ...(Platform.OS !== "web" && {
                height:
                  ITEM_HEIGHT * (data.length + 1) * 0.5 + height - ITEM_HEIGHT,
              }),
            }}
            CellRendererComponent={({ style, index, children, ...props }) => {
              return (
                <View
                  style={[{ bottom: (ITEM_HEIGHT / 2) * index }, style]}
                  index={index}
                  {...props}
                >
                  {children}
                </View>
              );
            }}
          />
        </FlingGestureHandler>
      </FlingGestureHandler>
    </View>
  );
};