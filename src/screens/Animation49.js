/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { MotiView as MView } from "moti";
import { StatusBar } from "expo-status-bar";
import { Feather as Icon } from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";

const color = "#6E01EF";
const size = 100;

export const Animation49 = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <StatusBar hidden />
      <MView style={[styles.dot, styles.center]}>
        {[...Array(3).keys()].map((i) => (
          <MView
            key={i}
            from={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{
              loop: true,
              repeatReverse: false,
              duration: 2000,
              delay: i * 400,
              type: "timing",
              easing: Easing.out(Easing.ease),
            }}
            style={[StyleSheet.absoluteFillObject, styles.dot]}
          />
        ))}
        <Icon name="phone-outgoing" size={32} color="#fff" />
      </MView>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: size,
    height: size,
    borderRadius: size,
    backgroundColor: color,
  },
  center: { alignItems: "center", justifyContent: "center" },
});
