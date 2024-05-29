/*
Inspiration: https://dribbble.com/shots/3894781-Urbanears-Headphones/
*/
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

import data from "../mockdata/headphonesData";

const { width, height } = Dimensions.get("window");
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle: {
    alignItems: "center",
    height,
    justifyContent: "center",
    width
  },
  imageStyle: {
    flex: 1,
    height: width * 0.75,
    resizeMode: "contain",
    width: width * 0.75
  },
  textContainer: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
    flex: 0.5
  },
  heading: {
    color: "#444",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 5,
    textTransform: "uppercase"
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 16 * 1.5,
    marginRight: 10,
    textAlign: "left",
    width: width * 0.75
  },
  logo: {
    bottom: 10,
    height: LOGO_HEIGHT,
    left: 10,
    opacity: 0.9,
    position: "absolute",
    resizeMode: "contain",
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: "-90deg" },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 }
    ],
    width: LOGO_WIDTH
  },
  pagination: {
    bottom: 40,
    flexDirection: "row",
    height: DOT_SIZE,
    position: "absolute",
    right: 20
  },
  paginationDot: {
    borderRadius: DOT_SIZE * 0.15,
    height: DOT_SIZE * 0.3,
    width: DOT_SIZE * 0.3
  },
  paginationDotContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: DOT_SIZE
  },
  paginationIndicator: {
    borderColor: "#ddd",
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    height: DOT_SIZE,
    width: DOT_SIZE
  },
  tickerContainer: {
    height: TICKER_HEIGHT,
    left: 20,
    overflow: "hidden",
    position: "absolute",
    top: 40
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    fontWeight: "800",
    lineHeight: TICKER_HEIGHT,
    textTransform: "uppercase"
  },

  circleContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    borderRadius: CIRCLE_SIZE / 2,
    height: CIRCLE_SIZE,
    position: "absolute",
    top: "15%",
    width: CIRCLE_SIZE
  }
});

const Circle = ({ scrollX }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        const inputRange = [
          (index - 0.55) * width,
          index * width,
          (index + 0.55) * width
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0]
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: color,
                opacity,
                transform: [{ scale }]
              }
            ]}
          />
        );
      })}
    </View>
  );
};

const Item = ({ imageUri, heading, description, index, scrollX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0]
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1]
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7]
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0]
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[
          styles.imageStyle,
          {
            transform: [{ scale }]
          }
        ]}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{ translateX: translateXHeading }]
            }
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [
                {
                  translateX: translateXDescription
                }
              ]
            }
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const Pagination = ({ scrollX }) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE]
  });
  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: "absolute",
            transform: [{ translateX }]
          }
        ]}
      />
      {data.map((item) => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, { backgroundColor: item.color }]}
            />
          </View>
        );
      })}
    </View>
  );
};

const Ticker = ({ scrollX }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT]
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map(({ type }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

export const Animation33 = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Circle scrollX={scrollX} />
      <Animated.FlatList
        keyExtractor={(item) => item.key}
        data={data}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={scrollX} />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Image
        style={styles.logo}
        source={require("../../assets/images/headphones/ue_black_logo.png")}
      />
      <Pagination scrollX={scrollX} />
      <Ticker scrollX={scrollX} />
    </View>
  );
};
