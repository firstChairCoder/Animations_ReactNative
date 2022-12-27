import * as React from "react";
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../components/Wallet";

const colors = {
  black: "#323F4E",
  red: "#F76A6A",
  text: "#FFFFFF",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontStyle: "italic",
    color: colors.text,
    fontWeight: "900",
  },
  btnWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  numWrapper: {
    flex: 1,
    position: "absolute",
    top: SCREEN_HEIGHT / 3,
    left: 0,
    right: 0,
    
  },
});

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = SCREEN_WIDTH * 0.38;
const ITEM_SPACING = (SCREEN_WIDTH - ITEM_SIZE) / 2;

export const CountdownScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={[StyleSheet.absoluteFillObject, styles.btnWrapper]}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.numWrapper}>
        <Text style={styles.text}>1</Text>
      </View>
    </View>
  );
};
