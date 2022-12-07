import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
	ZoomIn,
	ZoomOut,
	useSharedValue,
	FlipInXDown,
	FlipOutXDown,
	useAnimatedScrollHandler,
	interpolate
} from "react-native-reanimated";
import styled from "styled-components/native";
import { Entypo as Icon } from "@expo/vector-icons";

import Card from "../Card";
import { cards } from "../../../data/flightData";

const CARD_HEIGHT = 170;
const Container = styled(Animated.View)`
	width: 100%;
	height: 63%;
	align-items: center;
	position: absolute;
	bottom: 0px;
	background-color: white;
	box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.3);
	z-index: 999;
`;

const Title = styled.Text`
	color: black;
	margin: 28px 0;
	opacity: 0.3;
	font-weight: 600;
`;

const ButtonView = styled(Animated.View)`
	position: absolute;
	right: 25px;
	top: 45%;
	z-index: 9999;
`;

const Button = styled.TouchableOpacity.attrs({
	activeOpacity: 0.8,
})`
	height: 40px;
	width: 40px;
	border-radius: 20px;
	align-items: center;
	justify-content: center;
	background-color: white;
	box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.15);
`;

const CardScroll = styled(Animated.ScrollView)``;

const BottomGradient = styled(LinearGradient).attrs({
	colors: ["rgba(255, 255, 255, 0)", "white"],
	end: { x: 0.5, y: 0.5 },
})`
	width: 100%;
	height: 150px;
	position: absolute;
	bottom: 0;
`;

export const CardSelect = () => {
	const isScrolling = useSharedValue(false);
	const currentCard = useSharedValue(0);
	const toDown = useSharedValue(false);
	const currCardRotationX = useSharedValue(60);
	const prevCardRotationX = useSharedValue(60);
	const nextCardRotationX = useSharedValue(60);
	const currentCardMarginBottom = useSharedValue(-40);
	const prevCardMarginBottom = useSharedValue(0);
	const nextCardMarginBottom = useSharedValue(-140);
	const nextCardShadowOpacity = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: () => (isScrolling.value = true),
    onEndDrag: () => (isScrolling.value = false),
    onScroll: (event, context: any) => {
      const newIndex = Math.floor(event.contentOffset.y / CARD_HEIGHT);

      currentCard.value = newIndex;
      toDown.value = context.lastValue < event.contentOffset.y;

      const value = Math.abs(event.contentOffset.y - CARD_HEIGHT * newIndex);

      currCardRotationX.value = interpolate(value, [0, 170], [0, 60]);
      nextCardRotationX.value = interpolate(value, [0, 170], [60, 0]);
      prevCardRotationX.value = interpolate(value, [0, 170], [60, toDown.value ? 60 : 0]);

      currentCardMarginBottom.value = interpolate(value, [0, 170], [-40, 0]);
      nextCardMarginBottom.value = interpolate(value, [0, 170], [-140, -40]);

      nextCardShadowOpacity.value = interpolate(value, [0, 170], [0, 0.25]);

      context.lastValue = event.contentOffset.y;
    },
  });

	return (
		<>
			<ButtonView
				entering={ZoomIn.delay(100).duration(1000)}
				exiting={ZoomOut.duration(600)}
			>
				<Button>
					<Icon name="plus" size={24} color={"lime"} />
				</Button>
			</ButtonView>
			<Container
				entering={FlipInXDown.duration(600)}
				exiting={FlipOutXDown.duration(600)}
			>
				<Title>Select Payment Method</Title>
				<CardScroll
					bounces={false}
					scrollEventThrottle={16}
					decelerationRate={0}
					snapToInterval={CARD_HEIGHT}
					showsVerticalScrollIndicator={false}
					onScroll={scrollHandler}
					contentContainerStyle={{ paddingBottom: 999 }}
				>
					{cards.map((card, index) => (
						<Card
							key={card.id}
							index={index}
							card={card}
							currentCard={currentCard}
							toDown={toDown}
							isScrolling={isScrolling}
							currCardRotationX={currCardRotationX}
							prevCardRotationX={prevCardRotationX}
							nextCardRotationX={nextCardRotationX}
							currentCardMarginBottom={currentCardMarginBottom}
							nextCardMarginBottom={nextCardMarginBottom}
							prevCardMarginBottom={prevCardMarginBottom}
							nextCardShadowOpacity={nextCardShadowOpacity}
						/>
					))}
				</CardScroll>
				<BottomGradient pointerEvents="none" />
			</Container>
		</>
	);
};
