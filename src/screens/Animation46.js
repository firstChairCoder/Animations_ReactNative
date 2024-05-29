import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { AnimatePresence, MotiText, MotiView } from "moti";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window").width;

const _spacing = 20;
const _barHeight = 60;
const _colors = {
  inactive: "#6823BB",
  active: "#FFF",
  bg: "#9A2DED"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: _colors.bg,
    flex: 1,
    justifyContent: "center",
    padding: _spacing
  }
});

export const Animation46 = () => {
  const [bar, setBar] = useState(1000);
  const [progress, setProgress] = useState("00");

  useEffect(() => {
    let timeoutId;
    if (parseInt(progress, 10) === 100) {
      timeoutId = setTimeout(() => {
        setProgress("00");
      }, 3000);
      return;
    }
    timeoutId = setTimeout(() => {
      const newProgress =
        parseInt(progress, 10) + Math.floor(Math.random() * 10) + 2;
      setProgress(
        newProgress < 10
          ? `0${newProgress}`
          : Math.min(newProgress, 100).toString()
      );
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [progress]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View
        style={{
          height: _barHeight,
          backgroundColor: _colors.inactive,
          justifyContent: "center",
          paddingHorizontal: _spacing,
          overflow: "hidden",
          maxWidth: width
        }}
      >
        <MotiView
          onLayout={(e) => {
            // console.log()
            setBar(e.nativeEvent.layout.width);
          }}
          from={{ translateX: -bar }}
          animate={{
            translateX: Math.min(
              -bar + (bar * parseInt(progress, 10)) / 100,
              60
            )
          }}
          transition={{
            type: "timing",
            duration: 200
          }}
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: _colors.active,
              alignItems: "flex-end",
              justifyContent: "center",
              paddingHorizontal: _spacing
            }
          ]}
        >
          <View
            style={{ overflow: "hidden", height: 20, alignItems: "center" }}
          >
            <AnimatePresence>
              {progress === "100" && (
                <MotiText
                  from={{ translateY: 20 }}
                  animate={{ translateY: 0 }}
                  exit={{ translateY: 20 }}
                  transition={{
                    delay: progress === "100" ? 100 : 0,
                    type: "timing",
                    duration: 200
                  }}
                  key={"done"}
                  style={{
                    fontFamily: "Menlo",
                    fontWeight: "800",
                    fontSize: 18,
                    color: _colors.inactive
                  }}
                >
                  DONE
                </MotiText>
              )}
            </AnimatePresence>
          </View>
        </MotiView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-betweeen",
            alignItems: "center"
          }}
        >
          {parseInt(progress, 10) < 100 && parseInt(progress, 10) > 0 && (
            <View style={{ flexDirection: "row" }}>
              {progress.split("").map((t, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      overflow: "hidden",
                      height: 20,
                      justifyContent: "center",
                      width: 10
                    }}
                  >
                    <AnimatePresence>
                      <MotiText
                        from={{ translateY: 20 }}
                        animate={{ translateY: 0 }}
                        exit={{ translateY: -20 }}
                        transition={{ duration: 200, type: "timing" }}
                        key={`progress-${t}-${i}`}
                        // translation={{duration: 350, type: "timing"}}
                        style={{
                          fontFamily: "Menlo",
                          position: "absolute",
                          fontWeight: "800",
                          fontSize: 18,
                          color: _colors.inactive
                        }}
                      >
                        {t}
                      </MotiText>
                    </AnimatePresence>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
