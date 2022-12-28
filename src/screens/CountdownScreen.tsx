//Inspo: Inspiration: https://dribbble.com/shots/2343572-Countdown-timer

import React, { useState, useEffect, useRef, useCallback } from "react";
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

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = SCREEN_WIDTH * 0.38;
const ITEM_SPACING = (SCREEN_WIDTH - ITEM_SIZE) / 2;

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
  input: {
    position: "absolute",
    width: ITEM_SIZE,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export const CountdownScreen = () => {
  const [seconds, setSeconds] = useState(timers[0]);
  const x = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x } } }], {
    useNativeDriver: true,
  });
  const animation = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const btnAnimation = useRef(new Animated.Value(0)).current;
  const inputAnimation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef();

  useEffect(() => {
    inputAnimation.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });

    return () => {
      inputAnimation.removeAllListeners();
    };
  }, []);

  const handleAnimate = useCallback(() => {
    inputAnimation.setValue(seconds);
    Animated.sequence([
      Animated.timing(btnAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(inputAnimation, {
          toValue: 0,
          duration: seconds * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: SCREEN_HEIGHT,
          duration: seconds * 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(400)
    ]).start(() => {
      Vibration.cancel();
      Vibration.vibrate();
      inputAnimation.setValue(seconds);
      Animated.timing(btnAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [seconds]);

  const opacity = btnAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const textOpacity = btnAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = btnAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const animatedBtnStyles = {
    transform: [{ translateY }],
    opacity,
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            backgroundColor: colors.red,
            transform: [{ translateY: animation }],
          },
        ]}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.btnWrapper,
          animatedBtnStyles,
        ]}
      >
        <TouchableOpacity onPress={handleAnimate}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.numWrapper}>
        <Animated.View style={[styles.input, { opacity: textOpacity }]}>
          <TextInput
            ref={inputRef}
            style={[styles.text]}
            defaultValue={seconds.toString()}
          />
        </Animated.View>
        <Animated.FlatList
          horizontal
          data={timers}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];

            const opacity = x.interpolate({
              inputRange,
              outputRange: [0.35, 1, 0.35],
            });

            const scale = x.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
            });

            return (
              <View
                style={{
                  width: ITEM_SIZE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animated.Text
                  style={[styles.text, { opacity, transform: [{ scale }] }]}
                >
                  {item}
                </Animated.Text>
              </View>
            );
          }}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0, opacity }}
          contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
          bounces={false}
          decelerationRate={"fast"}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(
              ev.nativeEvent.contentOffset.x / ITEM_SIZE
            );
            setSeconds(timers[index]);
          }}
          {...{ onScroll }}
        />
      </View>
    </View>
  );
};

/*
style={{ flexGrow: 0 }}
contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
decelerationRate={"fast"}
*/
