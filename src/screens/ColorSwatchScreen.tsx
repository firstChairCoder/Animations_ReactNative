import { useCallback, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import type {
  GestureUpdateEvent,
  PanGestureHandlerEventPayload
} from "react-native-gesture-handler";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const ITEM_WIDTH = 60;
const ITEM_HEIGHT = 250;

const PALETTE = [
  ["#C36B58", "#D8A0A4", "#D1B2C3"],
  ["#CA6A7B", "#E09CC0", "#D4ABD7"],
  ["#BB7AF8", "#D4ACFA", "#D8BFFB"],
  ["#7686F7", "#9DB7FF", "#A8C6FA"],
  ["#6782A9", "#B6D0ED", "#C3DAF6"],
  ["#000000", "#404459", "#7A809F"]
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20
  },
  paletteItemContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 4,
    position: "absolute"
  },
  palette: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH
  },
  innerAnchor: {
    borderRadius: 8,
    height: 16,
    width: 16
  },
  anchorWrapper: {
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    width: 50
  },
  outerAnchor: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 24,
    justifyContent: "center",
    width: 24
  },
  itemCommon: {
    borderRadius: 8,
    flex: 1,
    width: "100%"
  },
  topBar: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 4
  },
  middleBar: { marginBottom: 4 }
});

export const ColorSwatchScreen = () => {
  const activeGesture = useSharedValue(0);

  const [activeColor, setActiveColor] = useState("#404458");

  const getDegree = useCallback(
    (e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      "worklet";
      //Get an angle in radians, muliply by 180/PI to convert to deg:
      // "ITEM_HEIGHT - e.y" to take y axis value from bottom(0) to top(ITEM_HEIGHT), as opposed to gesture handler by
      // default returning top, i.e 0, to bottom, i.e. to ITEM_HEIGHT on the palette view
      // "e.x - ITEM_WIDTH / 2" to consider x's start point from the center of the width
      let degree =
        Math.atan2(ITEM_HEIGHT - e.y, e.x - ITEM_WIDTH / 2) * (180 / Math.PI);
      //This is to have possible 180 degree rotation on both sides while dragging
      degree < -90 && (degree = degree + 360);
      //Subtract from 90 as that is our initial palette's degree position
      return 90 - degree;
    },
    []
  );

  const dragGesture = Gesture.Pan()
    .onStart((e) => {
      activeGesture.value = getDegree(e);
    })
    .onUpdate((e) => {
      activeGesture.value = getDegree(e);
    })
    .onEnd(() => {
      activeGesture.value = activeGesture.value > 90 ? 90 : 0;
    });

  return (
    <>
      <StatusBar
        style={"light"}
        backgroundColor={activeColor}
        networkActivityIndicatorVisible
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: activeColor }]}
      >
        <View style={{ flex: 1, margin: 40, justifyContent: "flex-end" }}>
          <GestureDetector gesture={dragGesture}>
            <View style={styles.palette}>
              {PALETTE.map((colorsRow, index) => {
                return (
                  <Item
                    key={index}
                    colors={colorsRow}
                    onColorPress={setActiveColor}
                    {...{
                      activeColor,
                      index,
                      activeGesture
                    }}
                  />
                );
              })}
            </View>
          </GestureDetector>
        </View>
      </SafeAreaView>
    </>
  );
};

interface ItemProps {
  activeColor: string;
  colors: string[];
  activeGesture: SharedValue<number>;
  index: number;
  onColorPress: (color: string) => void;
}
function Item({
  activeColor,
  colors,
  activeGesture,
  index,
  onColorPress
}: ItemProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const angle = (activeGesture.value / (PALETTE.length - 1)) * index;

    return {
      transform: [
        { translateY: 100 },
        {
          rotate: withSpring(`${angle}deg`, {
            damping: 100,
            mass: 0.4
          })
        },
        { translateY: -100 }
      ]
    };
  }, [activeGesture]);

  const handleAnchorPress = useCallback(
    () => (activeGesture.value = activeGesture.value === 0 ? 90 : 0),
    [activeGesture]
  );

  return (
    <Animated.View
      style={[styles.paletteItemContainer, styles.palette, animatedStyle]}
    >
      <Pressable
        style={[
          styles.itemCommon,
          styles.topBar,
          { backgroundColor: colors[0] }
        ]}
        onPress={() => onColorPress(colors[0])}
      />
      <Pressable
        style={[
          styles.itemCommon,
          styles.middleBar,
          { backgroundColor: colors[1] }
        ]}
        onPress={() => onColorPress(colors[1])}
      />
      <Pressable
        style={[styles.itemCommon, { backgroundColor: colors[2] }]}
        onPress={() => onColorPress(colors[2])}
      />
      <Pressable style={styles.anchorWrapper} onPress={handleAnchorPress}>
        <View style={[styles.outerAnchor, { borderColor: activeColor }]}>
          <View
            style={[
              styles.innerAnchor,
              {
                backgroundColor: activeColor,
                borderColor: activeColor
              }
            ]}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}
