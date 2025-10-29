/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useMemo, useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { MotiText, MotiView } from "moti";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ECF0F1",
    flex: 1,
    justifyContent: "center",
    padding: 8,
    paddingTop: Constants.statusBarHeight
  }
});

const numZeroToNine = [...Array(10).keys()];
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
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
        overflow: "hidden"
      }}
    >
      <MotiView
        from={{ translateY: -textSize * (xxx ?? 0) }}
        animate={{ translateY: -textSize * num }}
        transition={{
          type: "timing",
          duration: 500,
          delay: 80 * index
        }}
      >
        {}
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
                  textAlign: "center"
                }
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

export const Animation05 = () => {
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
