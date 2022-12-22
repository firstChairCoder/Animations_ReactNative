import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";


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
          label={label}
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
          {screens.map(({ name, component }, index) => (
            <Stack.Screen key={index} {...{ name }} {...{ component }} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
