import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";

import TouchableView from "./TouchableView";

const CustomButton = ({
  onPress = () => null,
  isEnabled = true,
  isLoading = false,
  text,
  buttonStyle,
  textStyle,
  ...otherProps
}) => {
  const onButtonPress = isEnabled && !isLoading ? onPress : () => null;

  return (
    <View {...otherProps}>
      <TouchableView
        onPress={onButtonPress}
        style={[styles.button, buttonStyle]}
      >
        {isLoading && (
          <ActivityIndicator style={styles.spinner} color={"gray"} />
        )}
        {!isLoading && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </TouchableView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 42,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: "stretch",
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  spinner: {
    height: 26,
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
    color: "white",
  },
});

export default CustomButton;
