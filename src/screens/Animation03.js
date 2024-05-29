//WORK IN PROGRESS!!
// //Custom bank spendings - custom bar chart + number animation
import { useEffect, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import faker from "faker";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { AntDesign as Icon } from "@expo/vector-icons";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_900Black,
  useFonts
} from "@expo-google-fonts/inter";
import Constants from "expo-constants";
import { MotiText, MotiView } from "moti";

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
  "Dec"
];

const _min = 3000;
const _max = 10000;
const _limit = _min + _max;
const MIN_H = height * 0.1;
const MAX_H = height * 0.4;
const MAX_ITEMS = 6;
const ITEM_WIDTH = width / (MAX_ITEMS + 2);
const _colors = {
  active: "#329F82",
  inactive: "#E9F0EE",
  up: "#329F82",
  down: "#E7B824"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: Constants.statusBarHeight
  },
  textWrapper: {
    backgroundColor: _colors.active,
    borderRadius: 16,
    marginBottom: 10
  },
  monthText: {
    alignSelf: "center",
    color: _colors.active,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  label: { fontFamily: "Bold", fontSize: 32 },
  value: {
    fontFamily: "Regular",
    fontSize: 32,
    lineHeight: 32 * 1.4,
    width: 90
    // color: "lime",
  },
  percent: {
    fontFamily: "Medium",
    fontSize: 16
    // color: "fuchsia",
  },
  visitorsText: { color: "#000", fontFamily: "Bold", fontSize: 52 },
  monthsLabel: { fontFamily: "Light", fontSize: 32 }
});

faker.seed(21);

const _data = months.map((month) => {
  const visitors = faker.datatype.number(_max) + _min;
  return {
    key: month,
    visitors,
    visitorsHeight: scaleBetween(visitors),
    usage: faker.datatype.number(4000) + _min
  };
});

function scaleBetween(
  value,
  minH = MIN_H,
  maxH = MAX_H,
  min = _min,
  max = _limit
) {
  return Math.round(((maxH - minH) * (value - min)) / (max - min) + minH);
}

const Item = ({ d, activeIndex, index, onPress }) => {
  const v = useDerivedValue(() => {
    return withTiming(activeIndex.value - index === 0 ? 1 : 0.15);
  });
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: v.value
    };
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        key={d.key}
        style={{ width: ITEM_WIDTH, justifyContent: "flex-end" }}
      >
        <Animated.View
          style={[{ height: d.visitorsHeight }, styles.textWrapper, stylez]}
        />
        <Text style={styles.monthText}>{d.key}</Text>
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
          delay: 80
        }}
      >
        <MotiText style={style}>
          {value} {formatter}
        </MotiText>
      </MotiView>
    </MotiView>
  );
};

const BottomStats = ({ label, percentage, value }) => {
  const direction = useDerivedValue(() => {
    return withTiming(percentage.value < 0 ? -1 : 1);
  });
  // const newPercentage = useDerivedValue(() => {
  //   return Math.abs(percentage.value);
  // });
  const animatedProps = useAnimatedProps(() => {
    return {
      color: interpolateColor(
        direction.value,
        [-1, 1],
        [_colors.down, _colors.up]
      )
    };
  });
  const iconStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${-direction.value * 45}deg`
        }
      ]
    };
  });
  return (
    <View style={{ width: width / 2 }}>
      <Text style={styles.label}>{label}</Text>
      {}
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <AnimatedText text={value} style={styles.value} />
        {}
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <AnimatedIcon
            name={"arrowright"}
            size={24}
            animatedProps={animatedProps}
            style={iconStyles}
          />
          <AnimatedText text={15} formatter="%" style={styles.percent} />
        </View>
      </View>
    </View>
  );
};

export const Animation03 = () => {
  const activeIndex = useSharedValue(0);
  const visitorsValue = useSharedValue(_data[activeIndex.value].visitors);
  const usageValue = useSharedValue(_data[activeIndex.value].usage);
  const prevVisitorsPercentage = useSharedValue(0);
  const prevUsagePercentage = useSharedValue(0);
  const totalVisitors = useMemo(() =>
    _data.reduce((acc, item) => (acc += item.visitors), 0)
  );

  let [fontsLoaded] = useFonts({
    Medium: Inter_500Medium,
    Light: Inter_300Light,
    Regular: Inter_400Regular,
    Bold: Inter_700Bold,
    Black: Inter_900Black
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={"lime"} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {}
      <View style={{ alignItems: "center", marginBottom: height * 0.1 }}>
        <Text style={styles.visitorsText}>{totalVisitors}</Text>
        <Text style={styles.monthsLabel}>Last 6 months</Text>
      </View>

      {}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {_data.slice(0, MAX_ITEMS).map((d, index) => {
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

      {}
      <View style={{ flexDirection: "row" }}>
        <BottomStats
          data={_data}
          activeIndex={activeIndex}
          percentage={prevVisitorsPercentage}
          value={visitorsValue}
          label={"Visitors"}
        />
        {/* {console.log(prevVisitorsPercentage)} TODO: Fix non sending log messages */}
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
};
