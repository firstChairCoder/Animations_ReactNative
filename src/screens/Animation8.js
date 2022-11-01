/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
//WIP! related to Animation 15
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  ClipPath,
  G,
  Path,
  Rect,
  Text as SvgText,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");
const maxCups = 10;
const waveConfig = {
  height: height * 0.9,
  width: width,
  amplitude: 16,
  speed: 2.5,
  color: "#0099CC",
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 100,
    width,
  },
  btnTextWrapper: {
    backgroundColor: "#FFF",
    padding: 16,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export const Animation8 = () => {
  const [cups, setCups] = useState(1);
  const offset = useSharedValue(0);
  const waveHeight = useSharedValue(height);
  const amplitude = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    let lines = ``;
    for (let x = 0; x <= waveConfig.width; x += 1) {
      let y =
        amplitude.value *
          Math.sin(
            (360 / waveConfig.width) * ((x * Math.PI) / 180) -
              (offset.value * Math.PI) / 180
          ) +
        waveHeight.value;
      lines += ` L${x} ${y}`;
    }
    return {
      d: `
    M0 ${waveHeight.value}
    ${lines}
    L${waveConfig.width} ${height}
    L0 ${height}
    Z
  `,
    };
  });

  useEffect(() => {
    //
    // waveHeight.value = withTiming(height - height * cups / maxCups , {
    //   duration: 1000,
    // });

    // // higher we go, smaller the amplitude.
    // amplitude.value = withTiming(
    //   2 + (waveConfig.amplitude * height * cups / maxCups ) / height, {
    //     duration: 1000
    //   }
    // );
    offset.value = withRepeat(
      withTiming(waveConfig.width - 11, {
        duration: 2000 / waveConfig.speed,
        easing: Easing.linear,
      }),
      Infinity,
      false
    );
  }, []);

  useEffect(() => {
    // const newHeight = height * Math.random();
    waveHeight.value = withTiming(height - (height * cups) / (maxCups - 1), {
      duration: 1000,
    });

    // higher we go, smaller the amplitude.
    amplitude.value = withTiming(
      (waveConfig.amplitude *
        1.5 *
        (height - (height * cups) / (maxCups - 1))) /
        height,
      {
        duration: 1000,
      }
    );
  }, [cups]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <ClipPath id="clip">
          <G>
            <SvgText
              x="50%"
              y="50%"
              fontSize={Math.floor(width * 0.6)}
              fontWeight="bold"
              textAnchor="middle"
            >
              {cups}
            </SvgText>
            <AnimatedPath animatedProps={animatedProps} />
          </G>
        </ClipPath>

        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          //   fill="url(#grad)"
          fill={waveConfig.color}
          clipPath="url(#clip)"
          strokeLinejoin="miter"
          strokeMiterlimit={0}
        />
      </Svg>

      <TouchableOpacity
        onPress={() => {
          setCups((cups) => {
            return cups + 1;
          });
          console.log(cups);
        }}
        style={styles.btn}
      >
        <View style={styles.btnTextWrapper}>
          <Text style={{ fontWeight: "700", textTransform: "uppercase" }}>
            Press for more water
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
