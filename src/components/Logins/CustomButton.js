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
    alignSelf: "stretch",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 3,
    borderWidth: 1,
    height: 42,
    justifyContent: "center"
  },
  spinner: {
    height: 26
  },
  text: {
    color: "white",
    fontWeight: "400",
    textAlign: "center"
  }
});

export default CustomButton;
