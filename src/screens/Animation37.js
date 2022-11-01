/* eslint-disable react-native/no-inline-styles */
//Inspiration:  https://dribbble.com/shots/8930339-Tesla-Cybertruck-Control-App
import * as React from "react";
import { View } from "react-native";
import { AnimatePresence, MotiText as MText, MotiView as MView } from "moti";
import { StatusBar } from "expo-status-bar";

const _min = 30;
const _max = 60;
const _spacing = 20;
const _items = 20;

const _colors = {
  bg: "#101527",
  active: "#0CFBBB",
  inactive: "#17303F",
};

const AnimatedNumber = ({ percentage = "00", style }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        style,
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        {percentage.split("").map((t, i) => {
          return (
            <View
              key={i}
              style={{
                overflow: "hidden",
                height: 20,
                justifyContent: "center",
                width: 14,
              }}
            >
              <AnimatePresence>
                <MText
                  from={{ translateY: 20 }}
                  animate={{ translateY: 0 }}
                  exit={{ translateY: -20 }}
                  transition={{
                    duration: 500,
                    type: "timing",
                    delay: 800 + i * 50,
                  }}
                  key={`percentage-${t}-${i}`}
                  style={{
                    position: "absolute",
                    fontWeight: "800",
                    fontSize: 20,
                    color: _colors.active,
                  }}
                >
                  {t}
                </MText>
              </AnimatePresence>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const Animation37 = () => {
  const [percentage, setPercentage] = React.useState(
    Math.floor(Math.random() * 100)
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setPercentage(Math.floor(Math.random() * 100));
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [percentage]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: _colors.bg,
      }}
    >
      <StatusBar hidden />
      <AnimatedNumber
        percentage={percentage < 10 ? ` ${percentage}%` : `${percentage}%`}
        style={{ marginBottom: _spacing }}
        // percentage={percentage.toString()}
      />
      <>
        {[...Array(_items).keys()].reverse().map((i) => {
          const isActive = Math.floor((percentage * _items) / 100) >= i;
          return (
            <MView
              key={i}
              from={{
                backgroundColor: _colors.active,
              }}
              animate={{
                backgroundColor: isActive ? _colors.active : _colors.inactive,
              }}
              transition={{
                delay: isActive ? i * 100 : (_items - i) * 100,
              }}
              style={{
                width: _min + (i * (_max - _min)) / 15,
                height: 4,
                marginBottom: _spacing / 2,
                borderRadius: 10,
                backgroundColor: _colors.active,
              }}
            />
          );
        })}
      </>
    </View>
  );
};
