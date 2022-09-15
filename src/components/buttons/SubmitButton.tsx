import React from "react";
import {
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

class SubmitButton extends React.Component {
  animationValue!: Animated.Value | Animated.ValueXY;
  borderRadiusValue!: Animated.Value | Animated.ValueXY;

  constructor(props: {}) {
    super(props);

    this.state = {
      loading: false,
      isSubmitted: false,
    };

    this.animationValue = new Animated.Value(0);
    this.colorInterpolate = this.animationValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["#F9E79F", "#ABEBC6"],
    });
    this.borderRadiusValue = new Animated.Value(0);
    this.borderRadiusInterpolate = this.borderRadiusValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 60],
    });
  }

  animateSubmitButton = () => {
    Animated.parallel([
      Animated.timing(this.borderRadiusValue, {
        toValue: 1,
        duration: 750,
      }),
      Animated.timing(this.animationValue, {
        toValue: 100,
        duration: 1750,
      }),
    ]).start();
  };

  handlePress = () => {
    this.setState({ loading: true });

    this.animateSubmitButton();

    setTimeout(() => {
      this.setState({
        loading: false,
        isSubmitted: true,
      });
    }, 2500);
  };

  render() {
    const { loading, isSubmitted } = this.state;
    const animatedStyle = {
      backgroundColor: this.colorInterpolate,
      borderRadius: this.borderRadiusInterpolate,
    };
    const buttonTitle = isSubmitted ? "❤️" : "Submit";
    return (
      <TouchableOpacity onPress={this.handlePress} style={[styles.container]}>
        <Animated.View style={[styles.button, animatedStyle]}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.title}>{buttonTitle}</Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  button: {
    paddingHorizontal: 26,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    letterSpacing: 2,
    color: "#222222",
  },
});

export default SubmitButton;
