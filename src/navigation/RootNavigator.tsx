/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  AdvancedFlatListScreen,
  AirlineScreen,
  AnimatedCardsScreen,
  BasicGestureScreen,
  BottomSheetDemoScreen,
  CardsSwapScreen,
  Carousel3DScreen,
  ColorScreen,
  ColorSwatchScreen,
  CountdownScreen,
  CustomSpinScreen,
  ElasticScrollScreen,
  HourglassScreen,
  ImageViewerScreen,
  InterpolateScrollViewScreen,
  IntroScreen,
  LayoutAnimationScreen,
  MenuDemoScreen,
  ProgressScreen,
  RippleScreen,
  SensorRotationScreen,
  SlideCounterScreen,
  SquareRotationScreen,
  SwipeDeleteScreen,
  ToolbarDemoScreen,
  WalletFlatListScreen

  // FireworksScreen,
} from "../screens";
import type { RootStackParamList } from "./types";
import { DraggableDemoScreen } from "../screens/DraggableDemoScreen";

export const screens = [
  {
    name: "Intro",
    component: IntroScreen
  },
  {
    name: "Progress",
    component: ProgressScreen,
    borderColor: "#F00",
    label: "Progress"
  },
  {
    name: "BasicGesture",
    component: BasicGestureScreen,
    borderColor: "#F0F",
    label: "Basic Gesture"
  },
  {
    name: "IntScroll",
    component: InterpolateScrollViewScreen,
    borderColor: "#FF0",
    label: "Scroll Int."
  },
  {
    name: "IntColor",
    component: ColorScreen,
    borderColor: "#BE9",
    label: "Color Int."
  },
  {
    name: "AdvancedFlatList",
    component: AdvancedFlatListScreen,
    borderColor: "#CC3",
    label: "FlatList"
  },
  {
    name: "Flight",
    component: AirlineScreen,
    borderColor: "#FDA",
    label: "Airline"
  },
  {
    name: "Toolbar",
    component: ToolbarDemoScreen,
    borderColor: "#369",
    label: "Toolbar"
  },
  {
    name: "Wallet",
    component: WalletFlatListScreen,
    borderColor: "#640",
    label: "Wallet FlatList"
  },
  {
    name: "SlideCounter",
    component: SlideCounterScreen,
    borderColor: "#C1A",
    label: "Slide Counter"
  },
  {
    name: "Layout",
    component: LayoutAnimationScreen,
    borderColor: "#1CE",
    label: "Layout Animation"
  },
  {
    name: "Swipe",
    component: SwipeDeleteScreen,
    borderColor: "#FDA",
    label: "Swiper"
  },
  {
    name: "BottomSheet",
    component: BottomSheetDemoScreen,
    borderColor: "#8EA",
    label: "Bottom Sheet"
  },
  {
    name: "Ripple",
    component: RippleScreen,
    borderColor: "#ACE",
    label: "Ripple"
  },
  {
    name: "Menu",
    component: MenuDemoScreen,
    borderColor: "#DED369",
    label: "Menu"
  },
  {
    name: "Square",
    component: SquareRotationScreen,
    borderColor: "#FA1",
    label: "Rotating Square"
  },
  {
    name: "Countdown",
    component: CountdownScreen,
    borderColor: "#1FC",
    label: "Countdown"
  },
  {
    name: "Carousel",
    component: Carousel3DScreen,
    borderColor: "#B16",
    label: "3D Carousel"
  },
  {
    name: "CardsSwap",
    component: CardsSwapScreen,
    borderColor: "#B0D",
    label: "Cards Gest."
  },
  {
    name: "ImageViewer",
    component: ImageViewerScreen,
    borderColor: "#000",
    label: "Image Viewer"
  },
  // {
  //   name: "Fireworks",
  //   component: FireworksScreen,
  //   borderColor: "#EBA",
  //   label: "Fireworks",
  // },
  {
    name: "AnimatedCards",
    component: AnimatedCardsScreen,
    borderColor: "#BAE",
    label: "Animated Cards"
  },
  {
    name: "CustomSpin",
    component: CustomSpinScreen,
    borderColor: "#DA3",
    label: "Custom Spin"
  },
  {
    name: "Hourglass",
    component: HourglassScreen,
    borderColor: "#0AD",
    label: "Hourglass"
  },
  {
    name: "Elastic",
    component: ElasticScrollScreen,
    borderColor: "#8DE",
    label: "Elastic Scroll"
  },
  {
    name: "SensorRotationScreen",
    component: SensorRotationScreen,
    borderColor: "#1DE",
    label: "Sensor"
  },
  {
    name: "Draggable",
    component: DraggableDemoScreen,
    borderColor: "#D9A4B3",
    label: "Draggable Basic"
  },
  {
    name: "ColorSwatch",
    component: ColorSwatchScreen,
    borderColor: "#D90",
    label: "Color Swatch"
  }
];

const Stack = createStackNavigator<RootStackParamList>();

const Root = () => {
  return (
    //    error is related to @types/react version. TS2768
    //    @ts-ignore
    <Stack.Navigator
      screenOptions={{
        headerShown: false
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
