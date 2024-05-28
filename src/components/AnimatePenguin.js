import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const AnimatedPenguin = ({ size, penguinPressed }) => {
  const awakePenguin = useAnimatedStyle(() => ({
    opacity: penguinPressed.value ? 1 : 0,
  }));
  const asleepPenguin = useAnimatedStyle(() => ({
    opacity: penguinPressed.value ? 0 : 1,
  }));

  return (
    <View
      style={{
        height: size,
        width: size,
      }}
    >
      <Animated.Image
        style={[
          StyleSheet.absoluteFill,
          {
            height: undefined,
            width: undefined,
          },
          awakePenguin,
        ]}
        source={require("../../assets/images/channels/awakePenguin.webp")}
      />

      <Animated.Image
        style={[
          StyleSheet.absoluteFill,
          {
            height: undefined,
            width: undefined,
          },
          asleepPenguin,
        ]}
        source={require("../../assets/images/channels/asleepPenguin.webp")}
      />
    </View>
  );
};

export default AnimatedPenguin;
