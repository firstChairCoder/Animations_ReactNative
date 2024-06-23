import { Image, StyleSheet, Text, View } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 32
  },
  image: {
    aspectRatio: 1,
    height: 180,
    resizeMode: "contain",
    width: 190,
    zIndex: 450
  },
  card: {
    alignItems: "center",
    backgroundColor: "#F5EBE0",
    borderRadius: 16,
    elevation: 2,
    justifyContent: "space-around",
    padding: 16,
    shadowOffset: { height: -4, width: 0 },
    shadowRadius: 7,
    zIndex: 400
  },
  desc: {
    fontSize: 12
  },
  heading: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase"
  },
  ctaContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  addCta: {
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 8,
    height: 24,
    justifyContent: "center",
    width: "80%"
  }
});

export const ProductCardScreen = () => {
  //constants
  const CARD_HEIGHT = 360;
  const CARD_WIDTH = 220;

  //shared Values for card
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  //shared Values for images
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedCardStyle = useAnimatedStyle(() => {
    const rX = `${rotateX.value}deg`;
    const rY = `${rotateY.value}deg`;

    return {
      transform: [
        {
          perspective: 400
        },
        { rotateY: rY },
        { rotateX: rX }
      ]
    };
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      marginBottom: -10,
      zIndex: 300,
      transform: [
        { perspective: 800 },
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    };
  }, []);

  const handleGesture =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (event) => {
        scale.value = withTiming(1.05);
        rotateX.value = withTiming(
          interpolate(event.y, [0, CARD_HEIGHT], [20, -20], Extrapolation.CLAMP)
        );
        rotateY.value = withTiming(
          interpolate(event.x, [0, CARD_WIDTH], [-20, 20], Extrapolation.CLAMP)
        );
        translateX.value = withTiming(
          interpolate(
            event.x,
            [0, CARD_WIDTH / 2, CARD_WIDTH],
            [-40, 0, 40],
            Extrapolation.CLAMP
          )
        );
        translateY.value = withTiming(
          interpolate(
            event.y,
            [0, CARD_HEIGHT / 2, CARD_HEIGHT],
            [-40, 0, 40],
            Extrapolation.CLAMP
          )
        );
      },
      onActive: (event: any) => {
        rotateX.value = interpolate(
          event.y,
          [0, CARD_HEIGHT],
          [20, -20],
          Extrapolation.CLAMP
        );
        rotateY.value = interpolate(
          event.x,
          [0, CARD_WIDTH],
          [-20, 20],
          Extrapolation.CLAMP
        );
        translateX.value = interpolate(
          event.x,
          [0, CARD_WIDTH / 2, CARD_WIDTH],
          [-40, 0, 40],
          Extrapolation.CLAMP
        );

        translateY.value = interpolate(
          event.y,
          [0, CARD_HEIGHT / 2, CARD_HEIGHT],
          [-40, 0, 40],
          Extrapolation.CLAMP
        );
      },
      onFinish: () => {
        scale.value = withTiming(1);
        rotateX.value = withSpring(0);
        rotateY.value = withSpring(0);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  return (
    <View style={styles.container}>
      <>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View
            style={[
              styles.card,
              animatedCardStyle,
              { height: CARD_HEIGHT, width: CARD_WIDTH }
            ]}
          >
            <Animated.View style={animatedImageStyle}>
              <Image
                source={require("../../assets/images/logo.png")}
                style={styles.image}
              />
            </Animated.View>
            <>
              <Text style={styles.heading}>Pav bhaji</Text>
              <Text style={styles.desc}>
                Pav bhaji (Marathi : पाव भाजी) is a fast food dish from India
                consisting of a thick vegetable curry (bhaji) served with a soft
                bread roll (pav). Its origins are in the state of Maharashtra.
              </Text>
            </>
            <View style={styles.ctaContainer}>
              <View style={styles.addCta}>
                <Text style={{ fontSize: 12, color: "white" }}>
                  Add To Cart
                </Text>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </>
    </View>
  );
};
