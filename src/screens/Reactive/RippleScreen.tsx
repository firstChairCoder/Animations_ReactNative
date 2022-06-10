import React from "react";
import { StyleSheet } from "react-native";
import { Box, Text } from "react-native-design-utility";

import { Ripple } from "../../components/Ripple";

const styles = StyleSheet.create({
  ripple: {
    width: 150,
    height: 150,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 3,
  },
});

export const RippleScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onTap = () => {};

  return (
    <Box f={1} center bg="linen">
      <Ripple style={styles.ripple} onTap={onTap}>
        <Text size={24} weight={"bold"}>
          Tap!
        </Text>
      </Ripple>
    </Box>
  );
};
