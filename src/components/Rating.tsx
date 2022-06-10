import type { FC } from "react";
import React from "react";
import { Box, Text } from "react-native-design-utility";
import { AntDesign as Icon } from "@expo/vector-icons";

interface RatingProps {
  rating: string;
}

const Rating: FC<RatingProps> = ({ rating }) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill("staro");
  const r = [...Array(filledStars).fill("star"), ...maxStars];

  return (
    <Box dir="row" center py={4}>
      <Text size={14} pr={4}>
        {rating}
      </Text>
      {r.map((type, index) => {
        return <Icon key={index} name={type} size={12} color="tomato" />;
      })}
    </Box>
  );
};

export default Rating;
