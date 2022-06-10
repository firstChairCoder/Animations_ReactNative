import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Animated, Dimensions, Image, Pressable } from "react-native";
import { Box, Text } from "react-native-design-utility";

import type { StackParams } from "../../App";

const { width, height } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const images = [
  "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80",
  "https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80",
  "https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80",
  "https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80",
  "https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80",
  "https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80",
  "https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80",
  "https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80",
  "https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80",
  "https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80",
];
const data = images.map((image, index) => ({
  key: String(index),
  pic: image,
  avatar: `https://randomuser.me/api/portraits/men/${Math.ceil(
    Math.random() * 40
  )}.jpg`,
}));

export const ParallaxScreen = ({
  navigation,
}: StackNavigationProp<StackParams, "Parallax">) => {
  const scrollX = new Animated.Value(0);

  return (
    <Box f={1} bg="white" center>
      <Box p={20} mt={height * 0.05}>
        <Text capitalizeEach size={24} center weight="bold">
          Here are the final nominees for the best amateur photography award!
        </Text>
      </Box>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const translateX = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          const imageAnimated = {
            transform: [
              {
                translateX,
              },
            ],
          };

          return (
            <Box w={width} center>
              <Box
                style={{
                  borderRadius: 20,
                  borderWidth: 10,
                  borderColor: "#fff",
                  shadowColor: "#000",
                  shadowRadius: 20,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.5,
                  elevation: 4,
                }}
              >
                <Box
                  style={{
                    overflow: "hidden",
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                  }}
                >
                  <Animated.Image
                    style={[
                      {
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        borderRadius: 16,
                      },
                      imageAnimated,
                    ]}
                    source={{ uri: item.pic }}
                  />
                </Box>
                <Animated.Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    position: "absolute",
                    bottom: -30,
                    zIndex: 1,
                    right: 60,
                  }}
                  source={{ uri: item.avatar }}
                />
              </Box>

              <Text>{item.key}</Text>
            </Box>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
      />
      <>
        <Pressable
          style={{
            width: 100,
            height: 40,
            backgroundColor: "lime",
            alignSelf: "center",
            borderRadius: 8,
          }}
          onPress={() => navigation.navigate("Fling")}
        >
          <Text style={{ fontSize: 12 }} numberOfLines={2}>
            Fling Gesture
          </Text>
        </Pressable>
      </>
    </Box>
  );
};
