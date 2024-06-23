import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const styles = StyleSheet.create({
  front: {
    alignItems: "center",
    backgroundColor: "#D8D9CF",
    borderRadius: 16,
    height: 400,
    justifyContent: "center",
    position: "absolute",
    width: 250
  },
  back: {
    alignItems: "center",
    backfaceVisibility: "hidden",
    backgroundColor: "#FF8787",
    borderRadius: 16,
    height: 400,
    justifyContent: "center",
    width: 250,
    zIndex: 10
  }
});

export const CardFlipScreen = () => {
  const spin = useSharedValue<number>(0);

  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 })
        }
      ]
    };
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 })
        }
      ]
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32
      }}
    >
      <>
        <>
          <Animated.View style={[styles.front, rStyle]}>
            <Text>Front View</Text>
          </Animated.View>
          <Animated.View style={[styles.back, bStyle]}>
            <Text>Back View</Text>
          </Animated.View>
        </>
        <Pressable
          onPress={() => (spin.value = spin.value ? 0 : 1)}
          style={{ paddingTop: 32, alignItems: "center" }}
        >
          <Text style={{ fontSize: 16 }}>Flip</Text>
        </Pressable>
      </>
    </View>
  );
};
