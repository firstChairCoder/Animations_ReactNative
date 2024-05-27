/* eslint-disable react-native/no-inline-styles */
//WIP!
import { useEffect } from "react";
import { SafeAreaView, TextInput, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const radius = 45;
const circumference = radius * Math.PI * 2;
const duration = 3000;
const value = 20; //dummy value

export const Animation13 = () => {
  const strokeOffset = useSharedValue(circumference);

  const percentage = useDerivedValue(() => {
    const number =
      ((circumference - strokeOffset - value) / circumference) * 100;

    return withTiming(number, { duration: duration });
  });

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(
      percentage.value,
      [0, 50, 100],
      ["rgb(246,79,89)", "rgb(246,246,89)", "rgb(79,246,89)"]
    );
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashOffset: withTiming(strokeOffset.valie, { duration: duration }),
      stroke: strokeColor.value,
    };
  }, []);

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)}%`,
    };
  }, []);

  useEffect(() => {
    strokeOffset.value = 0;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#17021A" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AnimatedText
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            position: "absolute",
          }}
          animatedProps={animatedTextProps}
        />
        <Svg height="50%" width="50%" viewBox="0 0 100 100">
          <AnimatedCircle
            animatedProps={animatedCircleProps}
            cx="50"
            cy="45"
            r="45"
            stroke="rgb(246,79,89)"
            strokeWidth="5"
            fill="rgba(255,255,255,0.2)"
            strokeDashArray={`${radius * Math.PI * 2}`}
          />
        </Svg>
      </View>
    </SafeAreaView>
  );
};
