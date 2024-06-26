import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue
} from "react-native-reanimated";
import { memo } from "react";

const { height } = Dimensions.get("window");
const imageBigHeight = Math.round(height * 0.7);
const imageSmallHeight = 80;
const styles = StyleSheet.create({
  image: {
    height: undefined,
    width: undefined,
    ...StyleSheet.absoluteFillObject
  },
  textContainer: {
    bottom: 0,
    left: 0,
    padding: 10,
    position: "absolute",
    right: 0
  },
  title: {
    color: "white",
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center"
  },
  subtitle: {
    color: "white",
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center"
  }
});

const ChannelItem = ({ path, scrollY, index, credit }) => {
  const inputRange = [imageBigHeight * (index - 1), imageBigHeight * index];
  const animatedImageHeight = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      inputRange,
      [imageSmallHeight, imageBigHeight],
      Extrapolation.CLAMP
    )
  );
  const animatedImage = useAnimatedStyle(() => ({
    height: animatedImageHeight.value
  }));
  const animatedTitleScale = useDerivedValue(() =>
    interpolate(scrollY.value, inputRange, [0.5, 1], Extrapolation.CLAMP)
  );
  const animatedTitle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: animatedTitleScale.value
      }
    ]
  }));
  const animatedSubTitleOpacity = useDerivedValue(() =>
    interpolate(scrollY.value, inputRange, [0, 1], Extrapolation.CLAMP)
  );
  const animatedSubTitle = useAnimatedStyle(() => ({
    opacity: animatedSubTitleOpacity.value
  }));

  return (
    <Animated.View style={animatedImage}>
      <Image source={path} style={styles.image} />
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.title, animatedTitle]}>
          Car {index + 1}
        </Animated.Text>
        <Animated.Text
          style={[styles.subtitle, animatedSubTitle]}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          Captured by - {credit} from Unsplash.
        </Animated.Text>
      </View>
    </Animated.View>
  );
};

export default memo(ChannelItem);
