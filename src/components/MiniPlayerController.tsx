import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import type { ISongs } from "../screens/Player";
// eslint-disable-next-line import/no-cycle
import { MIN_PLAYER_HEIGHT, THRESHOLD, WINDOW_WIDTH } from "../screens/Player";

type ControllerProps = {
  y: Animated.SharedValue<number>;
  songDetails: ISongs;
};

const MiniPlayerController: React.FC<ControllerProps> = ({
  y,
  songDetails
}) => {
  const miniPlayerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [-THRESHOLD * 0.7, 0, THRESHOLD * 0.7],
        [0, 1, 1]
      )
    };
  });

  const iconsProps = { size: 16, color: "#ffffff" };

  return (
    <Animated.View style={[styles.container, miniPlayerStyle]}>
      <View style={styles.wrapper}>
        <View>
          <View>
            <Text style={styles.title}>{songDetails.title}</Text>
          </View>
          <View>
            <Text style={styles.author}>{songDetails.artist}</Text>
          </View>
        </View>
        <View style={styles.controllers}>
          <FontAwesome5 name="fast-backward" {...iconsProps} />
          <Ionicons name="play" {...iconsProps} />
          <FontAwesome5 name="fast-forward" {...iconsProps} />
          <MaterialCommunityIcons
            name="playlist-music-outline"
            {...{ iconsProps, size: 20 }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    height: MIN_PLAYER_HEIGHT * 1.05,
    paddingBottom: 4,
    position: "absolute",
    right: 0,
    width: WINDOW_WIDTH
  },
  wrapper: {
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
    paddingRight: 25,
    width: "85%"
  },
  title: {
    color: "rgba(256,256,256,0.8)",
    fontSize: 15.5,
    fontWeight: "500"
  },
  author: {
    color: "rgba(256,256,256,0.8)",
    fontSize: 10.5,
    marginTop: -2
  },
  controllers: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%"
  }
});

export default MiniPlayerController;
