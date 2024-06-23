import { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const LIST_ITEM_COLOR = "#E1057C";

interface Item {
  id: number;
}

// [
// {id: 0},
// {id: 1},
// ...,
// {id: 9}
// ]
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1
  },
  listItem: {
    alignSelf: "center",
    backgroundColor: LIST_ITEM_COLOR,
    borderRadius: 20,
    elevation: 5,
    height: 100,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    width: "90%"
  },
  floatingButton: {
    alignItems: "center",
    aspectRatio: 1,
    backgroundColor: "#000",
    borderRadius: 40,
    bottom: 50,
    justifyContent: "center",
    position: "absolute",
    right: "5%",
    width: 80,
    zIndex: 10
  }
});

export const LayoutAnimationScreen = () => {
  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const [items, setItems] = useState<Item[]>(
    new Array(5).fill(0).map((_, index) => ({ id: index }))
  );

  const onAdd = useCallback(() => {
    setItems((currentItems) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [...currentItems, { id: nextItemId }];
    });
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <Text style={{ color: "white", fontSize: 40 }}>+</Text>
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {items.map((item, index) => {
          return (
            <Animated.View
              key={item.id}
              entering={
                initialMode.current ? FadeIn.delay(100 * index) : FadeIn
              }
              exiting={FadeOut}
              layout={Layout.delay(100)}
              onTouchEnd={() => onDelete(item.id)}
              style={styles.listItem}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
