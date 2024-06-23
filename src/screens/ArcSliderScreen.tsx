/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { canvas2Polar, polar2Canvas } from "@shopify/react-native-skia";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue
} from "react-native-reanimated";
import { Defs, G, LinearGradient, Path, Stop, Svg } from "react-native-svg";

const { width } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);
const THUMB_SIZE = 48;
const PADDING = 56;
const SIZE = width - PADDING * 2;
const STROKE = 25;
const R = (SIZE - STROKE) / 2;
const CENTER = { x: SIZE / 2, y: SIZE / 2 };
const TAU = 2 * Math.PI;

const styles = StyleSheet.create({
  thumb: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#27ABA7",
    borderRadius: THUMB_SIZE,
    borderWidth: 2.5,
    elevation: 2,
    height: THUMB_SIZE,
    justifyContent: "center",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    top: 10,
    width: THUMB_SIZE
  },
  subText: {
    color: "#9E9E9E",
    fontSize: 12,
    fontWeight: "500"
  }
});

function getPosFromProgess(p: number) {
  const range = 4.7;
  const temp = ((100 - p) * range) / 100;
  return temp - 0.78;
}

function normalize(value: number) {
  "worklet";
  const rest = value % TAU;
  return rest > 0 ? rest : TAU + rest;
}

type ContextType = {
  theta: number;
  translateX: number;
  translateY: number;
};

interface SliderProps {
  progress: number;
  onChange: Dispatch<SetStateAction<number>>;
}

function Slider({ progress, onChange }: SliderProps) {
  //arc start and end value
  const start = useSharedValue(1.25 * Math.PI);
  const end = useSharedValue(1.75 * Math.PI);

  //arc start and end pos
  const startPos = useDerivedValue(() =>
    polar2Canvas({ theta: start.value, radius: R }, CENTER)
  );
  const endPos = useDerivedValue(() =>
    polar2Canvas({ theta: end.value, radius: R }, CENTER)
  );

  //slider thumb inital value
  const startThumb = useSharedValue(getPosFromProgess(progress));
  //slider thumb inital pos
  const thumbPos = useDerivedValue(() =>
    polar2Canvas({ theta: startThumb.value, radius: R }, CENTER)
  );

  //translation values
  const translateX = useSharedValue(thumbPos.value.x);
  const translateY = useSharedValue(thumbPos.value.y);
  const arcTheta = useSharedValue<number>(0);

  const handleCursorDrag = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (e, context) => {
      const x = e.translationX + context.translateX;
      const y = e.translationY + context.translateY;
      const { theta } = canvas2Polar({ x, y }, CENTER);
      if (
        theta < -0.75 * Math.PI ||
        (theta < Math.PI && theta > -0.25 * Math.PI)
      ) {
        arcTheta.value = theta;
        const { x: tx, y: ty } = polar2Canvas({ theta, radius: R }, CENTER);
        translateX.value = tx;
        translateY.value = ty;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onEnd: () => {}
  });

  //utiliy to calculate % from normalised arctheta value
  const getValue = useCallback((result: number) => {
    const temp = result + 0.78;
    const range = 4.7;
    const percentage = Math.round(100 - (temp * 100) / range);
    onChange(percentage);
  }, []);

  // normalize theta value for calculating %

  useDerivedValue(() => {
    if (
      arcTheta.value !== 0 &&
      normalize(arcTheta.value) > 0 &&
      normalize(arcTheta.value) <= 1.25 * Math.PI
    ) {
      runOnJS(getValue)(normalize(arcTheta.value));
    } else if (arcTheta.value !== 0) {
      runOnJS(getValue)(arcTheta.value);
    }
  });

  // animated props for active part
  const animatedProps = useAnimatedProps(() => {
    // calculation to let arc take the longest path always
    const isSweep =
      normalize(arcTheta.value) < 0.78 ||
      (progress > 60 ? normalize(arcTheta.value) > 6 : false) ||
      (arcTheta.value! < 0 && arcTheta.value! > -1);

    return {
      d: `M ${startPos.value.x} ${startPos.value.y} A ${R} ${R} 1 ${
        isSweep ? 1 : 0
      } 1 ${translateX.value} ${translateY.value} `
    };
  });

  const cursorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value - THUMB_SIZE / 2 },
        { translateY: translateY.value - THUMB_SIZE / 2 }
      ],
      position: "absolute"
    };
  });

  return (
    <View>
      <Svg height={SIZE * 1.05} width={SIZE}>
        <G transform={"translate(0 10)"}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="1" stopColor={"#27ABA7"} stopOpacity="1" />
              <Stop offset="0" stopColor={"#A3E3E3"} stopOpacity="1" />
            </LinearGradient>
          </Defs>

          <AnimatedPath
            stroke={"#ccc"}
            d={`M ${startPos.value.x} ${startPos.value.y} A ${R} ${R} 1 1 1 ${endPos.value.x} ${endPos.value.y} `}
            strokeLinecap={"round"}
            strokeWidth={STROKE}
            fill={"none"}
          />
          <AnimatedPath
            animatedProps={animatedProps}
            stroke={"#AEBDCA"}
            strokeWidth={STROKE}
            strokeLinecap={"round"}
            fill={"none"}
          />
        </G>
      </Svg>
      <PanGestureHandler onGestureEvent={handleCursorDrag}>
        <Animated.View style={[styles.thumb, cursorStyle]}>
          <Text style={styles.subText}>{progress}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export const ArcSliderScreen = () => {
  const [progress, setProgress] = useState(20);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{progress}</Text>
      <Slider progress={progress} onChange={setProgress} />
    </View>
  );
};
