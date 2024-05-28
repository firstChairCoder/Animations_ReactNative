/* eslint-disable react-native/no-inline-styles */
import { Dimensions, Pressable, StatusBar, View } from "react-native";
import Constants from "expo-constants";
import pack from "pack-spheres";
import Random from "canvas-sketch-util/random";
import colors from "nice-color-palettes";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");
const borderWidth = 0;
const bounds = width * 0.48;
const size = bounds * 2;
const config = {
  maxCount: 200,
  dimensions: 2,
  minRadius: 2,
  maxRadius: 40,
  padding: 0.5,
  bounds,
};
const initialCircles = (isCircle) =>
  pack(
    isCircle
      ? {
          ...config,
          sample: () => Random.insideCircle(bounds),
          outside: (position, radius) => {
            // See if length of circle + radius
            // exceeds the bounds
            const length = Math.sqrt(
              position[0] * position[0] + position[1] * position[1]
            );
            return length + radius >= bounds;
          },
        }
      : config
  );

function Circles({ bgs, isCircle }) {
  const [circles, setCircles] = useState(initialCircles(isCircle));
  useEffect(() => {
    setCircles(initialCircles(isCircle));
  }, [bgs]);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: isCircle ? size : 0,
        justifyContent: "center",
        alignItems: "center",
        borderWidth,
        borderColor: `${bgs[0]}66`,
        backgroundColor: `${bgs[0]}33`,
      }}
    >
      {circles.map((circle, index) => {
        const bg = bgs[Math.floor(Math.random() * bgs.length)];
        const border = bgs[Math.floor(Math.random() * bgs.length)];
        return (
          <View
            key={index}
            style={{
              width: circle.radius * 2,
              height: circle.radius * 2,
              borderRadius: circle.radius,
              backgroundColor: bg,
              position: "absolute",
              transform: [
                { translateX: circle.position[0] },
                { translateY: circle.position[1] },
              ],
            }}
          />
        );
      })}
    </View>
  );
}

export const Animation42 = () => {
  const [bgs, setBgs] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: Constants.statusBarHeight,
        },
        { backgroundColor: `${bgs[0]}22` },
      ]}
    >
      <StatusBar hidden />
      <Pressable>
        <Circles bgs={bgs} isCircle={true} />
      </Pressable>
    </View>
  );
};
