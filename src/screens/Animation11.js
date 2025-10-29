import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import Constants from "expo-constants";
import { AnimatePresence, MotiText, MotiView } from "moti";
import { Feather as Icon } from "@expo/vector-icons";
import { Easing } from "react-native-reanimated";
import faker from "faker";

faker.seed(10);

const { height } = Dimensions.get("window");
const _spacing = 10;
const _duration = 1000;
const _delay = 60;
const _logo = "https://cdn-icons-png.flaticon.com/512/3468/3468306.png";
const _color = "#E0BDFC";
const _size = 80;
const _logoDelay = _duration * 0.1;

const _transition = {
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  duration: _duration,
  type: "timing"
};

const _menu = [...Array(6).keys()].map(() => {
  return {
    key: faker.datatype.uuid(),
    label: faker.commerce.department()
  };
});

const styles = StyleSheet.create({
  btnAnimate: {
    position: "absolute",
    right: 0
  },
  container: {
    backgroundColor: "whitesmoke",
    flex: 1,
    justifyContent: "center",
    marginTop: 40
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: _spacing * 1.5
  },
  itemText: {
    color: "#333",
    fontSize: 42
  },
  logo: {
    flex: 1,
    padding: _spacing,
    resizeMode: "contain"
  },
  logoAnimate: {
    backgroundColor: _color,
    height: _size,
    marginBottom: _spacing * 3,
    padding: _spacing,
    width: _size
  },
  menuBtnWrapper: {
    backgroundColor: "#F00",
    position: "absolute",
    right: _spacing * 2,
    top: Constants.statusBarHeight,
    zIndex: 1
  }
});

export const Animation11 = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Pressable
        onPress={() => {
          setIsVisible((vis) => !vis);
        }}
        hitSlop={{
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }}
        style={styles.menuBtnWrapper}
      >
        <AnimatePresence>
          {isVisible ? (
            <MotiView
              style={styles.btnAnimate}
              key="x"
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Icon name="x" color={"#000"} size={24} />
            </MotiView>
          ) : (
            <MotiView
              style={styles.btnAnimate}
              key="menu"
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Icon name={"menu"} color={"#000"} size={24} />
            </MotiView>
          )}
        </AnimatePresence>
      </Pressable>
      <MotiView
        style={{ flex: 1, paddingTop: Constants.statusBarHeight }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{
          ..._transition,
          duration: 0,
          delay: isVisible ? 0 : _duration + _delay
        }}
      >
        <MotiView
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(251, 240, 168, 0.3)" }
          ]}
          animate={{ translateY: isVisible ? 0 : -height }}
          transition={{
            ..._transition,
            duration: _duration,
            delay: isVisible ? 0 : _duration * 0.3
          }}
        />
        <MotiView
          style={styles.logoAnimate}
          animate={{ translateY: isVisible ? 0 : -_size * 2 }}
          transition={{
            ..._transition,
            delay: _logoDelay,
            duration: _duration
          }}
        >
          <Image source={{ uri: _logo }} style={styles.logo} />
        </MotiView>
        <MotiView style={{ padding: _spacing }}>
          {_menu.map((item, index) => {
            return (
              <MotiView
                key={index}
                animate={{
                  translateY: isVisible ? 0 : 40,
                  opacity: isVisible ? 1 : 0
                }}
                transition={{
                  ..._transition,
                  delay: isVisible ? index * _delay + _logoDelay * 2 : 0
                }}
              >
                <Pressable
                  style={styles.item}
                  onPress={() => setIsVisible((vis) => !vis)}
                >
                  <MotiText key={item.key} style={styles.itemText}>
                    {item.label}
                  </MotiText>
                  <Icon
                    name={"arrow-right"}
                    color={"#A1E8C3"}
                    size={24}
                    style={{ marginLeft: _spacing }}
                  />
                </Pressable>
              </MotiView>
            );
          })}
        </MotiView>
      </MotiView>
    </View>
  );
};
