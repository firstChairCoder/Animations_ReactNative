/* eslint-disable react-native/no-inline-styles */
//Inspiration: https://dribbble.com/shots/6558740-Add-Button-Interaction
import * as React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image as MImage, Text as MText, View as MView } from "moti";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Easing } from "react-native-reanimated";
const { width } = Dimensions.get("screen");

const spacing = 20;
const icons = 60;
const movingSize = icons + spacing * 2;
const borderRadius = icons / 2;
const sideIconSize = icons * 0.9;

export const Animation41 = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  console.log(isVisible);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <SafeAreaView
        style={[StyleSheet.absoluteFillObject, { backgroundColor: "#371853" }]}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: icons,
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              alignSelf: "flex-end",
              margin: spacing,
            }}
          >
            {[Array(5).keys()].map((i) => (
              <MImage
                key={i}
                source={{
                  uri: "https://www.fidoo.com/wp-content/uploads/2020/02/placeholder.png",
                }}
                style={{
                  borderRadius: borderRadius / 2,
                  width: sideIconSize,
                  height: sideIconSize,
                  marginTop: spacing,
                  opacity: 0.4,
                }}
              />
            ))}
            <View
              style={{
                borderRadius: borderRadius / 2,
                backgroundColor: "rgba(255,255,255,0.2)",
                height: sideIconSize,
                width: sideIconSize,
                justifyContent: "center",
                alignItems: "center",
                marginTop: spacing,
              }}
            >
              <Feather
                name="camera"
                size={24}
                color="#fff"
                style={{ opacity: 0.5 }}
              />
            </View>
            <View
              style={{
                borderRadius: borderRadius / 2,
                backgroundColor: "rgba(255,255,255,0.2)",
                height: sideIconSize,
                width: sideIconSize,
                justifyContent: "center",
                alignItems: "center",
                marginTop: spacing,
              }}
            >
              <Feather
                name="settings"
                size={24}
                color="#fff"
                style={{ opacity: 0.5 }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: spacing,
            width: width - movingSize,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 20,
              height: icons - spacing,
              justifyContent: "center",
              padding: spacing / 2,
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                opacity: 0.2,
                borderRadius: 20,
                width: "30%",
                height: icons - spacing * 2,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        <MView
          from={{ translateY: 0, translateX: 0 }}
          animate={{
            translateX: isVisible ? -movingSize : 0,
            translateY: isVisible ? -movingSize : 0,
          }}
          transition={{
            type: "timing",
            duration: 600,
            easing: Easing.elastic(1.1),
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#5c3281",
            borderRadius,
          }}
        >
          <MText style={{ fontSize: 42, color: "#fff", opacity: 0.5 }}>
            Content
          </MText>
        </MView>

        <TouchableOpacity
          onPress={() => {
            setIsVisible(!isVisible);
          }}
          style={{
            width: icons * 1.3,
            height: icons * 1.5,
            backgroundColor: "lime",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: spacing,
            right: spacing,
          }}
        >
          <>
            <MView
              animate={{
                scale: isVisible ? [2, 0] : 0,
                opacity: isVisible ? 0 : 1,
              }}
              transition={{
                type: "timing",
                duration: 300,
              }}
              style={{
                position: "absolute",
                width: icons,
                height: icons,
                borderRadius: icons,
                backgroundColor: "#FE2A6B",
                alignItems: "center",
                justifyContent: "center",
                right: spacing,
                bottom: spacing,
              }}
            />
            <MView
              animate={{
                rotate: isVisible ? "90deg" : "0deg",
              }}
              transition={{
                type: "timing",
                duration: 300,
              }}
              style={{
                width: icons,
                height: icons,
                borderRadius: icons,
                backgroundColor: "#FE2A6B",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                right: spacing,
                bottom: spacing,
              }}
            >
              <Feather name="plus" size={24} color="#fff" />
            </MView>
          </>
        </TouchableOpacity>
      </View>
    </View>
  );
};
