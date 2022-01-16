/* eslint-disable react-native/no-inline-styles */
//Custom bank spendings - custom bar chart + number animation
import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import faker from "faker";
import Animated, {
  useAnimatedStyle,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";
import { AntDesign as Icon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_500Medium,
  Inter_300Light,
  Inter_400Regular,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import Constants from "expo-constants";
import { MotiView, MotiText } from "moti";

const { width, height } = Dimensions.get("window");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

faker.seed(21);

const _min = 3000;
const _max = 10000;
const _limit = _min + _max;
const _minH = height * 0.1;
const _maxH = height * 0.4;
const _maxItems = 6;
const _itemWidth = width / (_maxItems + 2);
const _colors = {
  active: "#329F82",
  inactive: "#E9F0EE",
  up: "#329F82",
  down: "#E7B824",
};

function scaleBetween(
  value,
  minH = _minH,
  maxH = _maxH,
  min = _min,
  max = _limit
) {
  return Math.round(((maxH - minH) * (value - min)) / (max - min) + minH);
}

const _data = months.map((month) => {
  const visitors = faker.datatype.number(_max) + _min;
  return {
    key: month,
    visitors,
    visitorsHeight: scaleBetween(visitors),
    usage: faker.datatype.number(4000) + _min,
  };
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
    padding: 20,
    paddingTop: Constants.statusBarHeight,
  },
});

const Item = ({ d, activeIndex, index, onPress }) => {
  const v = useDerivedValue(() => {
    return withTiming(activeIndex.value - index === 0 ? 1 : 0.15);
  });
  const stylez = useAnimatedStyle(() => {
    return {
      // backgroundColor: interpolateColor(v.value, [index - 1.3, index, index + 1.3], [_colors.inactive, _colors.active, _colors.inactive])
      opacity: v.value,
    };
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        key={d.key}
        style={{ width: _itemWidth, justifyContent: "flex-end" }}
      >
        <Animated.View
          style={[
            {
              height: d.visitorsHeight,
              backgroundColor: _colors.active,
              borderRadius: 16,
              marginBottom: 10,
            },
            stylez,
          ]}
        />
        <Text
          style={{
            textTransform: "uppercase",
            fontSize: 10,
            fontWeight: "700",
            alignSelf: "center",
          }}
        >
          {d.key}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const AnimatedText = ({ num, value, style, formatter }) => {
  const xxx = usePrevious(num);
  return (
    <MotiView style={{ height: 32, overflow: "hidden" }}>
      <MotiView
        from={{ translateY: -32 * (xxx ?? 0) }}
        animate={{ translateY: -32 * num }}
        transition={{
          type: "timing",
          duration: 500,
          delay: 80,
        }}
      >
        <MotiText style={style}>
          {value} {formatter}
        </MotiText>
      </MotiView>
    </MotiView>
  );
};

const BottomStats = ({ label, activeIndex, percentage, data, value }) => {
  const direction = useDerivedValue(() => {
    return withTiming(percentage.value < 0 ? -1 : 1);
  });
  const newPercentage = useDerivedValue(() => {
    return Math.abs(percentage.value);
  });
  const animatedProps = useAnimatedProps(() => {
    return {
      color: interpolateColor(
        direction.value,
        [-1, 1],
        [_colors.down, _colors.up]
      ),
    };
  });
  const iconStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${-direction.value * 45}deg`,
        },
      ],
    };
  });
  return (
    <View style={{ width: width / 2 }}>
      <Text style={{ fontSize: 32, fontFamily: "Inter_700Bold" }}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <AnimatedText
          text={value}
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 32,
            lineHeight: 32 * 1.4,
            width: 90,
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <AnimatedIcon
            name={"arrowright"}
            size={24}
            animatedProps={animatedProps}
            style={iconStyles}
          />
          <AnimatedText
            text={15}
            formatter="%"
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 16,
              color: "fuchsia",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default function App() {
  const activeIndex = useSharedValue(0);
  const visitorsValue = useSharedValue(_data[activeIndex.value].visitors);
  const usageValue = useSharedValue(_data[activeIndex.value].usage);
  const prevVisitorsPercentage = useSharedValue(0);
  const prevUsagePercentage = useSharedValue(0);
  const totalVisitors = useMemo(() =>
    _data.reduce((acc, item) => (acc += item.visitors), 0)
  );

  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_300Light,
    Inter_400Regular,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={{ alignItems: "center", marginBottom: height * 0.1 }}>
        <Text style={{ fontSize: 52, fontFamily: "Inter_700Bold" }}>
          {totalVisitors}
        </Text>
        <Text style={{ fontSize: 32, fontFamily: "Inter_300Light" }}>
          Last 6 months
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {_data.slice(0, _maxItems).map((d, index) => {
          return (
            <Item
              key={index}
              d={d}
              activeIndex={activeIndex}
              index={index}
              onPress={() => {
                activeIndex.value = index;
                visitorsValue.value = withTiming(d.visitors);
                usageValue.value = withTiming(d.usage);
                const prevVisitors = _data[index - 1]
                  ? _data[index - 1].visitors
                  : d.visitors;
                const prevUsage = _data[index - 1]
                  ? _data[index - 1].usage
                  : d.usage;
                prevVisitorsPercentage.value = withTiming(
                  (d.visitors * 100) / prevVisitors - 100
                );
                prevUsagePercentage.value = withTiming(
                  (d.usage * 100) / prevUsage - 100
                );
              }}
            />
          );
        })}
      </View>

      <View style={{ flexDirection: "row" }}>
        <BottomStats
          data={_data}
          activeIndex={activeIndex}
          percentage={prevVisitorsPercentage}
          value={visitorsValue}
          label={"Visitors"}
        />
        {console.log(prevVisitorsPercentage)}
        <BottomStats
          data={_data}
          activeIndex={activeIndex}
          percentage={prevUsagePercentage}
          value={usageValue}
          label={"Usage"}
        />
      </View>
    </View>
  );
}


