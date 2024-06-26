import { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-animatable";

import { DEVICE_WIDTH } from "../../screens/Animation35";
import CustomButton from "./CustomButton";

export default class Opening extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View animation={"zoomIn"} delay={600} duration={400}>
          <CustomButton
            text={"Create Account"}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
        <View
          style={styles.separatorContainer}
          animation={"zoomIn"}
          delay={700}
          duration={400}
        >
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{"Or"}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={"zoomIn"} delay={800} duration={400}>
          <CustomButton
            text={"Sign In"}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: DEVICE_WIDTH * 0.1
  },
  createAccountButton: {
    backgroundColor: "#9B9FA4"
  },
  createAccountButtonText: {
    color: "white"
  },
  separatorContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20
  },
  separatorLine: {
    borderColor: "#9B9FA4",
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    height: StyleSheet.hairlineWidth
  },
  separatorOr: {
    color: "#9B9FA4",
    marginHorizontal: 8
  },
  signInButton: {
    backgroundColor: "#1976D2"
  },
  signInButtonText: {
    color: "white"
  }
});
