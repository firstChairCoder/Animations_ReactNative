/* eslint-disable max-len */
//WIP!
import { Component, createRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TextInput,
  View
} from "react-native";

const { width } = Dimensions.get("window");
const minAge = 0;
const segmentsLength = 91;
const segmentWidth = 2;
const segmentSpacing = 20;
const spacerWidth = (width - segmentWidth) / 2;
const snapTo = segmentWidth + segmentSpacing;
const rulerWidth = width + (segmentsLength - 1) * snapTo;
const indicatorWrapperWidth = 100;
const data = [...Array(segmentsLength).keys()].map((i) => i + minAge);
const styles = StyleSheet.create({
  spacer: {
    height: 100,
    width: spacerWidth
  },
  ruler: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: rulerWidth
  },
  container: {
    flex: 1
  },
  segment: {
    width: segmentWidth
  },
  text: {
    fontSize: 42,
    marginBottom: 10
  },
  indicator: {
    backgroundColor: "#f5afaf",
    height: 100
  },
  indicatorWrapper: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    left: (width - indicatorWrapperWidth) / 2,
    position: "absolute",
    width: indicatorWrapperWidth
  }
});

const Ruler = () => {
  return (
    <View style={styles.ruler}>
      <View style={styles.spacer} />
      {data.map((i) => {
        const tenth = i % 10 === 0;
        return (
          <View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor: tenth ? "#4c3e5c" : "#4c3e5c30",
                height: tenth ? 40 : 20,
                marginRight: i === data.length - 1 ? 0 : segmentSpacing
              }
            ]}
          />
        );
      })}
      <View style={styles.spacer} />
    </View>
  );
};

export default class Animation24 extends Component {
  textRef = createRef();
  scrollRef = createRef();
  value = 0;
  constructor(props) {
    super(props);
    this.state = {
      scrolledX: new Animated.Value(0),
      initialAge: 22
    };

    // this observer is return an event which contains the value of the animation
    // https://facebook.github.io/react-native/docs/animatedvalue#addlistener
    this.state.scrolledX.addListener(({ value }) => {
      const sliderValue = Math.round(value / snapTo);
      if (this.textRef && this.textRef.current) {
        this.textRef.current.setNativeProps({
          text: `${sliderValue + minAge}`
        });
      }
    });
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    setTimeout(() => {
      if (this.scrollRef && this.scrollRef.current) {
        // The current scrollRef it's actually getting the Animated instance ( returned from createAnimatedComponent(ScrollView) )
        // and we need to access the ScrollView instead of the Animated instance because ScrollView is providing
        // the `scrollTo` method.
        // Instead of using _component (which is a bad practice in general -> accessing private method should always happend through
        // public methods), AnimatedImplementation actually exposing a method called getNode https://github.com/facebook/react-native/pull/9944
        // that will return _component.

        // give the comment above, the below implementation can be:
        // this.scrollRef.current.getNode().scrollTo({x: this._calculateOffset(), y: 0, animated: true})
        // this.scrollRef.current -> Animated instance
        // this.scrollRef.current.getNode() -> ScrollView instance
        this.scrollRef.current._component.scrollTo({
          x: this._calculateOffset(),
          y: 0,
          animated: true
        });
      }
    }, 1000);
  }

  _calculateOffset = () => {
    return snapTo * (this.state.initialAge - minAge);
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://cdn.dribbble.com/users/1007500/screenshots/3623450/cake_01.gif"
          }}
          style={{ width: width, height: width * 1.2, resizeMode: "cover" }}
        />
        <Animated.ScrollView
          style={[StyleSheet.absoluteFillObject]}
          contentContainerStyle={{ alignItems: "flex-end" }}
          horizontal
          ref={this.scrollRef}
          onLayout={(event) => {
            this.frameWidth = event.nativeEvent.layout.width;
            const maxOffset = this.contentWidth - this.frameWidth;
            if (maxOffset < this.xOffset) {
              this.xOffset = maxOffset;
            }
          }}
          onContentSizeChange={(contentWidth) => {
            this.contentWidth = contentWidth;
            const maxOffset = this.contentWidth - this.frameWidth;
            if (maxOffset < this.xOffset) {
              this.xOffset = maxOffset;
            }
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: this.state.scrolledX }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          snapToInterval={snapTo}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <Ruler />
        </Animated.ScrollView>
        <View style={styles.indicatorWrapper}>
          <TextInput ref={this.textRef} style={styles.text} />
          <View style={[styles.segment, styles.indicator]} />
        </View>
      </View>
    );
  }
}
