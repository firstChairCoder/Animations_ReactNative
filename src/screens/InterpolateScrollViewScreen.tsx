import { Dimensions, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";

const WORDS = ["The", "obliquity", "of", "the", "ecliptic"];
const { height, width } = Dimensions.get("window");
const SIZE = width * 0.7;

export const InterpolateScrollViewScreen = () => {
  const translateX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      horizontal
      onScroll={onScroll}
      style={{ flex: 1, backgroundColor: "snow" }}
    >
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

interface PageProps {
  index: number;
  translateX: Animated.SharedValue<number>;
  title: string;
}

const Page = ({ title, index, translateX }: PageProps) => {
  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      borderRadius
    };
  });

  const animatedWrapperStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
      opacity
    };
  });

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width,
        height,
        backgroundColor: `rgba(0,0,256, 0.${index + 2})`
      }}
    >
      <Animated.View
        style={[
          {
            width: SIZE,
            height: SIZE,
            backgroundColor: "rgba(0, 0, 256, 0.45)"
          },
          animatedStyle
        ]}
      />

      <Animated.View style={[{ position: "absolute" }, animatedWrapperStyle]}>
        <Text
          style={{
            fontSize: 60,
            color: "lime",
            textTransform: "uppercase",
            fontWeight: "700"
          }}
        >
          {title}
        </Text>
      </Animated.View>
    </View>
  );
};
