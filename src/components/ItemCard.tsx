import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import type { Item } from "../screens";

export const ITEM_HEIGHT = 80;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  onlineIndicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#34C759",
    position: "absolute",
    bottom: 0,
    right: 20,
  },
  image: { height: 60, width: 60, borderRadius: 30, marginRight: 16 },
  name: { fontWeight: "600", fontSize: 17, marginBottom: 8 },
  message: {
    fontSize: 14,
  },
});

interface ItemCardProps {
  item: Item;
  index: number;
  scrollOffset: SharedValue<number>;
  maxScrollOffset: SharedValue<number>;
  numItems: number;
}

const ItemCard = ({
  item,
  index,
  scrollOffset,
  maxScrollOffset,
  numItems,
}: ItemCardProps) => {
  const animatedElasticStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-15, 0, maxScrollOffset.value, maxScrollOffset.value + 15],
          [index * 2, 0, 0, (index - numItems - 1) * 2],
          Extrapolation.EXTEND
        ),
      },
    ],
  }));

  return (
    <Animated.View
      key={item.name}
      style={[animatedElasticStyles, styles.wrapper, { height: ITEM_HEIGHT }]}
    >
      <View style={styles.container}>
        <View>
          <Image source={item.image} style={styles.image} />
          {item.online ? <View style={styles.onlineIndicator} /> : null}
        </View>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text
            style={[
              styles.message,
              {
                color: item.read ? "#444" : "#222",
                fontWeight: item.read ? "400" : "600",
              },
            ]}
          >
            {item.message}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default ItemCard;
