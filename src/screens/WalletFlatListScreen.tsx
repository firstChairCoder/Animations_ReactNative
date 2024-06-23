import { Animated, FlatList, StyleSheet } from "react-native";

import {
  Card,
  Cards,
  CARD_HEIGHT as DEFAULT_CARD_HEIGHT,
  SCREEN_HEIGHT
} from "../components/Wallet";

const MARGIN = 16;
const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;
const height = SCREEN_HEIGHT - 64;
const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    marginVertical: MARGIN
  }
});

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const cards = [
  {
    type: Cards.Card1
  },
  {
    type: Cards.Card2
  },
  {
    type: Cards.Card3
  },
  {
    type: Cards.Card4
  },
  {
    type: Cards.Card5
  },
  {
    type: Cards.Card6
  },
  {
    type: Cards.Card2
  },
  {
    type: Cards.Card3
  },
  {
    type: Cards.Card4
  },
  {
    type: Cards.Card6
  }
];

export const WalletFlatListScreen = () => {
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true
  }); // onScroll function helps in tracking the height of each item on screen from "og" position
  return (
    <AnimatedFlatList
      data={cards}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: { type }, index }) => (
        <WalletCard {...{ type, y, index }} />
      )}
      bounces={false}
      scrollEventThrottle={16}
      {...{ onScroll }}
    />
  );
};

interface WalletCardProps {
  index: number;
  y: Animated.Value;
  type: Cards;
}
function WalletCard({ index, y, type }: WalletCardProps) {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT; //just outside of viewport
  const isTop = 0; // beginning of viewport
  const isBottom = height - CARD_HEIGHT; // screen height (w/margins) - card = just at bottom of viewport
  const isAppearing = height; // screen height (w/padding) leaving card just showing on screen()
  const inputRange = [isDisappearing, isTop, isBottom, isAppearing];

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0.5, 1, 1, 0.5]
  });

  const scale = position.interpolate({
    inputRange,
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp"
  });

  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolate: "clamp"
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp"
    })
  );

  return (
    <Animated.View
      style={[styles.card, { opacity, transform: [{ scale }, { translateY }] }]}
    >
      <Card {...{ type }} />
    </Animated.View>
  );
}
