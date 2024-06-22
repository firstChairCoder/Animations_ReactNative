import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { StackScreenProps } from "@react-navigation/stack";

// eslint-disable-next-line import/no-cycle
import { screens } from "../navigation/RootNavigator";
import type { RootStackParamList } from "../navigation/types";

export const IntroScreen = ({
  navigation
}: StackScreenProps<RootStackParamList, "Intro">) => {
  const insets = useSafeAreaInsets();
  const SCREENS = screens.slice(1);
  return (
    <>
      <ScrollView
        style={{
          flex: 0.95,
          backgroundColor: "linen",
          paddingTop: insets.bottom * 1.25
        }}
        contentContainerStyle={{
          justifyContent: "center",
          paddingHorizontal: 16,
          paddingBottom: insets.bottom * 1.25
        }}
      >
        {SCREENS.map((screen, index) => {
          return (
            <Pressable
              key={index.toString()}
              onPress={() => navigation.navigate(`${screen.name}`)}
              style={{ marginVertical: 8 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 48,
                  borderWidth: 2,
                  borderColor: screen?.borderColor,
                  borderRadius: 12,
                  paddingHorizontal: 32,
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    marginRight: 32,
                    fontSize: 24,
                    fontWeight: "bold"
                  }}
                >
                  {screen?.label || "Hello"}
                </Text>
                <Icon name="chevron-circle-right" color={"white"} size={24} />
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={{ flex: 0.05, backgroundColor: "linen" }} />
    </>
  );
};
