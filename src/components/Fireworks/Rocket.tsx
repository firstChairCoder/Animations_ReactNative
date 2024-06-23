import type { FC } from "react";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { Circle, useTiming } from "@shopify/react-native-skia";

const baseDuration = 1000;
const effectDuration = 1000;

const Rocket: FC = () => {
  const { width, height } = useWindowDimensions();

  const directionX = Math.sign(Math.random() - 0.5);
  const offsetX = Math.random() * width * 0.5;
  const offsetY = height * (0.75 + (Math.random() * 0.5 - 0.25));

  const startY = height;
  const startX = width / 2;

  const [endX] = useState(startX + directionX * offsetX);
  const [endY] = useState(startY - offsetY);

  const [phase, setPhase] = useState<"base" | "effect">("base");

  const x = useTiming({ from: startX, to: endX }, { duration: baseDuration });
  const y = useTiming({ from: startY, to: endY }, { duration: baseDuration });

  if (phase === "base") {
    return <Circle cx={x} cy={y} r={4} color="white" />;
  }
};

export default Rocket;
