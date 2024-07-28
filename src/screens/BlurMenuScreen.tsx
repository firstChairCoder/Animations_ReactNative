/* eslint-disable max-len */
import { Image, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BlurBackground, CustomBlurMenu } from "../components/BlurMenu";

export const BlurMenuScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const topPadding = headerHeight + insets.top;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: topPadding + 20
        }}
        automaticallyAdjustContentInsets
      >
        <Text
          style={{
            fontSize: 16,
            marginLeft: 16,
            marginBottom: 12,
            color: "#000"
          }}
        >
          Image by wirestock on Freepik
        </Text>
        <Image
          source={{
            // eslint-disable-next-line max-len
            uri: "https://img.freepik.com/free-photo/low-angle-shot-small-river-full-rocks-middle-forest_181624-5528.jpg?t=st=1722101226~exp=1722104826~hmac=1cbd9c279e65bb2ccb8100b047e17395e4396e5568288bd92b6277dbbc73e242&w=2000"
          }}
          style={{
            width: "100%",
            height: 250,
            borderRadius: 24,
            marginBottom: 24
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "300", color: "#555" }}>
          {`In the heart of nature lies a lush green forest, a haven of tranquility and beauty. The canopy overhead is a tapestry of vibrant greens, where sunlight filters through, casting dappled patterns on the forest floor.\n 
		  The air is fresh and crisp, filled with the scent of pine and earth, mingling with the sweet aroma of wildflowers in bloom.\n 
		  Birds chirp melodiously, their songs harmonizing with the gentle rustle of leaves swayed by a light breeze.`}
        </Text>
      </ScrollView>
      <>
        <BlurBackground isBlur={isVisible} />
        <CustomBlurMenu
          visible={isVisible}
          onToggle={() => setIsVisible((prev) => !prev)}
        />
      </>
    </View>
  );
};
