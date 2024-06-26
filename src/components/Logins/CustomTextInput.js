import { Component } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
import { View } from "react-native-animatable";

const IS_ANDROID = Platform.OS === "android";

export default class AuthTextInput extends Component {
  state = {
    isFocused: false
  };

  focus = () => this.textInputRef.focus();

  render() {
    const { isEnabled, ...otherProps } = this.props;
    const { isFocused } = this.state;
    const color = isEnabled ? "white" : "rgba(255,255,255,0.4)";
    const borderColor = isFocused ? "white" : "rgba(255,255,255,0.4)";
    return (
      <View style={styles.container}>
        <View style={[styles.textInputWrapper, { borderColor }]}>
          <TextInput
            ref={(ref) => (this.textInputRef = ref)}
            autoCapitalize={"none"}
            autoCorrect={false}
            style={[styles.textInput, { color }]}
            maxLength={32}
            underlineColorAndroid={"transparent"}
            placeholderTextColor={"rgba(255,255,255,0.4)"}
            selectionColor={"white"}
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            {...otherProps}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 2
  },
  textInputWrapper: {
    borderBottomWidth: 1,
    height: 42,
    marginBottom: 2
  },
  textInput: {
    color: "white",
    flex: 1,
    height: 42,
    margin: IS_ANDROID ? -1 : 0,
    padding: 7
  }
});
