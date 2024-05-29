// Inspiration: https://dribbble.com/shots/4707036-Switcher-XXXVIII
import { Pressable, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { MotiView } from "moti";
import { useCallback, useMemo, useState } from "react";

const colors = {
  on: "rgba(73,233,138,1)",
  off: "rgba(253,63,80,1)"
};

function AwesomeSwitch({
  disabled = false,
  size = 64,
  value = false,
  onValueChange
}) {
  const [switchState, setSwitchState] = useState(value);

  const switchStateValue = useSharedValue(value ? 1 : 0);

  const onPress = useCallback(() => {
    onValueChange?.(!switchState);
    setSwitchState(!switchState);
    switchStateValue.value = withSpring(!switchState ? 1 : 0);
  }, [onValueChange, value, switchState]);

  const sizes = useMemo(
    () => ({
      track: size,
      thumb: size / 2,
      border: size / 6
    }),
    [size]
  );

  const v = useDerivedValue(() => {
    return interpolateColor(
      switchStateValue.value,
      [0, 1],
      [colors.off, colors.on]
    );
  });

  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: v.value,
      shadowColor: v.value
    };
  });

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <Animated.View
        style={[
          {
            width: sizes.track,
            height: sizes.track,
            borderRadius: sizes.track / 2,
            justifyContent: "center",
            alignItems: "center",
            shadowOffset: {
              width: 0,
              height: 0
            },
            shadowOpacity: 0.8,
            shadowRadius: sizes.border,
            // shadowColor: "#000000",
            elevation: sizes.border
          },
          stylez
        ]}
      >
        <MotiView
          animate={{
            width: switchState ? 0 : sizes.thumb,
            borderWidth: switchState ? sizes.border * 0.67 : sizes.border
          }}
          style={{
            height: sizes.thumb,
            borderRadius: sizes.thumb / 2,
            borderColor: "#fff"
          }}
        />
      </Animated.View>
    </Pressable>
  );
}

const Animation45 = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#ecf0f1",
        padding: 8
      }}
    >
      <StatusBar hidden />
      <AwesomeSwitch size={128} />
    </View>
  );
};

export default Animation45;
