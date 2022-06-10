import type { FC } from "react";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text } from "react-native-design-utility";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useWorkletCallback,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome as Icon } from "@expo/vector-icons";
import type {
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";

import { theme } from "../../theme";
import { clamp } from "../utils/clamp";

const ITEM_SIZE = 70;
const { width } = Dimensions.get("window");
const THRESHOLD = width / 3;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: ITEM_SIZE,
    paddingVertical: 16,
    alignItems: "center",
  },
  icon: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    position: "absolute",
    right: "5%",
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "90%",
    height: ITEM_SIZE,
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#CECECE",
    elevation: 5,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
  },
});

type PanGestureContext = { translateX: number };
interface Props extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  onDismiss: (text: string) => void;
  children: string;
}

const TaskItem: FC<Props> = (props) => {
  const itemHeight = useSharedValue<number>(ITEM_SIZE);
  const margin = useSharedValue<number>(16);
  const opacity = useSharedValue<number>(0);
  const translateX = useSharedValue<number>(0);

  const removeItemAnimation = useWorkletCallback(() => {
    translateX.value = withTiming(-width);
    itemHeight.value = withTiming(0);
    margin.value = withTiming(0);
    opacity.value = withTiming(0, undefined, (finished) => {
      if (finished) {
        runOnJS(props.onDismiss)(props.children);
      }
    });
  }, []);

  const animatedStyle = useAnimatedStyle(
    () => ({
      height: itemHeight.value,
      marginVertical: margin.value,
    }),
    []
  );

  const animatedOpacity = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    []
  );

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContext
  >(
    {
      onStart: (_, context) => {
        cancelAnimation(translateX);
        context.translateX = translateX.value;
      },
      onActive: (event, context) => {
        const nextTranslateX = event.translationX + context.translateX;
        if (nextTranslateX < 0) {
          translateX.value = nextTranslateX;
          opacity.value = clamp(Math.abs(nextTranslateX) / THRESHOLD, {
            min: 0,
            max: 1,
          });
        }
      },
      onEnd: () => {
        if (Math.abs(translateX.value) < THRESHOLD) {
          translateX.value = withSpring(0);
        } else {
          removeItemAnimation();
        }
      },
    },
    []
  );

  const animatedTranslate = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    }),
    []
  );

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.View style={[styles.icon, animatedOpacity]}>
        <Icon name="trash" size={ITEM_SIZE / 3} color={theme.color.red} />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={props.simultaneousHandlers}
        onGestureEvent={panGestureHandler}
      >
        <Animated.View style={[styles.content, animatedTranslate]}>
          <Text size={16}>{props.children}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default TaskItem;
