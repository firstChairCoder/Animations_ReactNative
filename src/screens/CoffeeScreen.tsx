import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Dimensions, Pressable, ScrollView } from "react-native";
import { Box, Text } from "react-native-design-utility";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import type { StackParams } from "../../App";
import Card, { CARD_HEIGHT } from "../components/Card";
import Cards from "../components/MappedCards";
import Products from "../components/Products";
import type { Product } from "../data/coffeeData";
import { products } from "../data/coffeeData";

const { width } = Dimensions.get("window");
export const CoffeeScreen = ({
  navigation,
}: StackNavigationProp<StackParams, "Coffee">) => {
  const translateX = useSharedValue(0);
  const snapToOffsets = [0, CARD_HEIGHT];

  const cardStyle = useAnimatedStyle(() => ({
    flex: 1,
    backgroundColor: interpolateColor(
      translateX.value,
      products.map((_, i: number) => width * i),
      products.map((product: Product) => product.color2)
    ),
  }));

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      translateX.value = x;
    },
  });

  return (
    <>
      <Animated.View style={cardStyle}>
        <ScrollView
          decelerationRate="fast"
          bounces={false}
          showsVerticalScrollIndicator={false}
          snapToOffsets={snapToOffsets}
          snapToEnd={false}
        >
          <Box h={CARD_HEIGHT}>
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              snapToInterval={width}
              decelerationRate="fast"
              scrollEventThrottle={16}
            >
              {products.map((product: Product, idx: number) => (
                <Card key={idx} product={product} />
              ))}
            </Animated.ScrollView>
            <Products x={translateX} />
          </Box>
          <Cards onPress={(name) => navigation.navigate("Details", { name })} />
        </ScrollView>
      </Animated.View>
      <Box center h={40} w={100} bg="green">
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => navigation.navigate("Parallax")}
        >
          <Text>Parallax</Text>
        </Pressable>
      </Box>
    </>
  );
};
