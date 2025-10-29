//WIP!
import { useEffect } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: "#303030",
    borderColor: "#FDD451",
    borderRadius: 10,
    borderWidth: 2,
    elevation: 4,
    height: height / 12,
    justifyContent: "center",
    marginVertical: 4,
    paddingHorizontal: width / 20
  },
  btnText: {
    color: "#FDD451",
    fontSize: height / 20
    // textAlign: "center",
  },
  badgeWrapper: {
    backgroundColor: "#FDD451",
    borderColor: "#303030",
    borderRadius: 10,
    borderWidth: 2,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    paddingHorizontal: width / 10,
    paddingVertical: height / 60
  },
  input: {
    fontSize: height / 25,
    textDecorationColor: "lightblue",
    textDecorationLine: "underline"
  }
});

const players = [
  "Adrian",
  "Bailey",
  "Coker",
  "Deborah",
  "Eniola",
  "Femi",
  "Kabir"
];

export const Animation21 = () => {
  const scale = useSharedValue(0);
  const addPlayerButtonScale = useSharedValue(1);
  const startButtonScale = useSharedValue(1);
  const screenSlide = useSharedValue(height);

  useEffect(() => {
    setTimeout(() => {
      scale.value = 1;
    }, 1500);
  }, []);

  useEffect(() => {
    addPlayerButtonScale.value = 1;
    startButtonScale.value = 1;
    screenSlide.value = 1;
  }, []);

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(scale.value, { duration: 200 })
        }
      ]
    };
  });

  const addAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSequence(
            withTiming(addPlayerButtonScale.value, {
              duration: 100,
              easing: Easing.bezier(0.5, 0.01, 0, 1)
            }),
            withTiming(1, {
              duration: 100,
              easing: Easing.bezier(0.5, 0.01, 0, 1)
            })
          )
        }
      ]
    };
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  const Badge = ({ name }) => {
    return (
      <Animated.View style={[styles.badgeWrapper, scaleStyle]}>
        <TextInput style={styles.input} value={name} />
        <TouchableOpacity
          onPress={() =>
            setTimeout(() => {
              scale.value = 0;
            }, 300)
          }
          style={{ alignSelf: "center" }}
        >
          <Icon name="trash" size={height / 20} color="#303030" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Btn = ({ label, onPress, style }) => {
    return (
      <Pressable style={styles.btn} onPress={onPress}>
        <Animated.View style={style}>
          <Text style={styles.btnText}>{label}</Text>
        </Animated.View>
      </Pressable>
    );
  };

  const badges = players.map((player, index) => (
    <Badge key={index} name={player} />
  ));

  return (
    <Animated.View
      style={[
        { flex: 1, padding: 20, paddingTop: height * 0.1 },
        StyleSheet.absoluteFillObject
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        style={{ height: height / 2.5 }}
      >
        {badges}
      </ScrollView>

      <View style={{ height: height / 3 }}>
        <Btn label="Add player" style={addAnimation} onPress={() => true} />
        <Btn label="Play!" />
      </View>
    </Animated.View>
  );
};
