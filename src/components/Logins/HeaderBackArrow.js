import { StyleSheet } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import { Ionicons as Icon } from "@expo/vector-icons";
import { TapGestureHandler } from "react-native-gesture-handler";

const HeaderBackArrow = ({ isOpenAnimation, gestureHandler }) => {
  const opacity = interpolate(isOpenAnimation, {
    inputRange: [0, 0.7, 1],
    outputRange: [0, 0, 1]
  });

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View style={{ ...styles.backArrow, opacity }}>
        <Icon name="md-arrow-back" size={24} />
      </Animated.View>
    </TapGestureHandler>
  );
};
export default HeaderBackArrow;

const styles = StyleSheet.create({
  backArrow: {
    height: 60,
    left: 25,
    position: "absolute",
    top: 60,
    width: 60,
    zIndex: 100
  }
});
