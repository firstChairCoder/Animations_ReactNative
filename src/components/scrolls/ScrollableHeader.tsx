import React from "react";
import { View, Text, ScrollView, StyleSheet, Animated } from "react-native";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ScrollableHeader extends React.Component {
  constructor(props: {}) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 5 });
    return (
      <View style={styles.scrollViewContainer}>
        <Text style={styles.title}>Scrollable Header</Text>
        {data.map((_, i) => (
          <View key={i} style={styles.scrollViewContent}>
            <Text style={styles.textBody}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehende.
              {"\n \n"}
              Duis aute irure dolor in reprehende, ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </Text>
          </View>
        ))}
      </View>
    );
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
        >
          {this._renderScrollViewContent()}
        </ScrollView>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Text style={styles.hiddenTitle}>Scrollable Header</Text>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require("../../../assets/images/react-header.png")}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  row: {
    height: 40,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#40B5EA",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    marginTop: HEADER_MAX_HEIGHT,
    overflow: "visible",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
  },
  hiddenTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: "#FFFFFF",
    paddingVertical: HEADER_MIN_HEIGHT / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  textBody: {
    lineHeight: 22,
    fontSize: 16,
  },
});

export default ScrollableHeader;
