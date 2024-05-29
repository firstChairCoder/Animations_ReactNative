//slight fix: Breather in text doesn't disappear when breathe out shows...
import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7];
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center",
    left: width / 4,
    top: height / 4
  },
  titleWrapper: {
    height: width / 2,
    width: width / 2,
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center"
  },
  title: { fontSize: 20, fontWeight: "bold" },
  rolls: {
    backgroundColor: "lime",
    borderRadius: width / 4,
    height: width / 2,
    width: width / 2,
    ...StyleSheet.absoluteFill,
    opacity: 0.1
  }
});

export const Animation20 = () => {
  const opacity = useRef(new Animated.Value(1)).current;
  const move = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(move, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true
          })
        ]),
        Animated.parallel([
          Animated.timing(opacity, {
            delay: 100,
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          }),
          Animated.timing(move, {
            delay: 1000,
            toValue: 0,
            duration: 4000,
            useNativeDriver: true
          })
        ])
      ])
    ).start();
  }, []);

  const exhale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width / 6]
  });

  const animatedText = {
    opacity
  };

  const animatedText2 = {
    opacity: exhale
  };

  return (
    <View syle={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Animated.View style={[styles.titleWrapper, animatedText]}>
          <Text style={styles.title}>Breathe in</Text>
        </Animated.View>
        <Animated.View style={[styles.titleWrapper, animatedText2]}>
          <Text style={styles.title}>Breathe out</Text>
        </Animated.View>

        {NUMBERS.map((num) => {
          const rotateZ = move.interpolate({
            inputRange: [0, 1],
            outputRange: [`${num * 45}deg`, `${num * 45 + 180}deg`]
          });

          return (
            <Animated.View
              key={num}
              style={[
                styles.rolls,
                {
                  transform: [
                    {
                      rotateZ
                    },
                    {
                      translateY: translate
                    },
                    {
                      translateX: translate
                    }
                  ]
                }
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};
