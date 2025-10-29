/* eslint-disable @typescript-eslint/no-shadow */
// Fab Button with moti
import { useState } from "react";
import { Pressable, View } from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

export const Animation44 = ({
  size = 60,
  bg = "#F23462",
  activeBg = "#00FFFF"
}) => {
  const [isOn, setIsOn] = useState(false);
  // console.log(isOn);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: size,
          height: size,
          position: "absolute",
          bottom: size / 2,
          right: size / 2
        }}
      >
        <MotiView
          key="bg"
          from={{ scale: 0.3 }}
          animate={{ scale: isOn ? 5 : 0.3 }}
          transition={{ delay: isOn ? 0 : 150 }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bg,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute"
          }}
        />
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            left: size / 2,
            top: size / 2
          }}
        >
          {[
            "account-settings",
            "square-edit-outline",
            "folder-edit-outline"
          ].map((icon, i) => {
            return (
              <AnimatePresence key={`parent-${i}`}>
                {isOn && (
                  <MotiView
                    key={i}
                    from={{
                      transform: [
                        {
                          scale: 0
                        },
                        {
                          rotate: `${i * 45}deg`
                        }
                      ],
                      opacity: 0
                    }}
                    animate={{
                      transform: [
                        {
                          scale: 1
                        },
                        {
                          rotate: `${i * 45}deg`
                        }
                      ],
                      opacity: 1
                    }}
                    exit={{
                      opacity: 0,
                      transform: [
                        {
                          scale: 0
                        },
                        {
                          rotate: `${i * 45}deg`
                        }
                      ]
                    }}
                    transition={{ delay: i * 50 }}
                    style={{
                      width: size * 5,
                      height: size * 5,
                      borderRadius: size * 5,
                      alignItems: "flex-start",
                      justifyContent: "center",
                      position: "absolute"
                    }}
                  >
                    <View
                      style={{
                        width: size,
                        height: size,
                        borderRadius: size,
                        alignItems: "center",
                        justifyContent: "center",
                        margin: size / 2,
                        transform: [
                          {
                            rotate:
                              // eslint-disable-next-line no-nested-ternary
                              i === 1 ? "-45deg" : i === 2 ? "-90deg" : "0deg"
                          }
                        ]
                      }}
                    >
                      <Icon name={icon} size={size * 0.4} color="white" />
                    </View>
                  </MotiView>
                )}
              </AnimatePresence>
            );
          })}
        </View>

        <Pressable
          style={{
            width: size,
            height: size,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: "#45f",
            borderRadius: size / 2
          }}
          onPress={() => setIsOn((isOn) => !isOn)}
        >
          <MotiView
            style={{
              width: size,
              height: size,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              // backgroundColor: "#45f",
              borderRadius: size / 2
            }}
            from={{ rotate: "0deg", backgroundColor: bg }}
            animate={{
              rotate: isOn ? "45deg" : "0deg",
              backgroundColor: isOn ? activeBg : bg
            }}
          >
            <Icon name="plus" size={size * 0.5} color="white" />
          </MotiView>
        </Pressable>
      </View>
    </View>
  );
};
