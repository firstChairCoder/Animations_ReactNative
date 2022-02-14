import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
  },
  text: {
    fontSize: 32,
    fontWeight: "300",
    fontStyle: "italic",
    textAlign: "center",
  },
});

const Button = ({ onPress, color, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  );
};

export default Button;
