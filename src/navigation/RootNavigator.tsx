/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  IntroScreen,
  ProgressScreen,
  BasicGestureScreen,
  InterpolateScrollViewScreen,
  ColorScreen,
  AdvancedFlatListScreen,
  AirlineScreen,
  ToolbarDemoScreen,
  WalletFlatListScreen,
  SlideCounterScreen,
  LayoutAnimationScreen,
  SwipeDeleteScreen,
  BottomSheetDemoScreen,
  RippleScreen,
  SquareRotationScreen,
  MenuDemoScreen,
  CountdownScreen
} from "../screens";
import type { RootStackParamList } from "./types";

const screens = [
  {
    name: "Intro",
    component: IntroScreen,
  },
  {
    name: "Progress",
    component: ProgressScreen,
  },
  {
    name: "BasicGesture",
    component: BasicGestureScreen,
  },
  {
    name: "IntScroll",
    component: InterpolateScrollViewScreen,
  },
  {
    name: "IntColor",
    component: ColorScreen,
  },
  {
    name: "AdvancedFlatList",
    component: AdvancedFlatListScreen,
  },
  {
    name: "Flight",
    component: AirlineScreen,
  },
  {
    name: "Toolbar",
    component: ToolbarDemoScreen,
  },
  {
    name: "Wallet",
    component: WalletFlatListScreen,
  },
  {
    name: "SlideCounter",
    component: SlideCounterScreen,
  },
  {
    name: "Layout",
    component: LayoutAnimationScreen,
  },
  {
    name: "Swipe",
    component: SwipeDeleteScreen,
  },
  {
    name: "BottomSheet",
    component: BottomSheetDemoScreen,
  },
  {
    name: "Ripple",
    component: RippleScreen,
  },
  {
    name: "Menu",
    component: MenuDemoScreen,
  },
  {
    name: "Square",
    component: SquareRotationScreen,
  },
  {
    name: "Countdown",
    component: CountdownScreen,
  },
];

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
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
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
