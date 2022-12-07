import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withDelay,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";
import styled from "styled-components/native";
import type { ImageSourcePropType } from "react-native";
const Card = styled(Animated.View)`
  width: 71%;
  height: 170px;
  align-self: center;
  margin-bottom: 20px;
  box-shadow: 0 20px 5px;
  shadow-color: black;
  shadow-offset: 0 20px;
  shadow-radius: 8px;
`;

const CardContent = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 0.8, y: 0 },
})`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 15px 20px;
  justify-content: space-between;
`;

const TopCardLogo = styled.Image`
  height: 25px;
  width: 70px;
`;

const BottomCardView = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const CardTextView = styled.View``;

const CardNumber = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 13px;
`;

const CardName = styled.Text`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 11px;
  margin-top: 8px;
`;

const BottomCardLogo = styled.Image`
  height: 40px;
  width: 50px;
`;

interface CardProps {
  card: {
    id: number;
    colors: string[];
    number: number;
    topLogo: ImageSourcePropType;
    bottomLogo: ImageSourcePropType;
  };
  isScrolling: SharedValue<boolean>;
  toDown: SharedValue<boolean>;
  index: number;
  currentCard: SharedValue<number>;
  currCardRotationX: SharedValue<number>;
  nextCardRotationX: SharedValue<number>;
  prevCardRotationX: SharedValue<number>;
  currentCardMarginBottom: SharedValue<number>;
  nextCardMarginBottom: SharedValue<number>;
  prevCardMarginBottom: SharedValue<number>;
  nextCardShadowOpacity: SharedValue<number>;
}

const CustomCard = ({
  card,
  isScrolling,
  toDown,
  index,
  currentCard,
  currCardRotationX,
  nextCardRotationX,
  prevCardRotationX,
  currentCardMarginBottom,
  nextCardMarginBottom,
  prevCardMarginBottom,
  nextCardShadowOpacity,
}: CardProps) => {
  const otherCardsRotationX = useSharedValue(60);
  const cardTop = useSharedValue(400);

  setTimeout(() => {
    if (index === 0) {
      currCardRotationX.value = withDelay(
        450,
        withTiming(0, { duration: 600 })
      );
      cardTop.value = withDelay(300, withTiming(0, { duration: 600 }));
    } else {
      cardTop.value = withDelay(
        index * 50 + 300,
        withTiming(0, { duration: 600 })
      );
    }
  }, 100);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    if (isScrolling.value) {
      if (toDown.value) {
        otherCardsRotationX.value = withTiming(50, { duration: 150 });
      }
    } else {
      otherCardsRotationX.value = withTiming(60, { duration: index * 100 });
    }

    return {
      transform: [
        { perspective: 500 },
        {
          rotateX: `${
            index === currentCard.value
              ? currCardRotationX.value
              : index === currentCard.value + 1
              ? nextCardRotationX.value
              : index < currentCard.value
              ? prevCardRotationX.value
              : otherCardsRotationX.value
          }deg`,
        },
      ],
      top: cardTop.value,
      marginBottom:
        index === currentCard.value
          ? currentCardMarginBottom.value
          : index === currentCard.value + 1
          ? nextCardMarginBottom.value
          : index < currentCard.value
          ? prevCardMarginBottom.value
          : -140,
      shadowOpacity:
        index <= currentCard.value
          ? 0.25
          : index === currentCard.value + 1
          ? nextCardShadowOpacity.value
          : 0,
      elevation:
        index <= currentCard.value
          ? 1.5
          : index === currentCard.value + 1
          ? nextCardShadowOpacity.value + 3
          : 0,
      zIndex: index === currentCard.value ? 99 : 0,
    };
  });

  return (
    <Card style={cardAnimatedStyle}>
      <CardContent colors={card.colors}>
        <TopCardLogo source={card.topLogo} resizeMode="contain" />
        <BottomCardView>
          <CardTextView>
            <CardNumber>{card.number}</CardNumber>
            <CardName>Joshua Adenusi</CardName>
          </CardTextView>
          <BottomCardLogo source={card.bottomLogo} resizeMode="contain" />
        </BottomCardView>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
