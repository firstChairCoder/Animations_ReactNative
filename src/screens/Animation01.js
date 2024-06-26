/* eslint-disable @typescript-eslint/no-shadow */
import { Dimensions, StyleSheet, View } from "react-native";
import faker from "faker";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import { MotiView, useDynamicAnimation } from "moti";
import { StatusBar } from "expo-status-bar";

import data from "../mockdata/peepsData";

const DOT_SIZE = 8;
const { width, height } = Dimensions.get("window");
const headings = [
  "Open Peeps",
  "A hand drawn \nillustration library",
  "Mix & Match",
  "Designed by \nPablo Stanley",
  "Designed by \nTaras Migulko",
  "Encapsulated by MD96"
];

//sets translation values
const random = () => {
  return ((Math.random() > 0.5 ? -1 : 1) * Math.random() * width) / 2;
};

//sets circle border values
const randomBorder = () => {
  return Math.floor(Math.random() * 14) + 4;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center"
  },
  circle: {
    borderColor: "#17161A",
    borderRadius: width,
    height: width * 0.8,
    position: "absolute",
    width: width * 0.8
  },
  circlesWrapper: {
    position: "absolute",
    top: height * 0.15
  },
  itemImg: {
    height: height * 0.5,
    resizeMode: "contain",
    width: width * 0.75
  },
  textItem: {
    fontFamily: "VolkornCaps",
    position: "absolute"
  },
  dotsWrapper: {
    bottom: height * 0.1,
    flexDirection: "row",
    left: 20,
    position: "absolute"
  },
  dot: {
    backgroundColor: "#000",
    borderRadius: DOT_SIZE,
    height: DOT_SIZE,
    marginHorizontal: DOT_SIZE / 2,
    width: DOT_SIZE
  },
  footer: {
    bottom: height * 0.3,
    left: 20,
    position: "absolute",
    width: width * 0.7
  }
});

faker.seed(123);
const _data = faker.helpers.shuffle(data).slice(0, headings.length);

const Circle = ({ animation }) => {
  return (
    <MotiView
      state={animation}
      transition={{ stiffness: 50 }}
      style={styles.circle}
    />
  );
};

const Circles = ({ first, second, third }) => {
  return (
    <View style={styles.circlesWrapper}>
      <Circle animation={first} />
      <Circle animation={second} />
      <Circle animation={third} />
    </View>
  );
};

const Item = ({ item, index, scrollX }) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value / width,
        [index - 0.6, index, index + 0.6],
        [0, 1, 0]
      )
    };
  });
  return (
    <View style={{ width, height: height / 2 }}>
      <Animated.Image style={[styles.itemImg, style]} source={{ uri: item }} />
    </View>
  );
};

const TextItem = ({ index, heading, scrollX }) => {
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value / width,
        [index - 0.8, index, index + 0.8],
        [0, 1, 0]
      ),
      transform: [
        {
          translateX: interpolate(
            scrollX.value / width,
            [index - 0.8, index, index + 0.8],
            [10, 0, -10]
          )
        }
      ]
    };
  });
  return (
    <Animated.Text
      key={index}
      style={[styles.textItem, { fontSize: index === 0 ? 42 : 28 }, style]}
    >
      {heading}
    </Animated.Text>
  );
};

const PaginationDot = ({ index, scrollX }) => {
  const style = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollX.value / width,
        [index - 1, index, index + 1],
        [DOT_SIZE * 1.5, DOT_SIZE * 3, DOT_SIZE * 1.5],
        Extrapolation.CLAMP
      ),
      opacity: interpolate(
        scrollX.value / width,
        [index - 1, index, index + 1],
        [0.2, 1, 0.2],
        Extrapolation.CLAMP
      )
    };
  });
  return <Animated.View style={[styles.dot, style]} />;
};

const Pagination = ({ data, scrollX }) => {
  return (
    <View style={styles.dotsWrapper}>
      {data.map((_, index) => (
        <PaginationDot key={index} index={index} scrollX={scrollX} />
      ))}
    </View>
  );
};

export const Animation01 = () => {
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((ev) => {
    scrollX.value = ev.contentOffset.x;
  });

  const first = useDynamicAnimation(() => ({
    translateX: random(),
    translateY: random(),
    width: width * 0.67,
    height: width * 0.67,
    borderRadius: width * 0.67,
    borderWidth: randomBorder()
  }));

  const second = useDynamicAnimation(() => ({
    translateX: random(),
    translateY: random(),
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.8,
    borderWidth: randomBorder()
  }));

  const third = useDynamicAnimation(() => ({
    translateX: random(),
    translateY: random(),
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.8,
    borderWidth: randomBorder()
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Circles first={first} second={second} third={third} />
      <Animated.FlatList
        data={_data}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return <Item item={item} index={index} scrollX={scrollX} />;
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrotle={16}
        bounces={false}
        onMomentumScrollEnd={() => {
          const newSize = width * 0.5 + Math.random() * width * 0.5;
          const newSize2 = width * 0.5 + Math.random() * width * 0.5;
          const newSize3 = width * 0.5 + Math.random() * width * 0.5;
          first.animateTo({
            translateX: random(),
            translateY: random(),
            width: newSize,
            height: newSize,
            borderRadius: newSize,
            borderWidth: randomBorder()
          });
          second.animateTo({
            translateX: random(),
            translateY: random(),
            width: newSize2,
            height: newSize2,
            borderRadius: newSize2,
            borderWidth: randomBorder()
          });
          third.animateTo({
            translateX: random(),
            translateY: random(),
            width: newSize3,
            height: newSize3,
            borderRadius: newSize3,
            borderWidth: randomBorder()
          });
        }}
      />
      <View style={styles.footer}>
        {headings.map((heading, index) => (
          <TextItem
            key={index}
            index={index}
            heading={heading}
            scrollX={scrollX}
          />
        ))}
      </View>

      <Pagination data={_data} scrollX={scrollX} />
    </View>
  );
};
