import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight + 20
  },
  scroll: {
    paddingHorizontal: 20
  },
  text: {
    fontSize: 32
  },
  action: {
    backgroundColor: "#000",
    borderRadius: 25,
    borderWidth: 1,
    bottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    position: "absolute",
    width: "60%"
  },
  item: {
    color: "#FFF",
    fontSize: 16,
    marginHorizontal: 16
  }
});

export const Animation27 = () => {
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 0;
        // console.log("Up!");
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 100;
        // console.log("Down!");
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 750,
            easing: Easing.inOut(Easing.ease)
          })
        }
      ]
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
          dolor officiis, odit obcaecati dolorem autem, perspiciatis corrupti,
          impedit veritatis quod harum error similique. Nesciunt vel molestiae
          natus corrupti unde dolores. Enim officia nihil pariatur molestiae
          ipsum tenetur soluta facere sequi optio praesentium. Et minima
          cupiditate porro corrupti perferendis laborum deleniti autem
          laboriosam eligendi impedit accusantium voluptas, perspiciatis, atque
          sapiente. Fugit, delectus molestiae laborum minus eum amet nesciunt
          autem, vitae excepturi blanditiis sunt deleniti. Fugiat beatae laborum
          provident consectetur quod nobis officia deleniti amet omnis ullam
          nisi commodi eius, cumque laboriosam corrupti impedit et perspiciatis
          sequi quo itaque animi! Nesciunt, quo!
        </Text>
      </Animated.ScrollView>

      <Animated.View style={[styles.action, animatedStyle]}>
        <Text style={styles.item}>Comment</Text>
        <Text style={styles.item}>Like</Text>
        <Text style={styles.item}>Dislike</Text>
      </Animated.View>
    </View>
  );
};
