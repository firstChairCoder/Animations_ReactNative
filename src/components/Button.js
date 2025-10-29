import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 8
  },
  text: {
    flex: 1,
    fontFamily: "Lobster",
    fontSize: 32,
    textAlign: "auto"
  }
});

const Button = ({ onPress, color, label, disabled = false }) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View style={styles.row}>
        <Icon
          name={"hand-pointing-right"}
          color={color}
          size={32}
          style={{ marginRight: 30 }}
        />
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
