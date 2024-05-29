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
    alignItems: "center",
    backgroundColor: "white",
    height: 120,
    justifyContent: "center",
    padding: 10,
    width: 120
  },
  logoText: { fontSize: 36, fontWeight: "400" }
});
