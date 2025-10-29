import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import faker from "faker";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue
} from "react-native-reanimated";
import { Directions, FlingGestureHandler } from "react-native-gesture-handler";

import stickers from "../mockdata/stickersData";

const { width, height } = Dimensions.get("window");
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const SCALE_FACTOR = 0.2;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center"
  },
  image: {
    height: ITEM_HEIGHT,
    resizeMode: "contain",
    width: ITEM_WIDTH
  }
});

faker.seed(1);
const data = stickers.map((image) => {
  return {
    key: faker.datatype.uuid(),
    image,
    name: faker.commerce.product()
  };
});
// console.log(data.map(({ name }) => ({ name })));

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
          )
        }
      ],
      opacity: interpolate(
        v.value,
        [index - 1, index, index + 1, index + 2],
        [0, 1, 0.85, 0.7]
      )
    };
  });
  return (
    <Animated.View
      style={[{ justifyContent: "center", alignItems: "center" }, style]}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text>{item.name}</Text>
    </Animated.View>
  );
};

export const Animation02 = () => {
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
                  ITEM_HEIGHT * (data.length + 1) * 0.5 + height - ITEM_HEIGHT
              })
            }}
            // eslint-disable-next-line react/no-unstable-nested-components
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
