import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";

import { channels } from "../mockdata/channelsData";
import ChannelItem from "../components/ChannelItem";

const { height } = Dimensions.get("window");
const imageBigHeight = Math.round(height * 0.7);
const styles = StyleSheet.create({
  footerWrapper: {
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0
  },
  footer: { color: "white", textAlign: "center" }
});

export const Animation18 = () => {
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  return (
    <SafeAreaView mode="margin" style={{ flex: 1, backgroundColor: "#444" }}>
      <Animated.FlatList
        data={channels}
        keyExtractor={(item) => item.path}
        renderItem={({ item: { path, credit }, index }) => (
          <ChannelItem
            key={index}
            index={index}
            credit={credit}
            path={path}
            scrollY={scrollY}
          />
        )}
        contentContainerStyle={{
          height: (channels.length - 1) * imageBigHeight + (height - top)
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={imageBigHeight}
        decelerationRate={"fast"}
      />

      <View
        style={[
          styles.footerWrapper,
          { height: height - imageBigHeight - top }
        ]}
      >
        <Animated.Text style={[styles.footer]}>The End</Animated.Text>
      </View>
    </SafeAreaView>
  );
};
