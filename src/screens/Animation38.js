/* eslint-disable @typescript-eslint/no-shadow */
// Inspiration: https://dribbble.com/shots/2148183-Streak-Interaction-Design
import { Feather } from "@expo/vector-icons";
import { AnimatePresence, MotiText, MotiView } from "moti";
import { useRef, useState } from "react";
import { Dimensions, Pressable, StatusBar, View } from "react-native";

const { width } = Dimensions.get("window");

const size = width * 0.4;
const color = "#3DC916";
const duration = 300;
const counterSize = 102;

const MyText = ({ hasVoted, children, ...props }) => {
  return (
    <MotiText
      {...props}
      animate={{ color: hasVoted ? "#fff" : "#000" }}
      transition={{ type: "timing", duration: duration }}
    >
      {children}
    </MotiText>
  );
};

export const Animation38 = () => {
  const [progress, setProgress] = useState(17);
  const hasVoted = useRef(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >
      <StatusBar hidden />
      <AnimatePresence exitBeforeEnter>
        {!hasVoted.current ? (
          <MotiView
            style={{ alignItems: "center" }}
            from={{ translateY: 10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -10, opacity: 0 }}
            transition={{
              type: "timing",
              duration: duration * 0.7
            }}
            key="nope"
          >
            <MyText
              hasVoted={hasVoted.current}
              style={{ fontSize: 24, fontWeight: "800", marginBottom: 8 }}
            >
              Be Amazing
            </MyText>
            <MyText
              hasVoted={hasVoted.current}
              style={{
                fontSize: 16,
                textTransform: "uppercase",
                marginBottom: 10
              }}
            >
              TODAY
            </MyText>
          </MotiView>
        ) : (
          <MotiView
            style={{ alignItems: "center" }}
            from={{ translateY: 10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -10, opacity: 0 }}
            transition={{
              type: "timing",
              duration: duration * 0.7
            }}
            key="yep"
          >
            <MyText
              hasVoted={hasVoted.current}
              style={{ fontSize: 24, fontWeight: "800", marginBottom: 8 }}
            >
              Nice
            </MyText>
            <MyText
              hasVoted={hasVoted.current}
              style={{
                fontSize: 16,
                textTransform: "uppercase",
                marginBottom: 10
              }}
            >
              You're amazing
            </MyText>
          </MotiView>
        )}
      </AnimatePresence>
      <View style={{ zIndex: -1 }}>
        {/* Green bg */}
        <MotiView
          animate={{
            scale: hasVoted.current ? 10 : 1
          }}
          transition={{
            type: "timing",
            duration: duration * 1.4
          }}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            alignItems: "center",
            justifyContent: "center"
          }}
        />
        <Pressable
          onPress={() => {
            if (!hasVoted.current) {
              setProgress((progress) => progress + 1);
            } else {
              setProgress((progress) => progress - 1);
            }
            hasVoted.current = !hasVoted.current;
          }}
        >
          <MotiView
            animate={{
              backgroundColor: hasVoted.current ? "#fff" : color
            }}
            transition={{
              type: "timing",
              duration: duration
            }}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <AnimatePresence exitBeforeEnter>
              {!hasVoted.current ? (
                <MotiView
                  key="nopeIcon"
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "timing",
                    duration: duration / 10
                  }}
                >
                  <Feather name="check" size={size / 2} color="white" />
                </MotiView>
              ) : (
                <MotiView
                  key="yepIcon"
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "timing",
                    duration: duration / 10
                  }}
                >
                  <Feather name="check" size={size / 2} color={color} />
                </MotiView>
              )}
            </AnimatePresence>
          </MotiView>
        </Pressable>
      </View>
      <View style={{ alignItems: "center" }}>
        <MyText
          hasVoted={hasVoted.current}
          style={{ fontSize: 16, textTransform: "uppercase", marginBottom: 8 }}
        >
          Streak
        </MyText>
        <View style={{ flexDirection: "row" }}>
          {progress
            .toString()
            .split("")
            .map((value, index) => {
              return (
                <View
                  key={index}
                  style={{
                    overflow: "hidden",
                    justifyContent: "center",
                    height: counterSize,
                    width: counterSize * 0.6,
                    alignItems: "center"
                  }}
                >
                  <AnimatePresence>
                    <MotiText
                      from={{
                        opacity: 0,
                        translateY: hasVoted.current
                          ? counterSize * 1.2
                          : -counterSize * 1.2,
                        color: hasVoted.current ? "#000" : "#fff"
                      }}
                      animate={{
                        opacity: 1,
                        translateY: 0,
                        color: hasVoted.current ? "#fff" : "#000"
                      }}
                      exit={{
                        opacity: 0,
                        translateY: hasVoted.current
                          ? counterSize * 1.2
                          : -counterSize * 1.2
                      }}
                      transition={{
                        duration: duration,
                        type: "timing"
                      }}
                      // transition={{duration: 350, type: 'timing'}}
                      key={`progress-${index}-${value}`}
                      style={{
                        fontSize: counterSize,
                        position: "absolute",
                        margin: 0
                      }}
                    >
                      {value}
                    </MotiText>
                  </AnimatePresence>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
};
