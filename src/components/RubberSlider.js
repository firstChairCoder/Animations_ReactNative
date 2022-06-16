import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import Animated, { useAnimatedProps } from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

Animated.addWhitelistedNativeProps({ text: true });

export function Header({ onSettingsPress }) {
  return (
    <View style={styles.root}>
      <Icon name="logo-android" color={"#000"} size={24} />
      <TouchableOpacity onPress={onSettingsPress}>
        <Icon name="settings" color={"#000"} size={24} />
      </TouchableOpacity>
    </View>
  );
}

export default function AnimatedText({ style, text }) {
  const animatedText = useAnimatedProps(() => {
    return {
      text: text.value + "",
    };
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      style={style}
      editable={false}
      animatedProps={animatedText}
      value={text.value + ""}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 24 + 20,
  },
});
