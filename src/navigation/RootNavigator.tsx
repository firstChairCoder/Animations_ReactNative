/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Details from "../screens/Details";
import type { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const Root = () => {
  return (
    //    error is related to @types/react version. TS2768
    //    @ts-ignore
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};
