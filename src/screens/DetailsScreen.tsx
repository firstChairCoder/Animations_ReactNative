import React from "react";
import { Box, Text } from "react-native-design-utility";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { StackParams } from "../../App";

type Props = NativeStackScreenProps<StackParams, "Coffee">;

export const DetailsScreen: React.FC<Props> = ({ route }: Props) => {
  return (
    <Box f={1} center px={"md"}>
      <Text size={32}>Info: {route?.params?.name}</Text>
    </Box>
  );
};
