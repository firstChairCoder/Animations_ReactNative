import React from "react";
import { Box, Text } from "react-native-design-utility";
const Genre = ({ genres }: any) => {
  return (
    <Box dir="row" justify="center" py={8} flexWrap="wrap">
      {genres.map((genre: any, idx: number) => {
        return (
          <Box
            p={4}
            center
            key={idx.toString() + genre}
            border={1}
            mr={8}
            mb={8}
            style={{ borderColor: "lightgray", borderRadius: 8 }}
          >
            <Text size={12} color="rgba(0,0,0,0.5)">
              {genre}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default Genre;
