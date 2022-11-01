import React, { Component } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from "react-native";

import imgLogo from "../../assets/images/logo_anoda.png";
import {
  CustomButton,
  LoginForm,
  Opening,
  SignupForm,
} from "../components/Logins";

const IS_ANDROID = Platform.OS === "android";
const { height, width } = Dimensions.get("window");
// const ANDROID_STATUSBAR = 24;
const DEVICE_HEIGHT = IS_ANDROID ? height - 24 : height;
export const DEVICE_WIDTH = width;
const IMAGE_WIDTH = DEVICE_WIDTH * 0.8;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Just a centered logout button.
 */
const HomeScreen = ({ logout }) => {
  return (
    <View style={styles.container}>
      <CustomButton
        text={"Logout"}
        onPress={logout}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

/**
 * The authentication screen.
 * It shows three different sub-screens:
 * - The opening screen, with the two buttons that redirect to the login/signup forms (if this.state.visibleForm === null)
 * - The signup form (if this.state.visibleForm === 'SIGNUP')
 * - The login form (if this.state.visibleForm === 'LOGIN')
 *
 * The app state (isLoggedIn, isLoading) and the login/signup functions are received as props from src.app.js
 *
 * The animations are delegated to:
 * - react-native-animatable: for the simpler animations of the components (in e.g. bounceIn animation of the logo)
 * - react-native's LayoutAnimation: for the form show/hide animation
 * - react-native's KeyboardAvoidingView: for applying a bottom padding when a keyboard show-up is detected
 *
 * An example of this screen animation flow is the following:
 * - The user opens the app.
 * - The logo shows up using the bounceIn animation of react-native-animatable, while the "Opening" subscreen animates the button
 *   using the fadeIn animation of react-native-animatable.
 * - The user taps on the "Create account" button.
 * - _setVisibleForm gets called with the 'SIGNUP' parameter. It configures the next animation and sets this.state.visibleForm to 'SIGNUP'.
 *   The state change triggers a render and the change of formStyle gets animated (thanks to the animation configuration previously
 *   applied by _setVisibleForm).
 * - Just after the signup form has become visible it animates the form button using the bounceIn animation of react-native-animatable.
 * - The user fills up its info and signup succesfully.
 * - componentWillUpdate checks the isLoggedIn props and after realizing that the user has just authenticated it calls _hideAuthScreen.
 *   _hideAuthScreen then 1. calls the SignupForm.hideForm(), that hides the form buttons (zoomOut) and the form itself (fadeOut),
 *   2. fadeOut the logo, 3. tells the container that the login animation has completed and that the app is ready to show the next screen (HomeScreen).
 */

class AuthScreen extends Component {
  state = {
    visibleForm: null, // Can be: null | SIGNUP | LOGIN
  };

  componentWillUpdate(nextProps) {
    // If the user has logged/signed up succesfully start the hide animation
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen();
    }
  }

  _hideAuthScreen = async () => {
    // 1. Slide out the form container
    await this._setVisibleForm(null);
    // 2. Fade out the logo
    await this.logoImgRef.fadeOut(800);
    // 3. Tell the container (app.js) that the animation has completed
    this.props.onLoginAnimationCompleted();
  };
  _setVisibleForm = async (visibleForm) => {
    // 1. Hide the current form (if any)
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm();
    }
    // 2. Configure a spring animation for the next step
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // 3. Set the new visible form
    this.setState({ visibleForm });
  };

  render() {
    const { isLoggedIn, isLoading, signup, login } = this.props;
    const { visibleForm } = this.state;
    // The following style is responsible of the "bounce-up from bottom" animation of the form
    const formStyle = !visibleForm ? { height: 0 } : { marginTop: 40 };
    return (
      <View style={styles.authContainer}>
        <Image
          animation={"bounceIn"}
          duration={1200}
          delay={200}
          ref={(ref) => (this.logoImgRef = ref)}
          style={styles.logoImg}
          source={imgLogo}
        />
        {!visibleForm && !isLoggedIn && (
          <Opening
            onCreateAccountPress={() => this._setVisibleForm("SIGNUP")}
            onSignInPress={() => this._setVisibleForm("LOGIN")}
          />
        )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={"padding"}
          style={[formStyle, styles.bottom]}
        >
          {visibleForm === "SIGNUP" && (
            <SignupForm
              ref={(ref) => (this.formRef = ref)}
              onLoginLinkPress={() => this._setVisibleForm("LOGIN")}
              onSignupPress={signup}
              isLoading={isLoading}
            />
          )}
          {visibleForm === "LOGIN" && (
            <LoginForm
              ref={(ref) => (this.formRef = ref)}
              onSignupLinkPress={() => this._setVisibleForm("SIGNUP")}
              onLoginPress={login}
              isLoading={isLoading}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default class Animation35 extends Component {
  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false, // Has the app completed the login animation?
  };

  /**
   * Two login function that waits 1000 ms and then authenticates the user succesfully.
   * In your real app they should be replaced with an API call to you backend.
   */
  _simulateLogin = (username, password) => {
    this.setState({ isLoading: true });
    setTimeout(
      () => this.setState({ isLoggedIn: true, isLoading: false }),
      1000
    );
  };

  _simulateSignup = (username, password, fullName) => {
    this.setState({ isLoading: true });
    setTimeout(
      () => this.setState({ isLoggedIn: true, isLoading: false }),
      1000
    );
  };

  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */
  render() {
    if (this.state.isAppReady) {
      //   return <View style={{ flex: 1, backgroundColor: "maroon" }} />;
      return (
        <HomeScreen
          logout={() => this.setState({ isLoggedIn: false, isAppReady: false })}
        />
      );
    } else {
      //   return <View style={{ flex: 1, backgroundColor: "lime" }} />;
      return (
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1976D2",
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  authContainer: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: "white",
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: 30,
  },
  bottom: {
    backgroundColor: "#1976D2",
  },
});
