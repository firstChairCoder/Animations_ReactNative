/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
// Inspiration: https://dribbble.com/shots/15754381-Motion-UI-Exploration
import { MotiText, MotiView, AnimatePresence } from "moti";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Easing } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const color = "#3C3B3C";
const size = width * 0.55;
const ratio = 0.7;
const duration = 800;
const bigDuration = duration * 0.6;
const restDuration = duration - bigDuration;
const restHeight = (size * (1 - ratio)) / 2;

export const Animation48 = () => {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7f6f6",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar hidden />
      <Pressable
        onPress={() => {
          setIsAdded((isAdded) => !isAdded);
        }}
      >
        <View
          style={{
            width: size,
            height: size,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <MotiView
            style={{
              height: (size * (1 - ratio)) / 2,
              width: size,
              alignItems: "center",
              justifyContent: "center",
            }}
            animate={{
              opacity: isAdded ? 0 : 1,
              translateY: isAdded ? -restHeight : 0,
            }}
            transition={{
              opacity: {
                delay: isAdded ? 0 : bigDuration,
                duration: restDuration,
                type: "timing",
                easing: Easing.bezier(0.85, 0, 0.15, 1),
              },
              translateY: {
                delay: isAdded ? 0 : bigDuration,
                duration: restDuration,
                type: "timing",
                easing: Easing.bezier(0.85, 0, 0.15, 1),
              },
            }}
          >
            <MotiText
              style={{
                textTransform: "uppercase",
                color,
                fontWeight: "300",
                fontSize: Math.max(14, restHeight * 0.5),
              }}
            >
              Add to
            </MotiText>
          </MotiView>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MotiView
              style={{
                position: "absolute",
                backgroundColor: color,
                width: 1,
                height: size * ratio,
              }}
              animate={{
                width: isAdded ? size : 1,
                height: isAdded ? size : size * ratio,
              }}
              transition={{
                height: {
                  delay: isAdded ? 0 : bigDuration,
                  type: "timing",
                  easing: Easing.bezier(0.85, 0, 0.15, 1),
                  duration: restDuration,
                },
                width: {
                  delay: isAdded ? restDuration : 0,
                  type: "timing",
                  easing: Easing.bezier(0.85, 0, 0.15, 1),
                  duration: bigDuration,
                },
              }}
            />
            <MotiView
              style={{
                position: "absolute",
                backgroundColor: color,
                height: 1,
                width: size * ratio,
              }}
              animate={{ width: isAdded ? 0 : size * ratio }}
              transition={{
                width: {
                  delay: isAdded ? 0 : bigDuration,
                  type: "timing",
                  easing: Easing.bezier(0.85, 0, 0.15, 1),
                },
              }}
            />
            <AnimatePresence>
              {isAdded && (
                <MotiText
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "300",
                    fontSize: Math.max(14, restHeight * 0.5),
                    color: "#fff",
                    position: "absolute",
                  }}
                  key="doneText"
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "timing",
                    easing: Easing.bezier(0.85, 0, 0.15, 1),
                    opacity: {
                      delay: isAdded ? duration : 0,
                    },
                  }}
                >
                  Done
                </MotiText>
              )}
            </AnimatePresence>
          </View>
          <MotiView
            style={{
              height: (size * (1 - ratio)) / 2,
              width: size,
              alignItems: "center",
              justifyContent: "center",
            }}
            animate={{
              opacity: isAdded ? 0 : 1,
              translateY: isAdded ? restHeight : 0,
            }}
            transition={{
              delay: isAdded ? 0 : bigDuration,
              duration: restDuration,
              type: "timing",
              easing: Easing.bezier(0.85, 0, 0.15, 1),
            }}
          >
            <MotiText
              style={{
                textTransform: "uppercase",
                color,
                fontWeight: "300",
                fontSize: Math.max(14, restHeight * 0.5),
              }}
            >
              Library
            </MotiText>
          </MotiView>
        </View>
      </Pressable>
    </View>
  );
};
