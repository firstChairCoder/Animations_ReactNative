import type { FC } from "react";
import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Box } from "react-native-design-utility";

import { products } from "../data/coffeeData";

const { width } = Dimensions.get("window");
const SIZE = 150;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface ProductsProps {
  x: Animated.SharedValue<number>;
}

const Products: FC<ProductsProps> = ({ x }) => {
  return (
    <Box style={[styles.container]} pointerEvents="none">
      {products.map((product, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = [
            width * (index - 1),
            width * index,
            width * (index + 1),
          ];
          const translateX = interpolate(x.value, inputRange, [
            width / 2,
            0,
            -width / 2,
          ]);
          const scale = interpolate(
            x.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.61, 1, 0.61]
          );
          return {
            transform: [{ translateX }, { scale }],
          };
        });
        return (
          <Animated.View key={index} style={[styles.container, animatedStyle]}>
            <Image
              style={{
                width: SIZE,
                height: SIZE * product.aspectRatio,
                marginTop: 40,
              }}
              source={product.picture}
            />
          </Animated.View>
        );
      })}
    </Box>
  );
};

export default Products;
