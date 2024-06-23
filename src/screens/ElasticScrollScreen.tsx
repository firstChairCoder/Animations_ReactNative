import { useCallback, useRef } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import type { ImageSourcePropType, ListRenderItem } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { avatarData } from "../data/scrollAvatarData";
import ItemCard, { ITEM_HEIGHT } from "../components/ItemCard";

const { width, height } = Dimensions.get("window");
export interface Item {
  image: ImageSourcePropType;
  message: string;
  online: boolean;
  name: string;
  read: boolean;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const ElasticScrollScreen = () => {
  const ref = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);
  const maxScrollOffset = useDerivedValue(
    () =>
      insets.top +
      insets.bottom +
      avatarData.length * ITEM_HEIGHT +
      100 -
      height,
    [insets.top, insets.bottom]
  );

  const renderHeader = () => {
    return (
      <View style={{ height: 60 }}>
        <Text style={{ fontSize: 32, fontWeight: "bold", letterSpacing: -0.3 }}>
          Messages
        </Text>
      </View>
    );
  };

  const getItemLayout = (_: any, index: number) => ({
    length: height,
    offset: height * index,
    index
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    }
  });

  const renderItem: ListRenderItem<Item> = useCallback(({ item, index }) => {
    return (
      <ItemCard
        item={item}
        index={index}
        scrollOffset={scrollOffset}
        maxScrollOffset={maxScrollOffset}
        numItems={avatarData.length}
      />
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <AnimatedFlatList
        ref={ref}
        data={avatarData}
        keyExtractor={(item: Item) => item.name}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
          paddingTop: insets.top + 20
        }}
        ListHeaderComponent={renderHeader}
        getItemLayout={getItemLayout}
        initialNumToRender={Math.round(height / 40)}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={renderItem}
      />
    </View>
  );
};
