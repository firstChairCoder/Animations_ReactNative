import type { ReactChild } from "react";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Canvas,
  Circle,
  DiscretePathEffect,
  Group,
  Line,
  LinearGradient,
  RoundedRect,
  Text,
  useComputedValue,
  useSpring,
  vec,
} from "@shopify/react-native-skia";
import { SensorType, useAnimatedSensor } from "react-native-reanimated";

const WIDTH = 256;
const HEIGHT = 256;
const ONE_SECOND_IN_MS = 1000;
const ONE_MINUTE_IN_MS = ONE_SECOND_IN_MS * 60;
const ONE_HOUR_IN_MS = ONE_MINUTE_IN_MS * 60;
const SECOND_HANDLE_SIZE = 0.09;
const MINUTE_HANDLE_SIZE = 0.09;
const HOUR_HANDLE_SIZE = 0.5;
const NUMBER_OF_HOURS = 12;
const R = WIDTH / 2;

function degreesToRadians(degrees: number) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

export enum FaceShape {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Circle = "Circle",
  Square = "Square",
}

export interface ClockProps {
  scale?: number;
  faceShape?: FaceShape;
  faceColor?: string;
}

export function ClockScreen({
  scale = 1,
  faceShape = FaceShape.Circle,
  faceColor = "rgba(211,211,211, 0.2)",
}: ClockProps) {
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 100,
  });

  const rotation = useSpring(animatedSensor.sensor.value.roll, {
    velocity: 200,
  });

  const rotationTransform = useComputedValue(() => {
    return [{ rotate: -rotation.current }];
  }, [rotation]);

  const secondHandlerEffect = useSpring({
    to: Math.abs(rotation.current) * 10,
    from: 0,
    yoyo: false,
  });

  const [currentSeconds, setCurrentSeconds] = useState(new Date().getSeconds());
  const [currentMinutes, setCurrentMinutes] = useState(new Date().getMinutes());
  const [currentHours, setCurrentHours] = useState(new Date().getHours());

  const secondsRotation = useComputedValue(() => {
    return [{ rotate: degreesToRadians(currentSeconds * 6) }];
  }, [currentSeconds]);

  const minutesRotation = useComputedValue(() => {
    return [{ rotate: degreesToRadians(currentMinutes * 6) }];
  }, [currentMinutes]);

  const hoursRotation = useComputedValue(() => {
    return [{ rotate: degreesToRadians(currentHours * 30) }];
  }, [currentHours]);

  useEffect(() => {
    const increaseSeconds = setInterval(() => {
      setCurrentSeconds((val) => val + 1 / 10);
    }, ONE_SECOND_IN_MS / 10);

    const increaseMinutes = setInterval(() => {
      setCurrentMinutes((val) => val + 1);
    }, ONE_MINUTE_IN_MS);

    const increaseHours = setInterval(() => {
      setCurrentHours((val) => val + 1);
    }, ONE_HOUR_IN_MS);

    return () => {
      clearInterval(increaseSeconds);
      clearInterval(increaseMinutes);
      clearInterval(increaseHours);
    };
  }, [setCurrentSeconds]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Canvas style={{ width: WIDTH, height: HEIGHT }}>
        <Group
          transform={rotationTransform}
          origin={{ x: WIDTH / 2, y: HEIGHT / 2 }}
        >
          <Group transform={[{ scale }]}>
            <ClockFace faceColor={faceColor} faceShape={faceShape}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(WIDTH, HEIGHT)}
                colors={["#25316D", "#EB1D36"]}
              />
            </ClockFace>

            <Group origin={{ x: R, y: R }} transform={secondsRotation}>
              <Line
                p1={vec(R, R)}
                p2={vec(R, R * SECOND_HANDLE_SIZE)}
                color="red"
                style="stroke"
                strokeWidth={2}
              />
              <DiscretePathEffect
                length={1}
                deviation={secondHandlerEffect.current}
              />
            </Group>

            <Group origin={{ x: R, y: R }} transform={minutesRotation}>
              <Line
                p1={vec(R, R)}
                p2={vec(R, R * MINUTE_HANDLE_SIZE)}
                color="gray"
                style="stroke"
                strokeWidth={4}
              />
            </Group>

            <Group origin={{ x: R, y: R }} transform={hoursRotation}>
              <Line
                p1={vec(R, R)}
                p2={vec(R, R * HOUR_HANDLE_SIZE)}
                color="gray"
                style="stroke"
                strokeWidth={4}
              />
            </Group>

            <Group origin={{ x: R, y: R }} transform={[{ scale: 0.85 }]}>
              {new Array(NUMBER_OF_HOURS).fill(0).map((_, index) => {
                // deviation to adjust the difference after the calculation
                const dx = R * -0.06;
                const dy = R * 0.08;

                const angle = Math.PI / -2 + (2 * index * Math.PI) / 12;

                const x = R * Math.cos(angle) + (R + dx);
                const y = R * Math.sin(angle) + (R + dy);

                return (
                  <Text
                    // font={font} TODO: Fix font import
                    y={y}
                    x={x}
                    text={`${index === 0 ? "12" : index}`}
                    color="gray"
                    key={index}
                  />
                );
              })}
            </Group>

            <Circle
              cx={R}
              cy={R}
              r={R / 35}
              color="gray"
              style="stroke"
              strokeWidth={3}
            />
          </Group>
        </Group>
      </Canvas>
    </View>
  );
}

export interface ClockFaceProps
  extends Pick<ClockProps, "faceColor" | "faceShape"> {
  children: ReactChild;
}

export function ClockFace({ faceColor, faceShape, children }: ClockFaceProps) {
  if (faceShape === FaceShape.Circle) {
    return (
      <Circle cx={R} cy={R} r={R} color={faceColor}>
        {children}
      </Circle>
    );
  }

  if (faceShape === FaceShape.Square) {
    return (
      <RoundedRect
        x={0}
        y={0}
        width={WIDTH}
        height={HEIGHT}
        r={4}
        color={faceColor}
      />
    );
  }

  return null;
}