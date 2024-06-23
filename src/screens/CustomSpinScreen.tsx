import type { PropsWithChildren } from "react";
import { useLayoutEffect } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Image, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

type SpinProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  duration?: number;
}>;
export const SpinAnimation = ({
  children,
  style,
  duration = 2000
}: SpinProps) => {
  const progress = useSharedValue(0);

  useLayoutEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration,
        easing: Easing.linear
      }),
      -1
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    const rotation = Math.ceil(progress.value * 360);
    return { transform: [{ rotate: `${rotation}deg` }] };
  });

  return (
    <Animated.View style={[style, animatedStyles]}>{children}</Animated.View>
  );
};

export const CustomSpinScreen = ({
  color,
  size = 12
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <SpinAnimation>
        <Svg height={size} width={size}>
          <Path
            d="M11.5 5.75a.75.75 0 1 1-1.5 0A4.25 4.25 0 1 0 5.75 10a.75.75 0 0 1 0 1.5 5.75 5.75 0 1 1 5.75-5.75z"
            fill={color || "blue"}
          />
        </Svg>
      </SpinAnimation>
      <View style={{ height: 40 }} />

      <SpinAnimation duration={1500}>
        <Image
          source={require("../../assets/images/spyro_dragon.png")}
          style={{ height: 48, width: 48 }}
        />
      </SpinAnimation>
    </View>
  );
};
