import { useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  GestureHandlerRootView,
  PanGestureHandler
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

import Header from "../components/Header";
import SongList from "../components/SongList";
import PlayerController from "../components/PlayerController";
import MiniPlayerController from "../components/MiniPlayerController";
import AlbumCover from "../components/AlbumCover";

export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const STATUS_BAR_HEIGHT: number = StatusBar.currentHeight;
export const NAVIGATION_BAR_HEIGHT =
  SCREEN_HEIGHT - (WINDOW_HEIGHT + STATUS_BAR_HEIGHT);
export const THRESHOLD = SCREEN_HEIGHT * 0.65;
const MIN_DISTANCE = SCREEN_HEIGHT * 0.12;
export const INPUT_RANGE = [-THRESHOLD, 0, THRESHOLD];
export const MIN_PLAYER_HEIGHT = 59;
const MIN_PLAYER_RADIUS = (MIN_PLAYER_HEIGHT / 2) * 0.9;
const PLAYER_HEIGHT =
  SCREEN_HEIGHT - (STATUS_BAR_HEIGHT * 2 + NAVIGATION_BAR_HEIGHT);

export interface ISongs {
  id: string;
  title: string;
  thumbImage: ImageSourcePropType;
  artist: string;
  color: string;
}

export const MUSIC: Array<ISongs> = [
  {
    id: "01",
    title: "Our Father",
    thumbImage: require("../../assets/thumb/chosen.jpg"),
    artist: "Chosen SG",
    color: "#6E767F"
  },
  {
    id: "02",
    title: "Desire",
    thumbImage: require("../../assets/thumb/kiki-sheard.jpg"),
    artist: "Kierra Sheard",
    color: "#FABE7F"
  },
  {
    id: "03",
    title: "Kune Musik",
    thumbImage: require("../../assets/thumb/radiance-1.jpg"),
    artist: "Radiance Acapella",
    color: "#595A57"
  },
  {
    id: "04",
    title: "Medley",
    thumbImage: require("../../assets/thumb/radiance-2.jpg"),
    artist: "Radiance Acapella",
    color: "#938C07"
  },
  {
    id: "05",
    title: "Over the Horizon",
    thumbImage: require("../../assets/thumb/samsung.jpg"),
    artist: "Samsung",
    color: "#1C4A5E"
  },
  {
    id: "06",
    title: "Enquanto Ele Não Vem",
    thumbImage: require("../../assets/thumb/arautos-1.jpg"),
    artist: "Arautos do Rei",
    color: "#289BD6"
  },
  {
    id: "07",
    title: "Paradise",
    thumbImage: require("../../assets/thumb/isaac.jpg"),
    artist: "Isaac Carree",
    color: "#3D3D44"
  },
  {
    id: "08",
    title: "Our Father",
    thumbImage: require("../../assets/thumb/chosen.jpg"),
    artist: "Chosen SG",
    color: "#6E767F"
  },
  {
    id: "09",
    title: "Desire",
    thumbImage: require("../../assets/thumb/kiki-sheard.jpg"),
    artist: "Kierra Sheard",
    color: "#FABE7F"
  },
  {
    id: "10",
    title: "Kune Musik",
    thumbImage: require("../../assets/thumb/radiance-1.jpg"),
    artist: "Radiance Acapella",
    color: "#595A57"
  },
  {
    id: "11",
    title: "Medley",
    thumbImage: require("../../assets/thumb/radiance-2.jpg"),
    artist: "Radiance Acapella",
    color: "#938C07"
  },
  {
    id: "12",
    title: "Over the Horizon",
    thumbImage: require("../../assets/thumb/samsung.jpg"),
    artist: "Samsung",
    color: "#1C4A5E"
  },
  {
    id: "13",
    title: "Enquanto Ele Não Vem",
    thumbImage: require("../../assets/thumb/arautos-1.jpg"),
    artist: "Arautos do Rei",
    color: "#289BD6"
  },
  {
    id: "14",
    title: "Paradise",
    thumbImage: require("../../assets/thumb/isaac.jpg"),
    artist: "Isaac Carree",
    color: "#3D3D44"
  }
];

type Context = {
  y: number;
  isGoingUp: boolean;
  latestY: number;
};

const Player = () => {
  const y = useSharedValue(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [songDetails, setSongsDetails] = useState<ISongs>(MUSIC[0]);

  const getSongDetails = (details: ISongs): void => setSongsDetails(details);

  const panGestureHander = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >(
    {
      onStart: (_, context) => {
        context.latestY = y.value;
        //Sanitaze the latestY value
        context.latestY < -THRESHOLD ? (context.latestY = -THRESHOLD) : null;
      },
      onActive: (event, context) => {
        //Set direction up or down
        context.isGoingUp = event.translationY < 0 ? true : false;
        y.value = context.latestY + event.translationY;
      },
      onEnd: (event, context) => {
        const slidedDistance = Math.abs(event.translationY);

        //Manage on the opening
        if (!isPlayerOpen && context.isGoingUp) {
          slidedDistance < MIN_DISTANCE ? reset(0) : reset(-THRESHOLD);
        }

        //Manage on the closing
        if (isPlayerOpen && !context.isGoingUp) {
          slidedDistance < MIN_DISTANCE ? reset(-THRESHOLD) : reset(0);
        }
      }
    },
    [isPlayerOpen]
  );

  const rStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        y.value,
        INPUT_RANGE,
        [SCREEN_HEIGHT, MIN_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT],
        Extrapolate.CLAMP
      ),
      bottom: interpolate(
        y.value,
        INPUT_RANGE,
        [0, NAVIGATION_BAR_HEIGHT, NAVIGATION_BAR_HEIGHT],
        Extrapolate.CLAMP
      ),
      borderRadius: interpolate(
        y.value,
        INPUT_RANGE,
        [MIN_PLAYER_RADIUS * 0.5, MIN_PLAYER_RADIUS, MIN_PLAYER_RADIUS],
        Extrapolate.CLAMP
      )
    };
  });

  const playerReanimatedStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(
        y.value,
        INPUT_RANGE,
        [
          STATUS_BAR_HEIGHT,
          -PLAYER_HEIGHT + STATUS_BAR_HEIGHT,
          -PLAYER_HEIGHT + STATUS_BAR_HEIGHT
        ],
        Extrapolate.CLAMP
      )
    };
  });

  const reset = (toValue: number) => {
    "worklet";
    y.value = withTiming(toValue, {
      duration: 200
    });
    runOnJS(setIsPlayerOpen)(toValue === 0 ? false : true);
  };

  return (
    <GestureHandlerRootView style={styles.main}>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <Header totalSongs={MUSIC.length} />

          <View style={styles.flatListContainer}>
            <SongList {...{ getSongDetails }} />
          </View>
        </SafeAreaView>
      </View>

      <PanGestureHandler onGestureEvent={panGestureHander} minDist={60}>
        <Animated.View
          style={[
            { backgroundColor: songDetails.color },
            styles.player,
            rStyle
          ]}
        >
          <Animated.View
            style={[styles.playerContainer, playerReanimatedStyle]}
          >
            <PlayerController {...{ y, songDetails, reset }} />
            <MiniPlayerController {...{ y, songDetails }} />
            <AlbumCover {...{ y, image: songDetails.thumbImage }} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatListContainer: {
    backgroundColor: "#FCFBFC",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1
  },
  player: {
    overflow: "hidden",
    position: "absolute",
    width: "100%"
  },
  main: {
    backgroundColor: "#F3F4F5",
    flex: 1
  },

  playerContainer: {
    alignItems: "center",
    height: SCREEN_HEIGHT - (STATUS_BAR_HEIGHT + NAVIGATION_BAR_HEIGHT),
    paddingHorizontal: 20,
    paddingTop: 35,
    position: "absolute",
    top: STATUS_BAR_HEIGHT,
    width: "100%"
  }
});
