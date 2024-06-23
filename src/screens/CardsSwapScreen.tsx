//Inspo: https://twitter.com/jmtrivedi/status/1541458610143625218

import { useMemo } from "react";
import {
  ImageBackground,
  SafeAreaView,
  useWindowDimensions,
  View
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

import mac_sur_dark from "../../assets/images/macos_bigsur_dark.jpeg";
import mac_sur_light from "../../assets/images/macos_bigsur_light.jpeg";
import mac_monterey from "../../assets/images/macos_monterey.jpeg";
import mac_ventura from "../../assets/images/macos_ventura.jpeg";

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

export const CardsSwapScreen = () => {
  const activeItem = useSharedValue(0);
  const lastActiveItem = useSharedValue(1);

  const itemsIndex = useSharedValue([0, 1, 2, 3]);

  const cards = useMemo(
    () => [mac_sur_light, mac_monterey, mac_ventura, mac_sur_dark],
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 16, marginTop: 32 }}>
        {cards.map((img, index) => (
          <CardItemView
            key={index}
            img={img}
            itemsIndex={itemsIndex}
            activeItem={activeItem}
            lastActiveItem={lastActiveItem}
            index={index}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

function CardItemView({ img, index, activeItem, lastActiveItem, itemsIndex }) {
  const { width, height } = useWindowDimensions();
  const isDragging = useSharedValue(false);
  const position = useSharedValue({ x: 0, y: 0 });

  const smallWidth = (width - 32 * 4) / 3;
  const smallHeight = smallWidth * 1.4;
  const expandedWidth = width - 64;
  const expandedHeight = expandedWidth * 1.4;

  const itemState = useSharedValue(itemsIndex.value[index] !== 0 ? 1 : 0);

  const dragGesture = Gesture.Pan()
    .onStart((_e) => {
      // console.log('translatex', _e);
    })
    .onUpdate((e) => {
      isDragging.value = true;
      // console.log('e velocity', e.translationX, e.translationY);

      position.value = { x: e.translationX, y: e.translationY };
    })
    .onEnd((e) => {
      // console.log('e velocity', e.velocityX, e.translationX);
      isDragging.value = false;
      position.value = { x: 0, y: 0 };
      if (itemsIndex.value[index] !== 0) {
        itemsIndex.value[itemsIndex.value.indexOf(0)] = itemsIndex.value[index];
        itemsIndex.value[index] = 0;
      } else {
        if (e.translationY > 32) {
          const swapPos = Math.ceil(e.absoluteX / (width / 3));
          // console.log('before', swapPos, itemsIndex);
          const indexOfPosition = itemsIndex.value.indexOf(swapPos);
          itemsIndex.value[index] = itemsIndex.value[indexOfPosition];
          itemsIndex.value[indexOfPosition] = 0;
          // console.log('after', swapPos, itemsIndex);
        }
      }
      itemsIndex.value = [...itemsIndex.value];
    });

  const imgStyle = useAnimatedStyle(() => {
    // console.log('activeItem.value', itemsIndex.value, index);

    itemState.value = withTiming(itemsIndex.value[index] !== 0 ? 1 : 0, {
      duration: 200
    });

    const finalX =
      -(expandedWidth + (smallWidth / 2 + 16)) +
      (expandedWidth + smallWidth + 32) * (itemsIndex.value[index] - 1);
    const endTransX = itemsIndex.value[index] !== 0 ? finalX : 0;
    // let endTransX = interpolate(itemState.value, [0, 1], [0, finalX]);
    /* if (lastActiveItem.value === index) {
      endTransX =
        -(expandedWidth + (smallWidth / 2 + 16)) +
        (expandedWidth + smallWidth + 32) * (activeItem.value - 1);
    } */
    const finalY = expandedHeight * 2 + smallHeight * 2 + 48;
    const endTransY = itemsIndex.value[index] !== 0 ? finalY : 0;
    // let endTransY = interpolate(itemState.value, [0, 1], [0, finalY]);

    // let endTransX = interpolate(endTransY, [0, finalY / 2, finalY], [0, itemsIndex.value[index] !== 0 ? finalX + (finalY) : -(finalX + (finalY)), finalX]);

    const scaleInterpolate = interpolate(
      // itemState.value,
      endTransY,
      [0, finalY],
      [1, smallWidth / expandedWidth]
    );

    return {
      // transform: [
      //   { scale: withSpring(isDragging.value ? 1.2 : 1) },
      //   { translateX: withSpring(position.value.x) },
      //   { translateY: withSpring(position.value.y) },
      // ],
      transform: [
        {
          scale: withSpring(
            // itemsIndex.value[index] !== 0 ? smallWidth / expandedWidth : 1,
            scaleInterpolate,
            { damping: 24, stiffness: 70 }
          )
        },
        {
          translateX: withSpring(
            isDragging.value
              ? itemsIndex.value[index] === 0
                ? position.value.x
                : position.value.x / (smallWidth / expandedWidth) + endTransX
              : endTransX,
            // { damping: 16, mass: 0.8 },
            { stiffness: 50 }
          )
        },
        {
          translateY: withSpring(
            isDragging.value
              ? itemsIndex.value[index] === 0
                ? position.value.y
                : position.value.y / (smallWidth / expandedWidth) + endTransY
              : endTransY,
            // { mass: 0.7 },
            { stiffness: 50 }
          )
        }
      ],
      zIndex: isDragging.value ? 999 : 99
    };
    // : {};
  });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(dragGesture)}>
      <AnimatedImageBackground
        style={[
          {
            position: "absolute",
            height: expandedWidth * 1.4,
            width: expandedWidth,
            borderRadius: 24,
            marginVertical: 16,
            overflow: "hidden"
          },
          imgStyle
        ]}
        source={img}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: 24,
            borderWidth: 10
          }}
        />
      </AnimatedImageBackground>
    </GestureDetector>
  );
}
