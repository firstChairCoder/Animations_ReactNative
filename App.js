import "react-native-gesture-handler";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Animation1,
  Animation10,
  Animation11,
  Animation12,
  Animation13,
  Animation14,
  Animation15,
  Animation16,
  Animation17,
  Animation2,
  Animation3,
  Animation4,
  Animation5,
  Animation6,
  Animation7,
  Animation8,
  Animation9,
} from "./src/screens";
import Button from "./src/components/Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "wheat",
    paddingVertical: 8,
  },
  content: {
    paddingLeft: 20,
  },
});

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Button
        onPress={() => navigation.navigate("Peeps")}
        color={"#F00"}
        text={"Animation 1"}
      />
      <Button
        onPress={() => navigation.navigate("StarWars")}
        color={"#FFA500"}
        text={"Animation 2"}
      />
      <Button
        onPress={() => navigation.navigate("CustomCell")}
        color={"#FF0"}
        text={"Animation 3"}
      />
      <Button
        onPress={() => navigation.navigate("SvgProgress")}
        color={"#080"}
        text={"Animation 4"}
      />
      <Button
        onPress={() => navigation.navigate("NumTicker")}
        color={"#00F"}
        text={"Animation 5"}
      />
      <Button
        onPress={() => navigation.navigate("Carousel")}
        color={"#4B0082"}
        text={"Animation 6"}
      />
      <Button
        onPress={() => navigation.navigate("SvgProgress2")}
        color={"#EE82EE"}
        text={"Animation 7"}
      />
      <Button
        onPress={() => navigation.navigate("SvgProgress3")}
        color={"mistyrose"}
        text={"Animation 8"}
      />
      <Button
        onPress={() => navigation.navigate("TimePicker")}
        color={"cadetblue"}
        text={"Animation 9"}
      />
      <Button
        onPress={() => navigation.navigate("Counter")}
        color={"salmon"}
        text={"Animation 10"}
      />
      <Button
        onPress={() => navigation.navigate("Sidebar")}
        color={"#E52B50"}
        text={"Animation 11"}
      />
      <Button
        onPress={() => navigation.navigate("ScrollableTabs")}
        color={"mediumaquamarine"}
        text={"Animation 12"}
      />
      <Button
        onPress={() => navigation.navigate("ScrollableTabs2")}
        color={"sandybrown"}
        text={"Animation 13"}
      />
      <Button
        onPress={() => navigation.navigate("BarberPole")}
        color={"#E49B0F"}
        text={"Animation 14"}
      />
      <Button
        onPress={() => navigation.navigate("Liquid")}
        color={"#ACE1AF"}
        text={"Animation 15"}
      />
      <Button
        onPress={() => navigation.navigate("ScrollableTabs3")}
        color={"goldenrod"}
        text={"Animation 16"}
      />
      <Button
        onPress={() => navigation.navigate("SectionTabs")}
        color={"#C0C529"}
        text={"Animation 17"}
      />
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: "",
          headerTransparent: true,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name={"Home"} component={HomeScreen} />
        <Stack.Screen name={"Peeps"} component={Animation1} />
        <Stack.Screen name={"StarWars"} component={Animation2} />
        <Stack.Screen name={"CustomCell"} component={Animation3} />
        <Stack.Screen name={"SvgProgress"} component={Animation4} />
        <Stack.Screen name={"NumTicker"} component={Animation5} />
        <Stack.Screen name={"Carousel"} component={Animation6} />
        <Stack.Screen name={"SvgProgress2"} component={Animation7} />
        <Stack.Screen name={"SvgProgress3"} component={Animation8} />
        <Stack.Screen name={"TimePicker"} component={Animation9} />
        <Stack.Screen name={"Counter"} component={Animation10} />
        <Stack.Screen name={"Sidebar"} component={Animation11} />
        <Stack.Screen name={"ScrollableTabs"} component={Animation12} />
        <Stack.Screen name={"ScrollableTabs2"} component={Animation13} />
        <Stack.Screen name={"BarberPole"} component={Animation14} />
        <Stack.Screen name={"Liquid"} component={Animation15} />
        <Stack.Screen name={"ScrollableTabs3"} component={Animation16} />
        <Stack.Screen name={"SectionTabs"} component={Animation17} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import React from "react";
// import { View } from "react-native";

// export default function App() {
//   return <View style={{ flex: 1, backgroundColor: "#772BAE" }} />;
// }
