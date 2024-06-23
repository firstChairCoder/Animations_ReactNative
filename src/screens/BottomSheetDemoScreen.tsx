import { useCallback, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import type { BottomSheetRefProps } from "../components/BottomSheet";
import { BottomSheet } from "../components/BottomSheet";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#17161A",
    flex: 1,
    justifyContent: "center"
  },
  button: {
    aspectRatio: 1,
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    opacity: 0.5
  },
  body: {
    alignItems: "center",
    backgroundColor: "rgba(50,205,50,.75)",
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "#FFF",
    fontSize: 32,
    fontStyle: "italic",
    marginVertical: 40
  }
});

export const BottomSheetDemoScreen = () => {
  const ref = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      <TouchableOpacity style={styles.button} onPress={onPress} />
      <BottomSheet ref={ref}>
        <View style={styles.body}>
          <Text style={styles.text}>Now you see me!</Text>
          <Text style={styles.text}>Now you see me!</Text>
          <Text style={styles.text}>Now you see me!</Text>
          <Text style={styles.text}>Now you see me!</Text>
          <Text style={styles.text}>Now you see me!</Text>
        </View>
      </BottomSheet>
    </View>
  );
};
