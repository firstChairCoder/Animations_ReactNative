import { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native-animatable";

import { DEVICE_WIDTH } from "../../screens/Animation35";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    fullName: ""
  };

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ]);
    }
  };

  render() {
    const { email, password } = this.state;
    const { isLoading, onSignupLinkPress, onLoginPress } = this.props;
    const isValid = email !== "" && password !== "";
    return (
      <View style={styles.container}>
        <View
          style={styles.form}
          ref={(ref) => {
            this.formRef = ref;
          }}
        >
          <CustomTextInput
            name={"email"}
            ref={(ref) => (this.emailInputRef = ref)}
            placeholder={"Email"}
            keyboardType={"email-address"}
            editable={!isLoading}
            returnKeyType={"next"}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            name={"password"}
            ref={(ref) => (this.passwordInputRef = ref)}
            placeholder={"Password"}
            editable={!isLoading}
            returnKeyType={"done"}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View
            ref={(ref) => (this.buttonRef = ref)}
            animation={"bounceIn"}
            duration={600}
            delay={400}
          >
            <CustomButton
              onPress={() => onLoginPress(email, password)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={"Log In"}
            />
          </View>
          <Text
            ref={(ref) => (this.linkRef = ref)}
            style={styles.signupLink}
            onPress={onSignupLinkPress}
            animation={"fadeIn"}
            duration={600}
            delay={400}
          >
            {"Not registered yet?"}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: "center"
  },
  loginButton: {
    backgroundColor: "white"
  },
  loginButtonText: {
    color: "#3E464D",
    fontWeight: "bold"
  },
  signupLink: {
    alignSelf: "center",
    color: "rgba(255,255,255,0.6)",
    padding: 20
  }
});
