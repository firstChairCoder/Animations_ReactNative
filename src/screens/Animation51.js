/* eslint-disable @typescript-eslint/no-shadow */
//Inspiration: https://dribbble.com/shots/4858673-Button-PRD
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AnimatePresence, MotiText, MotiView } from "moti";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

const buttonHeight = 60;
const spacing = 20;
const colors = {
  disabled: "#010100",
  bg: "#33E4",
  enabled: "#fff",
  enabledText: "#032ae3",
  disabledText: "#fff"
};

const Animation51 = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: spacing * 2,
        backgroundColor: colors.bg
      }}
    >
      <StatusBar hidden />
      <TouchableOpacity onPress={() => setEnabled((enabled) => !enabled)}>
        <View
          style={{
            height: buttonHeight,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: colors.enabled
          }}
        >
          <AnimatePresence>
            {!enabled && (
              <MotiView
                key="bg-enabled"
                from={{ translateY: -buttonHeight }}
                animate={{ translateY: 0 }}
                exit={{ translateY: -buttonHeight }}
                transition={{ delay: 200, type: "timing" }}
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: colors.disabled }
                ]}
              />
            )}
          </AnimatePresence>
          <View>
            <AnimatePresence>
              {enabled ? (
                <MotiText
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 20 }}
                  transition={{ type: "timing", duration: 350 }}
                  key="text-enabled"
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    letterSpacing: -0.5,
                    textTransform: "uppercase",
                    color: colors.disabledText
                  }}
                >
                  Enabled
                </MotiText>
              ) : (
                <MotiText
                  from={{ opacity: 0, translateY: -20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -20 }}
                  transition={{ type: "timing", duration: 350 }}
                  key="text-disabled"
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    letterSpacing: -0.5,
                    textTransform: "uppercase",
                    color: colors.disabledText
                  }}
                >
                  Disabled
                </MotiText>
              )}
            </AnimatePresence>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Animation51;
