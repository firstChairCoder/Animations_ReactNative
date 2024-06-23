import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming
} from "react-native-reanimated";

const N = 12;
const SQUARE_SIZE = 12;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#17161A",
    flex: 1,
    justifyContent: "center"
  }
});

export const SquareRotationScreen = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear
      }),
      -1
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />
      {new Array(N).fill(0).map((_, index) => {
        return <Square key={index} progress={progress} index={index} />;
      })}
    </View>
  );
};

interface SquareProps {
  index: number;
  progress: Animated.SharedValue<number>;
}

function Square({ index, progress }: SquareProps) {
  const offsetAngle = (2 * Math.PI) / N;
  const finalAngle = offsetAngle * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }
    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }

    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE);
    }

    return withTiming(-index * SQUARE_SIZE);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}rad` },
        { translateY: translateY.value }
      ]
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: SQUARE_SIZE,
          aspectRatio: 1,
          backgroundColor: "white",
          //   opacity: (index + 1) / N,
          position: "absolute"
        },
        rStyle
      ]}
    />
  );
}
