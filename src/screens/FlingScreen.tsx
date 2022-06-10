// import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Box, Text } from "react-native-design-utility";
import {
  Directions,
  FlingGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import { Transition, Transitioning } from "react-native-reanimated";
// import { SafeAreaView } from "react-native-safe-area-context";

import data, { detailList, iconsByType } from "../data/shopTypes";

const { width, height } = Dimensions.get("window");
const DURATION = 700;
const textColors = {
  light: "#FFF",
  dark: "#000",
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
});

interface ItemProps {
  styles: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const Item = ({ children, styles }: ItemProps) => {
  return (
    <Box
      style={[styles, { overflow: "hidden", backgroundColor: "transparent" }]}
    >
      {children}
    </Box>
  );
};

//Title component--->
const Title = ({
  index,
  text,
  color,
}: {
  index: number;
  text: string;
  color: string;
}) => {
  return (
    <Item styles={{ height: 100 }}>
      <Text key={`title-${index}`} style={{ color, fontSize: 30 }}>
        {text}
      </Text>
    </Item>
  );
};

// //Icon def--->
// const Icon = ({ type }: { type: string }) => {
//   return (
//     <SimpleLineIcons
//       name={type}
//       size={26}
//       color="#A5A6AA"
//       style={{ marginRight: 15, height: 26, marginBottom: 5 }}
//     />
//   );
// };

interface DetailsProps {
  color: string;
  index: number;
}
//Details --->
const Details = ({ color, index }: DetailsProps) => {
  return (
    <Box style={{ marginTop: -70 }}>
      {detailList.map((key) => {
        return (
          <Box key={key} style={{ flexDirection: "row" }}>
            {/* <Icon type={iconsByType[key]} /> */}
            <Item styles={{ flex: 1, height: 26, justifyContent: "center" }}>
              <Text
                style={{ fontSize: 13, color, fontWeight: "700" }}
                key={`${key}-${index}`}
              >
                {data[index][key]}
              </Text>
            </Item>
          </Box>
        );
      })}
    </Box>
  );
};

interface DescriptionProps {
  index: number;
  text: string;
  color: string;
}

//Description--->
const Description = ({ index, text, color }: DescriptionProps) => {
  return (
    <Item styles={{ marginBottom: 50, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 16, color }} key={`description-${index}`}>
        {text}
      </Text>
    </Item>
  );
};

//transition config
const transition = (
  <Transition.Together>
    <Transition.Out type="slide-bottom" />
    <Transition.In type="slide-bottom" />
  </Transition.Together>
);

//main component
export const FlingScreen = () => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const [index, setIndex] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(0)).current;
  const textColor = index % 2 === 0 ? textColors.dark : textColors.light;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
  }, []);

  const setActiveIndex = useCallback((newIndex) => {
    activeIndex.setValue(newIndex);
    setIndex(newIndex);
    ref?.current?.animateNextTransition();
    ref2?.current?.animateNextTransition();
  }, []);

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height],
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlingGestureHandler
        key="up"
        direction={Directions.UP}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === data.length - 1) {
              return;
            }
            setActiveIndex(index + 1);
          }
        }}
      >
        <FlingGestureHandler
          key="down"
          direction={Directions.DOWN}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return;
              }
              setActiveIndex(index - 1);
            }
          }}
        >
          <SafeAreaView style={style.container}>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                height: data.length * height,
                transform: [{ translateY }],
              }}
            >
              {data.map((_, key) => (
                <Box
                  key={key}
                  style={{
                    height: height,
                    backgroundColor:
                      key % 2 === 0 ? textColors.light : textColors.dark,
                  }}
                />
              ))}
            </Animated.View>
            <Transitioning.View ref={ref} transition={transition}>
              <Title index={index} text={data[index].title} color={textColor} />
            </Transitioning.View>
            <Transitioning.View ref={ref2} transition={transition}>
              <Details color={textColor} index={index} />
            </Transitioning.View>
            <Box
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                overflow: "hidden",
                backgroundColor: "red",
                position: "absolute",
                top: "50%",
                marginTop: -100,
                right: -20,
              }}
            >
              <Image
                style={{ flex: 1, resizeMode: "cover" }}
                source={{ uri: data[index].image }}
              />
            </Box>
            <Description
              index={index}
              text={data[index]?.description}
              color={textColor}
            />
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>
  );
};

// import React, {useEffect} from "react";
// import {View, Text, StyleSheet} from "react-native";
// eslint-disable-next-line max-len
// import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming} from "react-native-reanimated";
// const SIZE = 100

// const handleRotate = (progress:Animated.SharedValue<number>)=>{
//     'worklet';
//     return `${2*Math.PI * progress.value}rad`
// }

// // const Animation1: React.FC<{}> = () => {
// //     const progress:Animated.SharedValue<number> = useSharedValue(.5);
// //     const scale:Animated.SharedValue<number>    = useSharedValue(1);
// //     useEffect(()=>{
// //         progress.value = withRepeat(withTiming(1,{duration:500}),-1,true)
// //         scale.value = withRepeat(withSpring(1.5),-1,true)
// //     },[]);
// //     const style = useAnimatedStyle(()=>({
// //         opacity:progress.value,
// //         transform:[{scale:scale.value},{rotate:handleRotate(progress)}]
// //     }))

// //     return (
// //         <View style={styles.container}>
// //             <Animated.View style={[{
// //                 width:SIZE,
// //                 height:SIZE,
// //                 backgroundColor:'blue'},style]}></Animated.View>
// //         </View>
// //     )
// // }
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center'
// //     }
// // })
// // export default Animation1
