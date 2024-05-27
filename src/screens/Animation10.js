/* eslint-disable react-native/no-inline-styles */
import { Ionicons as Icon } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  cardWrapper: {
    width: width - 40,
    height: "30%",
    justifyContent: "space-around",
    alignItems: "flex-start",
    borderRadius: 5,
    shadowOpacity: 4,
    shadowOffset: { x: 0, y: 2 },
    shadowColor: "black",
    borderColor: "#C3C3C3",
    elevation: 3,
    borderWidth: 1.5,
  },
  headerMain: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  price: {
    fontSize: 42,
    color: "#828282",
    fontWeight: "300",
  },
  counterDisplay: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderRadius: 30,
  },
  count: {
    fontSize: 28,
    color: "#828282",
  },
  decrease: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 2 },
    shadowColor: "black",
    elevation: 2,
    paddingTop: 4,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#828282",
  },
});

const Card = () => {
  const [counter, setCounter] = useState(1);
  const [open, setOpen] = useState(0);
  const animation = new Animated.Value(0);
  const tapAnimation = new Animated.Value(0);

  const displayStyles = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [120, 100],
        }),
      },
      {
        scale: animation.interpolate({
          inputRange: [0, 0.2, 1],
          outputRange: [0.9, 1, 1.25],
        }),
      },
    ],
  };

  const countTextStyles = {
    transform: [
      {
        scale: tapAnimation.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [1, 0.8, 1.25, 1],
        }),
      },
    ],
  };

  const decreaseStyles = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [60, 0],
        }),
      },
      {
        scale: 0.7,
      },
    ],
  };

  const incrementStyles = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.7],
        }),
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 30],
        }),
      },
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "90deg"],
        }),
      },
    ],
  };

  const animateQuantityChange = () => {
    Animated.timing(tapAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => tapAnimation.setValue(0));
  };

  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      animateQuantityChange();
    } else {
      return;
    }
  };

  const increaseCounter = () => {
    if (!open) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setOpen(1));
    } else {
      setCounter(counter + 1);
      animateQuantityChange();
    }
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.headerMain}>
        <View
          style={{
            width: "95%",
            height: 30,
            margin: 5,
            backgroundColor: "#C9CDD5",
            borderRadius: 5,
          }}
        />
      </View>

      <View style={[styles.headerMain, { justifyContent: "flex-start" }]}>
        <View
          style={{
            width: "30%",
            height: 15,
            margin: 5,
            backgroundColor: "#C9CDD5",
            borderRadius: 5,
          }}
        />
        <View
          style={{
            width: "20%",
            height: 15,
            margin: 5,
            backgroundColor: "#C9CDD5",
            borderRadius: 5,
          }}
        />
        <Text>On my way</Text>
      </View>

      <View style={[styles.headerMain, { justifyContent: "space-around" }]}>
        <Text style={styles.price}>$10</Text>
        <View style={{ flexDirection: "row" }}>
          <Animated.View style={[styles.counterDisplay, displayStyles]}>
            <Animated.Text style={[styles.count, countTextStyles]}>
              {counter}
            </Animated.Text>
          </Animated.View>

          <Pressable onPress={decreaseCounter}>
            <Animated.View style={[styles.decrease, decreaseStyles]}>
              <Icon name={"remove-sharp"} color={"#828282"} size={32} />
            </Animated.View>
          </Pressable>

          <Pressable onPress={increaseCounter}>
            <Animated.View
              style={[
                styles.decrease,
                { backgroundColor: "#31BAC9" },
                incrementStyles,
              ]}
            >
              <Icon name={"add-sharp"} color={"#FFF"} size={32} />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export const Animation10 = () => {
  return (
    <View style={styles.container}>
      <Card />
    </View>
  );
};
