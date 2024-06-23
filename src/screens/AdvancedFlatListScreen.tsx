import { memo } from "react";
import type { ViewToken } from "react-native";
import { FlatList, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));
// [{id: 0}, {id: 1}, {id: 2}, ..., {id: 49}]

export const AdvancedFlatListScreen = () => {
  const insets = useSafeAreaInsets();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingTop: insets.top * 1.5 }}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        data={data}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
};

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
};

const ListItem = memo(({ item, viewableItems }: ListItemProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((vItem) => vItem.item.id === item.id)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.55)
        }
      ]
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          height: 75,
          width: "90%",
          backgroundColor: "lightblue",
          alignSelf: "center",
          borderRadius: 16,
          marginTop: 16
        },
        animatedStyle
      ]}
    />
  );
});
