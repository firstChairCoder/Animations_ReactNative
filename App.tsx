import "react-native-gesture-handler";
import React from "react";

import { RootNavigator } from "./src/navigation/RootNavigator";

// type RootNavigationProp = StackNavigationProp<RootStackParamList, "root">

// type RootRouteProp = RouteProp<RootStackParamList, "root">

// type Props = {
//   navigation: RootNavigationProp,
//   route: RootRouteProp
// };

// const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <RootNavigator />
    </>
  );
}
