/**
 * Inspiration: https://dribbble.com/shots/3431451-HUNGRY
 */
import {
  Alert,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const colors = {
  yellow: "#FFE8A3",
  dark: "#2D2D2D"
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight
  },
  itemWrapper: {
    alignItems: "center",
    flexDirection: "row",
    height: ITEM_HEIGHT,
    justifyContent: "space-between"
  },
  itemText: {
    fontSize: 26,
    fontWeight: "800",
    textTransform: "capitalize"
  }
});

const data = [
  {
    icon: "social-tumblr",
    name: "tumblr"
  },
  {
    icon: "social-twitter",
    name: "twitter"
  },
  {
    icon: "social-facebook",
    name: "facebook"
  },
  {
    icon: "social-instagram",
    name: "instagram"
  },
  {
    icon: "social-linkedin",
    name: "linkedin"
  },
  {
    icon: "social-pinterest",
    name: "pinterest"
  },
  {
    icon: "social-github",
    name: "github"
  },
  {
    icon: "social-google",
    name: "google"
  },
  {
    icon: "social-reddit",
    name: "reddit"
  },
  {
    icon: "social-skype",
    name: "skype"
  },
  {
    icon: "social-dribbble",
    name: "dribbble"
  },
  {
    icon: "social-behance",
    name: "behance"
  },
  {
    icon: "social-foursqare",
    name: "foursquare"
  },
  {
    icon: "social-soundcloud",
    name: "soundcloud"
  },
  {
    icon: "social-spotify",
    name: "spotify"
  },
  {
    icon: "social-stumbleupon",
    name: "stumbleupon"
  },
  {
    icon: "social-youtube",
    name: "youtube"
  },
  {
    icon: "social-dropbox",
    name: "dropbox"
  },
  {
    icon: "social-vkontakte",
    name: "vkontakte"
  },
  {
    icon: "social-steam",
    name: "steam"
  }
];

const Icon = memo(({ icon, color }) => {
  return <SimpleLineIcons name={icon} color={color} size={ICON_SIZE} />;
});

const Item = memo(({ icon, color, name, showText }) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, { color }]}>{name}</Text>
      ) : (
        // for spacing purposes
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
});

const ConnectWithText = memo(() => {
  return (
    <View
      style={{
        position: "absolute",
        top: height / 2 - ITEM_HEIGHT * 2,
        width: width * 0.7,
        paddingHorizontal: 14
      }}
    >
      <Text
        style={{
          color: colors.yellow,
          fontSize: 52,
          fontWeight: "700",
          lineHeight: 52
        }}
      >
        Connect with...
      </Text>
    </View>
  );
});

const ConnectButton = memo(({ onPress }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: height / 2 + ITEM_HEIGHT / 2,
        paddingHorizontal: 14
      }}
    >
      <View
        style={{
          height: ITEM_HEIGHT * 2,
          width: 4,
          backgroundColor: colors.yellow
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          backgroundColor: colors.yellow,
          alignItems: "center",
          justifyContent: "center"
        }}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 32, fontWeight: "800", color: colors.dark }}>
          Done!
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const List = memo(
  forwardRef(({ color, showText, style, onScroll, onItemIndexChange }, ref) => {
    return (
      <Animated.FlatList
        ref={ref}
        data={data}
        style={style}
        keyExtractor={(item) => `${item.name}-${item.icon}`}
        bounces={false}
        scrollEnabled={!showText}
        scrollEventThrottle={16}
        onScroll={onScroll}
        decelerationRate="fast"
        snapToInterval={ITEM_HEIGHT}
        showsVerticalScrollIndicator={false}
        renderToHardwareTextureAndroid
        contentContainerStyle={{
          paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
          paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
          paddingHorizontal: 20
        }}
        renderItem={({ item }) => {
          return <Item {...item} color={color} showText={showText} />;
        }}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.round(
            ev.nativeEvent.contentOffset.y / ITEM_HEIGHT
          );

          if (onItemIndexChange) {
            onItemIndexChange(newIndex);
          }
        }}
      />
    );
  })
);
export const Animation25 = () => {
  const [index, setIndex] = useState(0);
  const onConnectPress = useCallback(() => {
    Alert.alert("Connect with:", data[index].name.toUpperCase());
  }, [index]);
  const yellowRef = useRef();
  const darkRef = useRef();
  const scrollY = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );
  const onItemIndexChange = useCallback(setIndex, []);
  useEffect(() => {
    scrollY.addListener((v) => {
      if (darkRef?.current) {
        darkRef.current.scrollToOffset({
          offset: v.value,
          animated: false
        });
      }
    });
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ConnectWithText />
      <List
        ref={yellowRef}
        color={colors.yellow}
        style={StyleSheet.absoluteFillObject}
        onScroll={onScroll}
        onItemIndexChange={onItemIndexChange}
      />
      <List
        ref={darkRef}
        color={colors.dark}
        showText
        style={{
          position: "absolute",
          backgroundColor: colors.yellow,
          width,
          height: ITEM_HEIGHT,
          top: height / 2 - ITEM_HEIGHT / 2
        }}
      />
      <ConnectButton onPress={onConnectPress} />
      <Item />
    </View>
  );
};

// import React from "react";
// import { Pressable, StyleSheet, View } from "react-native";
// import Animated, {
//   interpolate,
//   interpolateColor,
//   useAnimatedStyle,
//   useDerivedValue,
//   useSharedValue,
//   withDelay,
//   withSpring,
//   withTiming,
// } from "react-native-reanimated";

// import Icon from "../components/Icon";
// import DSS from "../data/DSS";

// const AnimatedButton = Animated.createAnimatedComponent(Pressable);

// const IconsComponent = ({ iconsValue, index, item, delay = 50, size = 26 }) => {
//   const iconsDerivedValue = useDerivedValue(() => {
//     return withDelay(index * delay, withSpring(iconsValue.value));
//   });

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       marginTop: 4,
//       transform: [
//         {
//           translateY: interpolate(iconsDerivedValue.value, [0, 1], [80, 0]),
//         },
//       ],
//       opacity: interpolate(iconsDerivedValue.value, [0, 1], [0, 1]),
//     };
//   });

//   return (
//     <Animated.View style={[styles.icon, animatedStyle]}>
//       <Icon name={item.icon} size={size} resizeMode="contain" />
//     </Animated.View>
//   );
// };

// export const Animation25 = () => {
//   const contHeightValue = useSharedValue(0);
//   const iconsValue = useSharedValue(0);
//   const circleValue = useSharedValue(0);
//   const backgroundColorValue = useSharedValue(0);
//   const plusLineColor = useSharedValue(0);

//   const contHeightStyle = useAnimatedStyle(() => {
//     const contHeight = interpolate(contHeightValue.value, [0, 1], [60, 160]);
//     return {
//       height: contHeight,
//     };
//   });

//   const iconPlusStyle = useAnimatedStyle(() => {
//     return {
//       position: "absolute",
//       bottom: 8.5,
//       backgroundColor: interpolateColor(
//         backgroundColorValue.value,
//         [0, 1],
//         ["#C3FDC0", "#C8EFB7"]
//       ),
//       transform: [
//         {
//           rotate: `${interpolate(contHeightValue.value, [0, 1], [0, 134])}deg`,
//         },
//       ],
//     };
//   });
//   const iconPlusLineStyle = useAnimatedStyle(() => {
//     return {
//       backgroundColor: interpolateColor(
//         plusLineColor.value,
//         [0, 1],
//         ["black", "#F36C65"]
//       ),
//     };
//   });

//   const iconCircleStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           scale: interpolate(circleValue.value, [0, 0.3], [0, 1]),
//         },
//       ],
//       opacity: interpolate(circleValue.value, [0, 1], [1, 0]),
//     };
//   });

//   const onFocus = () => {
//     contHeightValue.value = withTiming(1, { duration: 300 });
//     iconsValue.value = withTiming(1, { duration: 50 });
//     circleValue.value = withTiming(1, { duration: 300 }, () => {});
//     backgroundColorValue.value = withTiming(1, { duration: 700 });
//     plusLineColor.value = withTiming(1, { duration: 300 });
//   };

//   const onBlur = () => {
//     contHeightValue.value = withTiming(0, { duration: 250 });
//     iconsValue.value = withTiming(0, { duration: 1 });
//     backgroundColorValue.value = withTiming(0, { duration: 1000 });
//     plusLineColor.value = withTiming(0, { duration: 600 });
//     circleValue.value = 0;
//   };
//   return (
//     <Pressable style={styles.container} onPress={onBlur}>
//       <AnimatedButton
//         style={[styles.button, contHeightStyle]}
//         onPress={onFocus}
//       >
//         <View style={[DSS.mt10, { zIndex: -1 }]}>
//           {[{ icon: "voice" }, { icon: "chat" }].map((item, index) => {
//             return (
//               <IconsComponent key={index} {...{ iconsValue, index, item }} />
//             );
//           })}
//         </View>
//         <Animated.View style={[styles.plusCont, iconPlusStyle]}>
//           <Animated.View style={[styles.plusLine1, iconPlusLineStyle]} />
//           <Animated.View style={[styles.plusLine, iconPlusLineStyle]} />
//         </Animated.View>
//         <View style={styles.fake} />
//       </AnimatedButton>
//       <Animated.View style={[styles.circle, iconCircleStyle]} />
//       <Icon name="navigation" size={300} resizeMode="contain" />
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "black",
//   },
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 100,
//     backgroundColor: "#C3FDC0",
//     alignItems: "center",
//     position: "absolute",
//     bottom: "48.7%",
//     overflow: "hidden",
//     zIndex: 1000,
//     marginLeft: 2,
//   },

//   onBlur: {
//     backgroundColor: "white",
//     width: 200,
//     height: 90,
//     borderRadius: 30,
//     position: "absolute",
//     bottom: "41%",
//   },
//   text: {
//     fontSize: 30,
//     color: "white",
//   },
//   icon: {
//     width: 40,
//     height: 40,
//     backgroundColor: "#B2E7B0",
//     borderRadius: 100,
//     marginBottom: 6,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   circle: {
//     backgroundColor: "rgba(242, 36, 36, 0.4)",
//     width: 40,
//     height: 40,
//     position: "absolute",
//     borderRadius: 40,
//     bottom: "50%",
//     zIndex: 1000,
//   },

//   plusLine: {
//     position: "absolute",
//     width: 16,
//     height: 3,
//     transform: [
//       {
//         rotate: 90 + "deg",
//       },
//     ],
//     borderRadius: 4,
//   },
//   plusLine1: {
//     width: 16,
//     height: 3,
//     borderRadius: 3,
//     backgroundColor: "black",
//   },
//   plusCont: {
//     width: 40,
//     height: 40,
//     borderRadius: 100,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   fake: {
//     width: 100,
//     height: 40,
//     position: "absolute",
//     bottom: 0,
//     zIndex: -1,
//     backgroundColor: "#C3FDC0",
//   },
// });
