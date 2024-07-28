import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { menuData } from "../../data/menuData";
import IconView from "./IconView";

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    position: "absolute"
  },
  iconsContainer: {
    gap: 30,
    margin: -8,
    marginBottom: 30,
    position: "absolute"
  },
  buttonWrapper: {
    alignItems: "flex-start"
  },
  buttonStyle: {
    alignItems: "center",
    flexDirection: "row",
    gap: 15
  },
  buttonTextWrapper: {
    marginLeft: 50,
    position: "absolute"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500"
  }
});

interface MenuProps {
  visible: boolean;
  onToggle: () => void;
}

const Menu: FC<MenuProps> = ({ visible, onToggle }) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const animatedIconWrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: visible ? withTiming(1.5) : withTiming(1) }]
    };
  }, [visible]);

  const animatedItemStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: visible ? withTiming("45deg") : withTiming("0deg") }
      ]
    };
  }, [visible]);

  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        styles.container,
        {
          bottom: insets.bottom,
          margin: visible ? 50 : 30
        }
      ]}
    >
      {visible && (
        <Animated.View
          layout={LinearTransition}
          entering={FadeIn}
          exiting={FadeOut}
          style={[
            styles.iconsContainer,
            {
              width,
              bottom: insets.bottom + 32
            }
          ]}
        >
          {menuData().map((item) => (
            <IconView key={item.id} icon={item.icon} title={item.title} />
          ))}
        </Animated.View>
      )}
      <Animated.View
        layout={LinearTransition}
        style={[animatedIconWrapperStyle, styles.buttonWrapper]}
      >
        <Pressable onPress={onToggle} style={styles.buttonStyle} hitSlop={10}>
          <Animated.View style={animatedItemStyle}>
            <Ionicons name="add-circle-sharp" size={32} color={"#000"} />
          </Animated.View>
          {!visible && (
            <Animated.View
              layout={LinearTransition}
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.buttonTextWrapper}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: "#000"
                  }
                ]}
              >
                Open Menu
              </Text>
            </Animated.View>
          )}
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

export default Menu;
