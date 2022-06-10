import type { FC } from "react";
import React from "react";
import { Dimensions, Pressable } from "react-native";
import { Box, Text } from "react-native-design-utility";

import type { Product } from "../data/coffeeData";

const { width } = Dimensions.get("window");
export const CARD_HEIGHT = (width * 1564) / 974;

interface CardProps {
  product: Product;
}

const Header = () => {
  return (
    <Box dir="row" p={16} mb={16} align="center">
      <Box f={1} />
      <Text center>RECOMMEND</Text>
      <Box f={1} dir="row" justify="end" self="center">
        <Text>Edit</Text>
      </Box>
    </Box>
  );
};

interface ButtonProps {
  label: string;
}
const Button = ({ label }: ButtonProps) => {
  return (
    <Pressable>
      <Box
        dir="row"
        center
        self="center"
        bg="greyDarkest"
        radius={27}
        w={(width - 64) / 2}
        h={54}
        // p={16}
      >
        <Text color="white" size={16} center>
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

const Card: FC<CardProps> = ({ product: { color1, title, subtitle } }) => {
  return (
    <Box w={width} h={CARD_HEIGHT}>
      <Box borderRadius={16} bg={color1} f={1} m={32} p={16} justify="between">
        <>
          <Header />
          <Text size={28} center color="greyDarkest" mb={84}>
            {title}
          </Text>
          <Text size={16} center color="greyDarkest">
            {subtitle}
          </Text>
        </>
        <Button label="Okay! Let's try" />
      </Box>
    </Box>
  );
};

export default Card;
