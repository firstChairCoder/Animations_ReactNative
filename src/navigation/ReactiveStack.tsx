import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Pressable } from "react-native";
import { Text } from "react-native-design-utility";

import { AnimatedScrollScreen } from "../screens/Reactive/AnimatedScrollScreen";
import { ThemeScreen } from "../screens/Reactive/ThemeScreen";
import { IntroScreen } from "../screens/Reactive/IntroScreen";
import { PGHScreen } from "../screens/Reactive/PGHScreen";
import { PinchGHScreen } from "../screens/Reactive/PinchGHScreen";
import { TapGHScreen } from "../screens/Reactive/TapGHScreen";
import { SvgLoaderScreen } from "../screens/Reactive/SvgLoaderScreen";
// import { TaskSwipeScreen } from "../screens/Reactive/TaskSwipeScreen";
import { RippleScreen } from "../screens/Reactive/RippleScreen";
import { PerspectiveMenuScreen } from "../screens/Reactive/PerspectiveMenuScreen";
// import { ColorPickerScreen } from "../screens/Reactive/ColorPickerScreen";

export type ReactiveNavigationParams = {
  Intro: undefined;
  PanGestureHandler: undefined;
  AnimatedScrollView: undefined;
  ColorInterpolate: undefined;
  PinchGestureHandler: undefined;
  TapGestureHandler: undefined;
  // ColorPicker: undefined;
  SvgLoader: undefined;
  TaskSwipe: undefined;
  Ripple: undefined;
  Perspective: undefined;
};

interface NextProps {
  onPress?: () => void;
}

const ANext = ({ onPress }: NextProps) => {
  return (
    <Pressable
      style={{ marginRight: 8, padding: 4, backgroundColor: "teal" }}
      onPress={onPress}
    >
      <Text>Next</Text>
    </Pressable>
  );
};

const ReactStack = createStackNavigator<ReactiveNavigationParams>();

const ReactiveStack = ({ navigation }) => {
  return (
    <ReactStack.Navigator>
      <ReactStack.Screen
        name={"Intro"}
        component={IntroScreen}
        options={{
          headerRight: () => (
            <ANext onPress={() => navigation.navigate("PanGestureHandler")} />
          ),
        }}
      />
      <ReactStack.Screen
        name={"PanGestureHandler"}
        component={PGHScreen}
        options={{
          headerRight: () => (
            <ANext onPress={() => navigation.navigate("AnimatedScrollView")} />
          ),
        }}
      />
      <ReactStack.Screen
        name={"AnimatedScrollView"}
        component={AnimatedScrollScreen}
        options={{
          headerRight: () => (
            <ANext onPress={() => navigation.navigate("ColorInterpolate")} />
          ),
        }}
      />
      <ReactStack.Screen
        name={"ColorInterpolate"}
        component={ThemeScreen}
        options={{
          headerRight: () => (
            <ANext onPress={() => navigation.navigate("PinchGestureHandler")} />
          ),
        }}
      />
      <ReactStack.Screen
        name={"PinchGestureHandler"}
        component={PinchGHScreen}
        options={{
          headerRight: () => (
            <ANext onPress={() => navigation.navigate("TapGestureHandler")} />
          ),
        }}
      />
      <ReactStack.Screen
        name={"TapGestureHandler"}
        component={TapGHScreen}
        options={{
          headerRight: () => (
            <ANext onPress={() => navigation.navigate("SvgLoader")} />
          ),
        }}
      />
      {/* <ReactStack.Screen name={"ColorPicker"} component={ColorPickerScreen} /> */}
      <ReactStack.Screen
        name={"SvgLoader"}
        component={SvgLoaderScreen}
        options={{
          headerRight: () => (
            <ANext onPress={() => navigation.navigate("Ripple")} />
          ),
        }}
      />
      {/* <ReactStack.Screen name={"TaskSwipe"} component={TaskSwipeScreen} /> */}
      <ReactStack.Screen
        name={"Ripple"}
        component={RippleScreen}
        options={{
          headerRight: () => (
            <ANext onPress={() => navigation.navigate("Perspective")} />
          ),
        }}
      />
      <ReactStack.Screen
        name={"Perspective"}
        component={PerspectiveMenuScreen}
      />
    </ReactStack.Navigator>
  );
};

export default ReactiveStack;
