import React, { useRef, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Canvas, Circle, Fill, useTiming } from "@shopify/react-native-skia";

import { Rocket, Sprayer } from "../components/Fireworks";
import { getRandomColor } from "../utils/getRandomColor";

let id = 0;
const rocketDuration = 3000;
const rocketTimeOffset = Platform.OS === "ios" ? 100 : 125;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sprayerBtn: {
    position: "absolute",
    bottom: 150,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  rocketBtn: {
    position: "absolute",
    bottom: 60,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
console.log(getRandomColor());
export const FireworksScreen = () => {
  const [rockets, setRockets] = useState<number[]>([]);
  const [sprayer, setSprayer] = useState(false);

  const ref = useRef<NodeJS.Timer>();
  // I somehow needed a top level timing to keep all other timings running - ideas are welcome
  const x = useTiming({ from: -50, to: -30, loop: true });

  const launchRocket = () => {
    const myId = id;
    id += 1;
    setRockets((rs) => [...rs, myId]);
    setTimeout(() => {
      setRockets((rs) => rs.filter((r) => r !== myId));
    }, rocketDuration);
  };

  return (
    <>
      <Canvas style={styles.container}>
        <Fill color={"#17161A"} />
        {rockets.map((currentId, i) => {
          return <Rocket key={currentId} />;
        })}
        {sprayer ? <Sprayer /> : null}
        <Circle cx={x} cy={50} r={10} color={"#17161A"} />
      </Canvas>
      <TouchableOpacity
        style={styles.sprayerBtn}
        onPress={() => setSprayer(!sprayer)}
      >
        <Text>Sprayer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rocketBtn}
        onPressIn={() => {
          launchRocket();
          ref.current = setInterval(launchRocket, rocketTimeOffset);
        }}
        onPressOut={() => {
          clearInterval(ref.current);
        }}
      >
        <Text>Rocket</Text>
      </TouchableOpacity>
    </>
  );
};
