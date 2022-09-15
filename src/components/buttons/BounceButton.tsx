import React from "react";
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";

class BounceButton extends React.Component {
  scaleValue!: Animated.Value | Animated.ValueXY;

  constructor(props: {}) {
    super(props);
  }

  componentWillMount() {
    this.scaleValue = new Animated.Value(1);
  }

  handlePressIn = () => {
    Animated.spring(this.scaleValue, {
      toValue: 0.5,
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.scaleValue, {
      toValue: 1,
      friction: 3,
    }).start();
  };

  render() {
    const animatedStyle = {
      transform: [{ scale: this.scaleValue }],
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={styles.buttonTitle}>Bounce</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "#82E0AA",
    borderRadius: 10,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.4,
  },
});

export default BounceButton;
