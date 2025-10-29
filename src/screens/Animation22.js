import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import data from "../mockdata/hublotData.json";

const { width, height } = Dimensions.get("window");
const SLIDE_HEIGHT = height * 0.7;
const _imageWidth = width * 0.8;
const _imageHeight = _imageWidth * 1.47;

export const Animation22 = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  useEffect(() => {
    StatusBar.setHidden(true);
    // Dynamically scroll to let the user know what direction is the scroll :)
    // const bottom = setTimeout(() => {
    //     ref?.current?.scrollToOffset({
    //         offset: 100,
    //         animated: true
    //     })
    // }, 400)
    // const back = setTimeout(() => {ref?.current?.scrollToOffset({
    //     offset: 0,
    //     animated: true
    // })}, 600);

    // return () => {
    //     clearTimeout(back)
    //     clearTimeout(bottom)
    // }
  }, []);

  return (
    <Animated.FlatList
      ref={ref}
      data={data}
      keyExtractor={(item) => item.img}
      snapToInterval={SLIDE_HEIGHT}
      decelerationRate="fast"
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      contentContainerStyle={{
        backgroundColor: "#EEEFF3",
        paddingVertical: (height - SLIDE_HEIGHT) / 4
      }}
      renderItem={({ item, index }) => {
        const inputRange = [index - 1, index, index + 1];
        const translateY = Animated.divide(scrollY, SLIDE_HEIGHT).interpolate({
          inputRange,
          outputRange: [300, 0, -300]
        });
        const scale = Animated.divide(scrollY, SLIDE_HEIGHT).interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp"
        });
        const opacity = Animated.divide(scrollY, SLIDE_HEIGHT).interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        });
        const translateYText = Animated.divide(
          scrollY,
          SLIDE_HEIGHT
        ).interpolate({
          inputRange,
          outputRange: [-200, 0, -200]
        });
        return (
          <View
            style={{
              width: width,
              height: SLIDE_HEIGHT,
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <Animated.Image
              source={{ uri: item.img }}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                opacity: 0.5,
                transform: [
                  {
                    rotate: "50deg"
                  },
                  {
                    translateY
                  }
                ],
                width: _imageWidth * 0.8,
                height: _imageHeight * 0.75,
                resizeMode: "contain"
              }}
              blurRadius={4}
            />
            <Animated.Image
              source={{ uri: item.img }}
              style={{
                transform: [
                  {
                    scale
                  }
                ],
                width: _imageWidth,
                height: _imageHeight,
                resizeMode: "cover"
              }}
            />
            <Animated.View
              style={{
                backgroundColor: "#fff",
                paddingVertical: 40,
                width: width * 0.8,
                borderRadius: 12,
                transform: [
                  {
                    translateY: translateYText
                  }
                ],
                opacity,
                alignItems: "center",
                marginTop: -20,
                zIndex: -1
              }}
            >
              <Text
                style={{
                  opacity: 0.4,
                  fontSize: 12,
                  fontWeight: "700",
                  maxWidth: width * 0.7,
                  marginBottom: 20,
                  textAlign: "center",
                  letterSpacing: 3
                }}
              >
                {item.collection}
              </Text>
              <Text
                style={{
                  opacity: 0.8,
                  marginBottom: 20,
                  maxWidth: width * 0.7,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "800",
                  fontFamily: "serif"
                }}
              >
                {item.subcollection}
              </Text>
              <Text
                style={{
                  fontFamily: "serif",
                  fontSize: 32,
                  marginBottom: 10
                }}
              >
                {item.price}
              </Text>
              <TouchableOpacity style={{ position: "absolute", bottom: -40 }}>
                <View
                  style={{
                    borderRadius: 12,
                    backgroundColor: "#1C3A80",
                    margin: 20,
                    height: 44,
                    paddingHorizontal: 44,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "800",
                      textTransform: "uppercase"
                    }}
                  >
                    Add to cart
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        );
      }}
    />
  );
};

//SCRAPER FUNCTION FOR DATA IN HUBLOTDATA.JSON
// data from: https://www.hublot.com/en-us/find-your-hublot/classic-fusion

// let items = document.querySelectorAll('.ts_watch')
// let doc = [];
// for(let i = 0; i < items.length; i++) {
//     const item = items[i];
//     const img = item.querySelector('img').src;
//     const price = item.querySelector('.ts_watch__price').innerText;
//     const collection = item.querySelector('.ts_watch__collection').innerText;
//     const subcollection = item.querySelector('.ts_watch__subcollection').innerText;

//     doc.push({
//         img,
//         price,
//         collection,
//         subcollection
//     })
// }

// copy(JSON.stringify(doc, null, 2))
