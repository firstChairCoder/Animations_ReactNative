import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

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
  Animation18,
  Animation19,
  Animation2,
  Animation20,
  Animation21,
  Animation22,
  Animation23,
  Animation24,
  Animation25,
  Animation26,
  Animation27,
  Animation28,
  Animation29,
  Animation3,
  Animation30,
  Animation31,
  Animation32,
  Animation33,
  Animation34,
  Animation35,
  Animation36,
  Animation37,
  Animation38,
  Animation39,
  Animation4,
  Animation40,
  Animation41,
  Animation42,
  Animation43,
  Animation44,
  Animation45,
  Animation46,
  Animation47,
  Animation48,
  Animation49,
  Animation5,
  Animation50,
  Animation6,
  Animation7,
  Animation8,
  Animation9,
} from "./src/screens";
import Button from "./src/components/Button";
import screens from "./src/data/screensData";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "snow",
    paddingTop: Constants.statusBarHeight + 20,
  },
  content: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
});

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {screens.map(({ name, color, label }, index) => (
        <Button
          key={`~screen` + index}
          onPress={() => navigation.navigate(name)}
          color={color}
          text={label}
        />
      ))}
    </ScrollView>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // pre-load/cache assets: fonts
        await Font.loadAsync({
          Lobster: require("./assets/fonts/Lobster-Regular.ttf"),
          VolkornCaps: require("./assets/fonts/VollkornSC-Regular.ttf"),
          Volkorn: require("./assets/fonts/Vollkorn-Regular.ttf"),
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      const hideSplash = async () => SplashScreen.hideAsync();

      // hide splash screen to show app
      hideSplash();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaProvider style={{ flex: 1 }}>
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
          <Stack.Screen name={"ImagePan"} component={Animation17} />
          <Stack.Screen name={"ChannelList"} component={Animation18} />
          <Stack.Screen name={"Penguin"} component={Animation19} />
          <Stack.Screen name={"Flower"} component={Animation20} />
          <Stack.Screen name={"Ejemplo"} component={Animation21} />
          <Stack.Screen name={"AnimatedTab"} component={Animation22} />
          <Stack.Screen name={"MicroInt"} component={Animation23} />
          <Stack.Screen name={"RubberSlide"} component={Animation24} />
          <Stack.Screen name={"AnimatedTab2"} component={Animation25} />
          <Stack.Screen name={"Ejemplo2"} component={Animation26} />
          <Stack.Screen name={"ScrollableTabs4"} component={Animation27} />
          <Stack.Screen name={"ProcessLoader"} component={Animation28} />
          <Stack.Screen name={"SensorCard"} component={Animation29} />
          <Stack.Screen name={"NavTransition"} component={Animation30} />
          <Stack.Screen name={"MarvelSlides"} component={Animation31} />
          <Stack.Screen name={"DotInverse"} component={Animation32} />
          <Stack.Screen name={"Headphones"} component={Animation33} />
          <Stack.Screen name={"Login"} component={Animation34} />
          <Stack.Screen name={"Login2"} component={Animation35} />
          <Stack.Screen name={"MoreBtn"} component={Animation36} />
          <Stack.Screen name={"NumAnim"} component={Animation37} />
          <Stack.Screen name={"Voter"} component={Animation38} />
          <Stack.Screen name={"PassCode"} component={Animation39} />
          <Stack.Screen name={"MenuTransition"} component={Animation40} />
          <Stack.Screen name={"MoreBtn2"} component={Animation41} />
          <Stack.Screen name={"RandomCircles"} component={Animation42} />
          <Stack.Screen name={"BeatsConcept"} component={Animation43} />
          <Stack.Screen name={"FabBtn"} component={Animation44} />
          <Stack.Screen name={"Switch"} component={Animation45} />
          <Stack.Screen name={"MotiProgress"} component={Animation46} />
          <Stack.Screen name={"FabBtn2"} component={Animation47} />
          <Stack.Screen name={"MotionUI"} component={Animation48} />
          <Stack.Screen name={"CallVibe"} component={Animation49} />
          <Stack.Screen name={"ProcessingLoop"} component={Animation50} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
