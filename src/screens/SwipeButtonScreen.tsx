import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");

const SWIPER_HEIGHT = 60;
const SWIPER_PADDDING = 5;
const PADDING = 30;
const CONTAINER_WIDTH = width - PADDING * 2;
const SWIPEABLE_DIMENSIONS =
  SWIPER_HEIGHT - SWIPER_PADDDING * 2 - 2 * SWIPER_PADDDING;

const H_SWIPE_RANGE =
  CONTAINER_WIDTH - 2 * SWIPER_PADDDING - SWIPEABLE_DIMENSIONS - 10;

const styles = StyleSheet.create({
  swipeContainer: {
    alignItems: "center",
    backgroundColor: "#354259",
    borderRadius: SWIPER_HEIGHT,
    height: SWIPER_HEIGHT,
    justifyContent: "center",
    width: CONTAINER_WIDTH
  },
  swipeThumb: {
    alignItems: "center",
    backgroundColor: "#C2DED1",
    borderRadius: SWIPER_HEIGHT,
    height: SWIPER_HEIGHT - SWIPER_PADDDING * 2,
    justifyContent: "center",
    left: SWIPER_PADDDING,
    position: "absolute",
    top: SWIPER_PADDDING,
    width: SWIPER_HEIGHT - SWIPER_PADDDING * 2,
    zIndex: 5
  },
  swipeText: {
    color: "#C2DED1",
    fontSize: 16,
    fontWeight: "600"
  }
});

type ContextType = {
  translateX: number;
  completed: boolean;
};

function Swiper({ onComplete }: { onComplete: (isToggled: boolean) => void }) {
  const [toggled, setToggled] = useState(false);
  const translationX = useSharedValue(0);

  const handleComplete = (isToggled: boolean) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onComplete(isToggled);
    }
  };

  const handleGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.translateX = translationX.value;
      context.completed = toggled;
    },
    onActive: (event, context) => {
      let newValue;
      if (context.completed) {
        newValue = H_SWIPE_RANGE + event.translationX;
      } else {
        newValue = event.translationX;
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        translationX.value = newValue;
      }
    },

    onEnd: () => {
      if (translationX.value < CONTAINER_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        translationX.value = withTiming(0);
        runOnJS(handleComplete)(false);
      } else {
        translationX.value = withTiming(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
    }
  });

  const rThumbStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translationX.value,
      [0, H_SWIPE_RANGE],
      [0, 180],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translationX.value },
        { rotateZ: `${rotate.toString()}deg` }
      ]
    };
  });

  return (
    <View style={styles.swipeContainer}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View style={[rThumbStyle, styles.swipeThumb]}>
          <AntDesign name="arrowright" size={22} color="#354259" />
        </Animated.View>
      </PanGestureHandler>
      <Text style={styles.swipeText}>
        {!toggled ? "Swipe To Complete" : "Completed"}
      </Text>
    </View>
  );
}

export const SwipeButtonScreen = () => {
  const [isSwiped, setIsSwiped] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32
      }}
    >
      <Text style={{ paddingBottom: 16, fontSize: 16 }}>
        {isSwiped ? "Button Swiped" : "Button not swiped"}
      </Text>
      <Swiper onComplete={(isToggled: boolean) => setIsSwiped(isToggled)} />
    </View>
  );
};
