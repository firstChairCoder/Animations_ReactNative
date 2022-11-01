import React from "react";
import Animated from "react-native-reanimated";
import { StyleSheet, Text } from "react-native";

const Logo = ({ scale }) => (
  <Animated.View style={{ ...styles.logo, transform: [{ scale }] }}>
    <Text style={styles.logoText}>Uber</Text>
  </Animated.View>
);
export default Logo;

const styles = StyleSheet.create({
  logo: {
    backgroundColor: "white",
    height: 120,
    width: 120,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { fontWeight: "400", fontSize: 36 },
});
