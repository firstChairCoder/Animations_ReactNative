/* eslint-disable @typescript-eslint/no-var-requires */
import "react-native-gesture-handler";
import React, { useLayoutEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { useFont } from "@shopify/react-native-skia";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { RootNavigator } from "./src/navigation/RootNavigator";

// type RootNavigationProp = StackNavigationProp<RootStackParamList, "root">;

// type RootRouteProp = RouteProp<RootStackParamList, "root">;

// type Props = {
//   navigation: RootNavigationProp;
//   route: RootRouteProp;
// };

// const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const font = useFont(require("./assets/fonts/digital-7.ttf"), 30);
  useLayoutEffect(() => {
    (async () => {
      await NavigationBar.setPositionAsync("absolute");
      await NavigationBar.setBackgroundColorAsync("#FFFFFF00");
    })();
  });
  if (!font) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
}
