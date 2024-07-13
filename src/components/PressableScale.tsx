import type { FC, ReactNode } from "react";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

interface PressableScaleProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children: ReactNode;
}

const PressableScale: FC<PressableScaleProps> = ({
  style,
  onPress,
  children
}) => {
  const scale = useSharedValue(1);

  const gesture = Gesture.Tap()
    .maxDuration(10000)
    .onTouchesDown(() => {
      scale.value = withTiming(0.9);
    })
    .onTouchesUp(() => {
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onFinalize(() => {
      scale.value = withTiming(1);
    });

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  }, []);
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, rButtonStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default PressableScale;
