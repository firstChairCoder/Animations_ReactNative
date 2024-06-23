import type { StyleProp, ViewStyle } from "react-native";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { BUTTONS } from "../data/buttonsData";

const TOOLBAR_HEIGHT = 50 * 7 + 16 * 8;
// 50 = icon height, 7 = total visible items, 16 * 8 = 7 item's and +1 for main toolbar top + bottom padding (16)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    backgroundColor: "#313a44"
  },
  toolbarHead: {
    backgroundColor: "#313A44",
    borderRadius: 12,
    elevation: 32,
    height: TOOLBAR_HEIGHT,
    marginHorizontal: 24,
    marginVertical: 40,
    shadowColor: "rgb(128, 128, 128, 0.6)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    width: 66
  },
  btnList: {
    position: "absolute",
    height: TOOLBAR_HEIGHT,
    width: "100%",
    marginHorizontal: 24,
    marginVertical: 40,
    // Note:- This elevation here is just to avoid the scroll not working issue on Android. It won't show unless 'backgroundColor' is added.
    elevation: 32
  },
  btn: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 12,
    flexDirection: "row",
    height: 50,
    marginVertical: 8,
    padding: 12,
    width: 50
  },
  btnTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12
  }
});

export const ToolbarDemoScreen = () => {
  // This activates Pan Gesture only after long press, avoiding conflict with scrolling.
  const isGestureActive = useSharedValue(false);
  // Active press point within TOOLBAR_HEIGHT, 0 when not active.
  const activeY = useSharedValue(0);
  // Contains list scroll offset from top. In (-) when user scroll past the top on iOS (important to activate Rubberbanding effect).
  const scrollOffset = useSharedValue(0);

  // Activating gestures only when any of the items is active (after long press)
  // Ref:- https://github.com/software-mansion/react-native-gesture-handler/issues/1933#issuecomment-1070701283

  const dragGesture = Gesture.Pan() //start with default dragging config
    .manualActivation(true) //stops handler from activating automatically
    .onTouchesMove((_, state) => {
      //sets on every finger move after initial drag
      isGestureActive.value ? state.activate() : state.fail(); //pan gesture activates using the sharedvalue, i.e. after drag
    })
    .onStart((_e) => {
      //gesture is in active state
      activeY.value = _e.y;
    })
    .onUpdate((e) => {
      //updates onStart while active(pretty straightforward)
      activeY.value = e.y;
    })
    .onEnd(() => {
      //ends drag, resets to 0.
      activeY.value = 0;
    })
    .onFinalize(() => {
      //called after end or "false start", resets sharedValue for gesture
      isGestureActive.value = false;
    });

  const longPressGesture = Gesture.LongPress() //start with default longpress config
    .minDuration(200) //time for longpress to "register" in ms...default 500ms
    .onStart((_event) => {
      //gesture is in active state, and activeY takes note of position on screen
      isGestureActive.value = true;
      activeY.value = _event.y;
    })
    .onEnd((_event) => {
      //end longPress, reset activeY
      activeY.value = 0;
    });

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollOffset.value = e.contentOffset?.y ?? 0;
  });

  return (
    <>
      <StatusBar style={"light"} backgroundColor={"#313a44"} />
      <SafeAreaView style={styles.container}>
        <BackButton />
        <>
          <View style={[styles.toolbarHead]} />
          <GestureDetector
            gesture={Gesture.Simultaneous(dragGesture, longPressGesture)}
          >
            <Animated.FlatList
              style={styles.btnList}
              contentContainerStyle={{ padding: 8 }}
              data={BUTTONS}
              renderItem={({ item, index }) => {
                return (
                  <Button offset={scrollOffset} {...{ item, activeY, index }} />
                );
              }}
              onScroll={scrollHandler}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
            />
          </GestureDetector>
        </>
      </SafeAreaView>
    </>
  );
};

//simple back button
const BackButton = ({ style }: { style: StyleProp<ViewStyle> }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          marginRight: 16,
          marginTop: 32,
          paddingLeft: 8,
          alignSelf: "flex-end"
        },
        { opacity: pressed ? 0.6 : 1 },
        style
      ]}
      android_ripple={{ color: "darkgray", borderless: true, radius: 24 }}
      onPress={() => navigation.goBack()}
    >
      <Icon name="arrow-back-ios" size={20} color="white" />
    </Pressable>
  );
};

const ITEM_HEIGHT = 50 + 8 * 2; // 50 = icon height, 8 * 2 = top + bottom padding
const TOTAL_HEIGHT = ITEM_HEIGHT * 24 + 16; // == 1600, 24 == item count, 16 == top + bottom padding

interface ButtonProps {
  item: (typeof BUTTONS)[0];
  index: number;
  activeY: SharedValue<number>;
  offset: SharedValue<number>;
}
const Button = ({ item, index, activeY, offset }: ButtonProps) => {
  const itemEndPos = (index + 1) * ITEM_HEIGHT + 8; // 8 is for top padding here
  const itemStartPos = itemEndPos - ITEM_HEIGHT;

  const isItemActive = useDerivedValue(() => {
    //derived because activeY and offset are shared refs.
    const pressedPoint = activeY.value + offset.value;
    const isValid = pressedPoint >= itemStartPos && pressedPoint < itemEndPos;
    return activeY.value !== 0 && isValid ? true : false;
  }, [activeY]); //depends on activeY

  const animatedStyle = useAnimatedStyle(() => {
    // Max user can scroll (max scroll offset)
    // To activate Rubberbanding effect after overscroll on iOS??
    const endScrollLimit = TOTAL_HEIGHT - TOOLBAR_HEIGHT;
    const scrollValidLimit = offset.value > 0 ? endScrollLimit : 0;

    const isItemOutOfView =
      itemEndPos < offset.value || itemStartPos > offset.value + TOOLBAR_HEIGHT;
    //calculate if icon is scrolled away either if the endPos is less than offset
    // or startPos is greater than sum of offset and toolbar height(overflow)

    return {
      width: withSpring(isItemActive.value ? 140 : 50, { damping: 15 }), //damping controls deceleration of animation def. 10
      // For Scroll Rubberbanding effect
      top:
        offset.value < 0 // is Top?
          ? (index + 1) * Math.abs(offset.value / 10)
          : offset.value > endScrollLimit // is Bottom?
          ? -(24 - index + 1) * Math.abs((offset.value - scrollValidLimit) / 10)
          : 0,
      // translate & scaling when icon is (in)active
      transform: [
        {
          translateX: withTiming(isItemActive.value ? 55 : 0, {
            duration: 250,
            easing: Easing.out(Easing.quad)
          })
        },
        // Item scaling, 1.2 = Active, 0.4 = out of view, 1 = default
        {
          scale: withTiming(
            isItemActive.value ? 1.2 : isItemOutOfView ? 0.4 : 1,
            { duration: 250 } //lasts for 250ms
          )
        }
      ]
    };
  });

  // Scale down the view that contains the icon,
  // so that container view's scaling when it's active, have no effect on the icon
  const innerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(isItemActive.value ? 0.8 : 1, {
            duration: 250
          })
        }
      ]
    };
  });

  //dark when not selected
  const titleOpacity = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isItemActive.value ? 1 : 0, { duration: 250 })
    };
  }, [isItemActive]);

  return (
    <Animated.View
      style={[styles.btn, { backgroundColor: item.color }, animatedStyle]}
    >
      <Animated.View style={[innerAnimatedStyle]}>
        <Icon name={item.icon} color="white" size={24} />
      </Animated.View>

      <Animated.Text style={[styles.btnTitle, titleOpacity]}>
        {item.title}
      </Animated.Text>
    </Animated.View>
  );
};

/*
import { View } from "react-native";

export const ToolbarDemoScreen = () => {
	return (
	<View style={{ flex: 1, backgroundColor: "lime" }} />
	)
}
1. dark mode statusbar

*/
