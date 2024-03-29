/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { MotiText, MotiView } from "moti";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ECF0F1",
  },
});

const numZeroToNine = [...Array(10).keys()];
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Tick = ({ num, index, textSize, textStyle }) => {
  const xxx = usePrevious(num);
  return (
    <MotiView
      style={{
        height: textSize,
        overflow: "hidden",
      }}
    >
      <MotiView
        from={{ translateY: -textSize * (xxx ?? 0) }}
        animate={{ translateY: -textSize * num }}
        transition={{
          type: "timing",
          duration: 500,
          delay: 80 * index,
        }}
      >
        {/* eslint-disable-next-line no-shadow */}
        {numZeroToNine.map((number, index) => {
          return (
            <MotiText
              key={index}
              style={[
                textStyle,
                {
                  height: textSize,
                  fontSize: textSize,
                  lineHeight: textSize * 1.1,
                  textAlign: "center",
                },
              ]}
            >
              {number}
            </MotiText>
          );
        })}
      </MotiView>
    </MotiView>
  );
};

const Ticker = ({ number, textSize, textStyle }) => {
  const numArray = useMemo(() => String(number).split(""), [number]);
  return (
    <MotiView style={{ flexDirection: "row" }}>
      {numArray.map((num, index) => {
        return (
          <Tick
            key={index}
            index={index}
            textSize={textSize}
            textStyle={textStyle}
            num={parseFloat(num)}
          />
        );
      })}
    </MotiView>
  );
};

export const Animation5 = () => {
  const [number, setNumber] = useState(
    Math.floor(Math.random() * 89999) + 10000
  );

  useEffect(() => {
    const interval = setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 89999) + 10000;
      // console.log(randomNumber)
      // setNumber(number => number + 1)
      setNumber(randomNumber);
    }, 2000);

    return () => {
      clearTimeout(interval);
    };
  }, [number]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Ticker
        number={number}
        textSize={90}
        textStyle={{ fontWeight: "bold", color: "#364680" }}
      />
    </View>
  );
};
