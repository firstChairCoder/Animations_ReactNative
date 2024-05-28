/* eslint-disable react-native/no-inline-styles */
//Inspo: https://dribbble.com/shots/11638410-dinero
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Easing } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "space", 0, "delete"];
const passcodeLength = 4;
const keySize = width / 4;
const passcodeSpacing = (width - 3 * keySize) / 2;
const passCodeSize = width / (passcodeLength + 2);
const correctPasscode = "6991";

// console.log(passCodeSize)

const PassCodeKeyboard = ({ onPress }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: passcodeSpacing,
        alignItems: "center",
      }}
    >
      {keys.map((key) => {
        if (key === "space") {
          return <View style={{ width: keySize }} key="space" />;
        }
        return (
          <TouchableOpacity
            onPress={() => onPress(key)}
            style={{
              width: keySize,
              height: keySize,
              alignItems: "center",
              justifyContent: "center",
            }}
            key={key}
          >
            <View>
              {key === "delete" ? (
                <MaterialCommunityIcons
                  name="keyboard-backspace"
                  size={42}
                  color="rgba(0,0,0,0.3)"
                />
              ) : (
                <Text style={{ fontSize: 32, fontWeight: "700" }}>{key}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const PassCode = ({ passcode, isValid }) => {
  return (
    <MotiView
      animate={{
        translateX: isValid
          ? 0
          : [0, 0, 0, 0, 0, 0, 0, 5, -5, 5, -5, 5, -5, 5, 0],
      }}
      transition={{ type: "timing", duration: 100 }}
      style={{ flexDirection: "row", marginVertical: passcodeSpacing }}
    >
      {[...Array(passcodeLength).keys()].map((i) => {
        return (
          <View
            key={`passcode-${i}-${passcode[i]}`}
            style={{
              width: passCodeSize,
              height: passCodeSize,
              borderRadius: passCodeSize,
              backgroundColor: "rgba(0,0,0,0.3)",
              marginLeft: i === 0 ? 0 : passCodeSize / 4,
            }}
          >
            {passcode[i] && (
              <MotiView
                key={`passcode-${i}-${i}`}
                from={{ scale: 0 }}
                animate={{
                  scale:
                    isValid && passcode.length === passcodeLength
                      ? [1.1, 1]
                      : 1,
                }}
                exit={{ scale: 0 }}
                transition={{
                  type: "timing",
                  duration: 500,
                  easing: Easing.elastic(1.1),
                  delay:
                    isValid && passcode.length === passcodeLength ? 500 : 0,
                }}
                style={{
                  backgroundColor:
                    isValid && passcode.length === passcodeLength
                      ? "#72C17F"
                      : "#8971FF",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  borderRadius: passCodeSize / 2,
                }}
              >
                <Text
                  style={{
                    fontSize: passCodeSize / 2,
                    color: "#FFF",
                    fontWeight: "700",
                  }}
                >
                  {passcode[i]}
                </Text>
              </MotiView>
            )}
          </View>
        );
      })}
    </MotiView>
  );
};

export default function Animation39() {
  const [passcode, setPasscode] = useState([]);
  const [isValid, setIsValid] = useState(false);

  // console.log(isValid);

  useEffect(() => {
    if (passcode.length === passcodeLength) {
      setIsValid(passcode.join("") === correctPasscode);
    }
  }, [passcode]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar hidden />
      <Text
        style={{
          fontSize: 16,
          paddingHorizontal: passcodeSpacing * 2,
          textAlign: "center",
          color: "rgba(0,0,0,.3)",
        }}
      >
        Enter the access code to get started.
      </Text>
      <PassCode
        passcode={passcode}
        isValid={passcode.length !== passcodeLength || isValid}
      />
      <PassCodeKeyboard
        onPress={(char) => {
          if (char === "delete") {
            console.log("delete");
            // eslint-disable-next-line no-shadow
            setPasscode((passcode) =>
              passcode.length === 0
                ? []
                : passcode.slice(0, passcode.length - 1)
            );
            return;
          }
          if (passcode.length === passcodeLength) {
            return;
          }

          // console.log("setKey: ", char);

          const newPasscode = [...passcode, char];
          setPasscode(newPasscode);
        }}
      />
    </View>
  );
}
