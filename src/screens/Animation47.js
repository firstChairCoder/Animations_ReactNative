/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Fabicon - multi-colored
// Inspiration: https://dribbble.com/shots/17057599-Fashico-Mobile-Prototype-Animation
import * as React from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { motify } from "moti";
import {
  AnonymousPro_700Bold,
  useFonts,
} from "@expo-google-fonts/anonymous-pro";

const MotifyPressable = motify(Pressable)();
const _size = 64;
const menu = [
  { icon: "rotate-ccw", color: "#33A5E4" },
  { icon: "youtube", color: "#F73B30" },
  { icon: "image", color: "#FE63F4" },
];
const colors = {
  gray: "#1D1520",
  white: "#f3f3f3",
};
const extraMenu = [
  { icon: "award", color: "turquoise" },
  { icon: "cast", color: "salmon" },
];

const FabButton = ({ menu, size = 64, onPress, closedOffset = 4 }) => {
  const iconSize = React.useMemo(() => size * 0.4, [size]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <View>
      <View style={{ position: "absolute" }}>
        {menu.map((item, index) => {
          // Take the midPoint of the menu
          // Create a reflected index that will have 0 as midPoint and +-1 on sides.
          // Example:
          // 3 items => [-1, 0, 1]
          // 5 items => [-2, -1, 0, 1, 2]
          // In this way we can assign x,y position on the circle.
          const offsetAngle = Math.PI / 3;
          const midPoint = Math.floor(menu.length / 2);
          const reflectedIndex = index - midPoint;
          const radius = size * 1.3;
          return (
            <MotifyPressable
              key={item.icon}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: item.color,
                position: "absolute",
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
              onPress={() => {
                setIsOpen((isOpen) => !isOpen);
                onPress(item);
              }}
              animate={{
                translateX:
                  Math.sin(reflectedIndex * offsetAngle) *
                  (isOpen ? radius : closedOffset),
                translateY:
                  -Math.cos(reflectedIndex * offsetAngle) *
                  (isOpen ? radius : closedOffset),
              }}
              transition={{
                delay: index * 100,
              }}
            >
              <Feather name={item.icon} size={iconSize} color={colors.white} />
            </MotifyPressable>
          );
        })}
      </View>

      <MotifyPressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.gray,
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
        onPress={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
        animate={{
          rotate: isOpen ? "0deg" : "-45deg",
        }}
      >
        <Feather name="x" size={iconSize} color={colors.white} />
      </MotifyPressable>
    </View>
  );
};

export const Animation47 = () => {
  let [fontsLoaded] = useFonts({
    AnonymousPro_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        padding: 8,
        backgroundColor: "#ecf0f1",
      }}
    >
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 40,
          marginBottom: 20,
        }}
      >
        <FabButton
          menu={menu}
          onPress={(menuItem) => {
            // This will give back the selected MenuItem.
            // Do whatever with it!
            console.log(menuItem.icon);
          }}
          size={_size}
        />
        <Text
          style={{
            fontFamily: "AnonymousPro_700Bold",
            position: "absolute",
            bottom: 10,
            right: 10,
            textAlign: "right",
          }}
        >
          [Default]{"\n"}size: 64{"\n"}closedOffset:4
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 40,
          marginBottom: 20,
        }}
      >
        <FabButton
          menu={menu}
          onPress={(menuItem) => {
            // This will give back the selected MenuItem.
            // Do whatever with it!
            console.log(menuItem.icon);
          }}
          size={42}
          // closedOffset={4}
        />
        <Text
          style={{
            fontFamily: "AnonymousPro_700Bold",
            position: "absolute",
            bottom: 10,
            right: 10,
            textAlign: "right",
          }}
        >
          size: 42{"\n"}closedOffset: 4
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginBottom: 20,
          justifyContent: "center",
          paddingBottom: 0,
        }}
      >
        <FabButton
          menu={[...menu, ...extraMenu]}
          onPress={(menuItem) => {
            // This will give back the selected MenuItem.
            // Do whatever with it!
            console.log(menuItem.icon);
          }}
          size={52}
          closedOffset={3}
        />
        <Text
          style={{
            fontFamily: "AnonymousPro_700Bold",
            position: "absolute",
            bottom: 10,
            right: 10,
            textAlign: "right",
          }}
        >
          size: 52{"\n"} closedOffset:3{"\n"}menu: 5 items
        </Text>
      </View>
    </View>
  );
};
