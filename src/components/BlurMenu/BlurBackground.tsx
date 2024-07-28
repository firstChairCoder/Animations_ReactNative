import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedProps,
  withTiming
} from "react-native-reanimated";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BlurBackground = ({ isBlur }: { isBlur: boolean }) => {
  //   const colorScheme = useColorScheme();
  const animatedProps = useAnimatedProps(() => {
    const intensity = isBlur
      ? withTiming(100, { duration: 500 })
      : withTiming(0, { duration: 500 });

    return {
      intensity
    };
  }, [isBlur]);

  return (
    <AnimatedBlurView
      pointerEvents={isBlur ? "auto" : "none"}
      tint={"light"}
      animatedProps={animatedProps}
      style={{ flex: 1, ...StyleSheet.absoluteFillObject }}
    />
  );
};

export default BlurBackground;
