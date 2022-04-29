/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FC } from "react";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Typography from "../common/Typography";
import Container from "../common/Container";
import CardContainer from "../components/CardContainer";
import { Fruits } from "../data/data";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.8;
const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "85%",
    marginVertical: 20,
  },
  icon: {
    backgroundColor: "#181d23",
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Home: FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <Container>
      <View style={styles.nav}>
        <Typography text="Fruits" size={30} />
        <Pressable style={styles.icon}>
          {/* error is related to @types/react version. TS2768 */}
          {/* @ts-ignore */}
          <Ionicons name="menu" color="#fff" size={15} />
        </Pressable>
      </View>

      <Typography
        text="WHAT'S NEW"
        size={10}
        color="#69e688"
        style={{
          marginLeft: 28,
          marginTop: 30,
        }}
      />
      <View>
        <Animated.FlatList
          data={Fruits}
          renderItem={({ item, index }) => (
            <CardContainer
              item={item}
              scrollX={scrollX}
              item_width={ITEM_WIDTH}
              index={index}
            />
          )}
          snapToInterval={ITEM_WIDTH}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        />
      </View>
      <Typography
        text="Made by Ben"
        size={18}
        style={{
          marginLeft: 28,
          marginTop: 30,
        }}
      />
    </Container>
  );
};

export default Home;
