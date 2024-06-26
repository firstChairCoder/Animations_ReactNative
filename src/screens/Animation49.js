import { StyleSheet, View } from "react-native";
import { MotiView } from "moti";
import { StatusBar } from "expo-status-bar";
import { Feather as Icon } from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";

const color = "#6E01EF";
const size = 100;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: color,
    borderRadius: size,
    height: size,
    width: size
  },
  center: { alignItems: "center", justifyContent: "center" }
});

export const Animation49 = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar hidden />
      <MotiView style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((i) => (
          <MotiView
            key={i}
            from={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{
              loop: true,
              repeatReverse: false,
              duration: 2000,
              delay: i * 400,
              type: "timing",
              easing: Easing.out(Easing.ease)
            }}
            style={[StyleSheet.absoluteFillObject, styles.dot]}
          />
        ))}
        <Icon name="phone-outgoing" size={32} color="#fff" />
      </MotiView>
    </View>
  );
};
