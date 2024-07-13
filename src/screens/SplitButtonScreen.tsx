import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import SplitButton from "../components/SplitButton";

const PALETTE = {
  card: "#302E37",
  highlight: "#EA3F4C",
  background: "#18141D",
  text: "white"
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: PALETTE.background,
    flex: 1,
    justifyContent: "center"
  }
});

export const SplitButtonScreen = () => {
  const [isSplit, setIsSplit] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={{ color: "white" }}>MAMA</Text>
      <SplitButton
        isSplit={isSplit}
        mainAction={{
          label: "Stop",
          backgroundColor: PALETTE.card,
          onPress: () => {
            console.warn("Stop");
            setIsSplit(true);
          }
        }}
        leftAction={{
          label: "Resume",
          backgroundColor: PALETTE.card,
          onPress: () => {
            console.warn("Resume");
            setIsSplit(false);
          }
        }}
        rightAction={{
          label: "Finish",
          backgroundColor: PALETTE.highlight,
          onPress: () => {
            console.warn("Finish");
            setIsSplit(false);
          }
        }}
      />
    </View>
  );
};
