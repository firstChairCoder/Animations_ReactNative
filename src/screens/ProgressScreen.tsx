import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withRepeat,
	useAnimatedGestureHandler,
} from "react-native-reanimated";

const SIZE = 100.0;

export const ProgressScreen = () => {
	const progress = useSharedValue(1);
	const scale = useSharedValue(2);

	const handleRotation = (progress: Animated.SharedValue<number>) => {
		"worklet";
		return `${progress.value * 2 * Math.PI}rad`;
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			borderRadius: (progress.value * SIZE) / 2,
			opacity: progress.value,
			transform: [
				{ scale: scale.value },
				{ rotate: handleRotation(progress) },
			],
		};
	});

	useEffect(() => {
		progress.value = withRepeat(withSpring(0.5), -1, true);
		scale.value = withRepeat(withSpring(1), -1, true);
	}, []);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "white",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Animated.View
				style={[
					{ height: SIZE, width: SIZE, backgroundColor: "teal" },
					animatedStyle,
				]}
			/>
		</View>
	);
};
