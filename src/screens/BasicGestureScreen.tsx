import React from "react";
import { View } from "react-native";
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const SIZE = 90;
const RADIUS = SIZE * 2;

type ContextType = {
	translateX: number;
	translateY: number;
};

export const BasicGestureScreen = () => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: translateX.value,
				},
				{
					translateY: translateY.value,
				},
			],
		};
	});

	const panGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		ContextType
	>({
		onStart: (event, context) => {
			context.translateX = translateX.value;
			context.translateY = translateY.value;
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.translateX;
			translateY.value = event.translationY + context.translateY;
		},
		onEnd: () => {
			const distance = Math.sqrt(
				translateX.value ** 2 + translateY.value ** 2
			);

			if (distance < RADIUS + SIZE / 2) {
				translateX.value = withSpring(0);
				translateY.value = withSpring(0);
			}
		},
	});

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "lime",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<View
				style={{
					width: RADIUS * 2,
					height: RADIUS * 2,
					alignItems: "center",
					justifyContent: "center",
					borderRadius: RADIUS,
					borderWidth: 5,
					borderColor: "rgba(0, 0, 256, 0.5)",
				}}
			>
				<PanGestureHandler onGestureEvent={panGestureEvent}>
					<Animated.View
						style={[
							{
								width: SIZE,
								height: SIZE,
								backgroundColor: "rgba(0, 0, 256, 0.5)",
								borderRadius: 20,
							},
							animatedStyle,
						]}
					/>
				</PanGestureHandler>
			</View>
		</View>
	);
};
