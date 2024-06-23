import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import styled from "styled-components/native";

import cloud from "../../../../assets/images/clouds.png";

const ACloud = styled(Animated.Image)`
  height: 400px;
  width: 400px;
  position: absolute;
  align-self: center;
  bottom: 40px;
  z-index: 9999;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
`;

interface CloudProps {
  confirmed: boolean;
  size?: "lg" | "md";
  zIndex?: number;
  delay?: number;
  bottom: number;
  noShadow?: boolean;
}

export const Cloud = ({
  size = "md",
  bottom = 200,
  zIndex = 1,
  noShadow = false,
  confirmed,
  delay
}: CloudProps) => {
  const { width } = useWindowDimensions();
  const sizeValue =
    size === "lg"
      ? { height: 1500, width: 2000 }
      : { height: 1000, width: 800 };

  const offset = sizeValue.width / 3 + width;

  const translateX = useSharedValue(offset);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    ...sizeValue,
    bottom,
    zIndex,
    shadowOpacity: noShadow ? 0 : 0.08
  }));

  useEffect(() => {
    if (confirmed) {
      setTimeout(
        () =>
          (translateX.value = withTiming(-offset, {
            duration: 6000,
            easing: Easing.linear
          })),
        8000 + delay
      );
    }
  }, [confirmed]);

  return <ACloud source={cloud} resizeMode="contain" style={animatedStyle} />;
};
/*
export const Cloud = () => {
	return (
		<Text>Oh, no</Text>
		)
}
*/
