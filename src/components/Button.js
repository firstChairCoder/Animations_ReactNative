import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  text: {
    flex: 1,
    fontSize: 32,
    // fontWeight: "300",
    // fontStyle: "italic",
    textAlign: "auto",
    fontFamily: "Lobster",
  },
});

const Button = ({ onPress, color, text }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.row}>
        <Icon
          name={"hand-pointing-right"}
          color={color}
          size={32}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ marginRight: 30 }}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
