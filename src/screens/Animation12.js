import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MotiView } from "moti";
import { findLastIndex } from "lodash";

const DATA = [
  {
    title: "Main dishes",
    key: "Maindishes",
    data: [
      "Pizza",
      "Burger",
      "Risotto",
      "Spaghetti",
      "Calzone",
      "Gnocchi",
      "Lasagna",
      "Ravioli",
      "Carbonara",
      "Arancini",
      "Baccala",
      "Buridda",
      "Fiorentina Steak",
      "Lonza",
      "Osso buco",
      "Prosciutto",
      "Salame",
      "Brodo"
    ]
  },
  {
    title: "Sides",
    key: "Sides",
    data: [
      "French Fries",
      "Onion Rings",
      "Fried Shrimps",
      "Pesto",
      "Cornetto",
      "Fried eggplant",
      "Vitello",
      "Burrini",
      "Fontina"
    ]
  },
  {
    title: "Extra Sides",
    key: "ExtraSides",
    data: ["Ricotta", "Toma", "Tabor", "Sandwich", "Biscotti", "Fruit Salad"]
  },
  {
    title: "Drinks",
    key: "Drinks",
    data: ["Water", "Coke", "Beer", "Wine", "Tequila", "Soda"]
  },
  {
    title: "Desserts",
    key: "Desserts",
    data: ["Tiramisu", "Cheese Cake", "Icecream"]
  }
];

export const Animation12 = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef();
  const sectionRef = useRef();
  const activeSection = useRef(0);

  const headers = useMemo(
    () => DATA.map((item) => ({ key: item.key, title: item.title })),
    []
  );

  const onCheckViewableItems = ({ viewableItems }) => {
    // const half = viewableItems.slice(Math.floor(viewableItems.length / 2), -1);
    const lastIndex = findLastIndex(
      viewableItems,
      (i) => i.index === 0 || i.index === null
    );
    const middleSection = viewableItems[lastIndex];
    if (!middleSection) {
      return;
    }
    const {
      section: { key }
    } = middleSection;
    const activeIndex = DATA.findIndex((item) => item.key === key);
    if (activeIndex !== activeSection.current || index !== activeIndex) {
      activeSection.current = activeIndex;
      setIndex(activeIndex);
      console.log("Key: ", key);
      console.log("activeSection.current: ", activeSection.current);
    }
  };

  //   console.log(headers);

  useEffect(() => {
    ref?.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: 0,
      viewPosition: 0.5
    });
  }, [index]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight
      }}
    >
      <StatusBar hidden />
      <Animated.FlatList
        ref={ref}
        data={headers}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ padding: 16 }}
        initialScrollIndex={index}
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                activeSection.current = fIndex;
                setIndex(fIndex);
                sectionRef?.current.scrollToLocation({
                  sectionIndex: fIndex,
                  itemIndex: 0,
                  animated: true,
                  viewOffset: 0,
                  viewPosition: 0.2
                });
              }}
            >
              <MotiView
                style={{
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F9C2FF",
                  marginRight: 10,
                  marginVertical: 10,
                  paddingHorizontal: 24,
                  borderRadius: 16,
                  borderWidth: 2
                }}
                animate={{
                  backgroundColor: fIndex === index ? "#F9C2FFFF" : "#F9C2FF00",
                  borderColor: fIndex === index ? "#F9C2FF00" : "#F9C2FFFF",
                  opacity: fIndex === index ? 1 : 0.6
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: 2
                  }}
                >
                  {item.title}
                </Text>
              </MotiView>
            </TouchableOpacity>
          );
        }}
      />

      <Animated.SectionList
        sections={DATA}
        ref={sectionRef}
        keyExtractor={(item, i) => item + i}
        contentContainerStyle={{ padding: 16 }}
        initialScrollIndex={0}
        scrollEventThrottle={16}
        onViewableItemsChanged={onCheckViewableItems}
        stickySectionHeadersEnabled={false}
        viewabilityConfig={{
          minimumViewTime: 300,
          itemVisiblePercentThreshold: 300
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              fontSize: 32,
              backgroundColor: "whitesmoke",
              marginVertical: 20
            }}
          >
            {title}
          </Text>
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                backgroundColor: "#F9C2FF",
                padding: 10,
                marginVertical: 8
              }}
            >
              <Text style={{ fontSize: 24 }}>{item}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
