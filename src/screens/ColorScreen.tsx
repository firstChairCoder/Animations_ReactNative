import React, { useState } from "react";
import { View, Switch, Dimensions } from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from "react-native-reanimated";

const SIZE = Dimensions.get("window").width * 0.7;
const Colors = {
	dark: {
		background: "#1E1E1E",
		circle: "darkgray",
		text: "#F8F8F8",
	},
	light: {
		background: "#F8F8F8",
		circle: "#FFF",
		text: "#1E1E1E",
	},
};
const SWITCH_TRACK_COLOR = {
	true: "rgba(256, 0, 256, 0.2)",
	false: "rgba(0,0,0,0.1)",
};
type Theme = "light" | "dark";

export const ColorScreen = () => {
	const [theme, setTheme] = useState<Theme>("light");
	const progress = useDerivedValue(() => {
		return theme === "dark" ? withTiming(1) : withTiming(0);
	}, [theme]);

	const animatedStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[Colors.light.background, Colors.dark.background]
		);

		return { backgroundColor };
	});

	const animatedTextStyle = useAnimatedStyle(() => {
		const color = interpolateColor(
			progress.value,
			[0, 1],
			[Colors.light.text, Colors.dark.text]
		);

		return { color };
	});

	const animatedWrapperStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[Colors.light.circle, Colors.dark.circle]
		);

		return { backgroundColor };
	});

	return (
		<Animated.View
			style={[
				{
					flex: 1,
					backgroundColor: "#fff",
					alignItems: "center",
					justifyContent: "center",
				},
				animatedStyle,
			]}
		>
			<Animated.Text
				style={[
					{
						fontSize: 64,
						textTransform: "uppercase",
						fontWeight: "700",
						marginBottom: 32,
					},
					animatedTextStyle
				]}
			>
				{theme === "light" ? "Light" : "Dark"}
			</Animated.Text>

			<Animated.View
				style={[
					{
						width: SIZE,
						height: SIZE,
						backgroundColor: "#FFF",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: SIZE / 2,
						shadowOffset: {
							width: 0,
							height: 20,
						},
						shadowRadius: 10,
						shadowOpacity: 0.1,
						elevation: 8,
					},
					animatedWrapperStyle
				]}
			>
				<Switch
					value={theme === "dark"}
					onValueChange={(toggled) => {
						setTheme(toggled ? "dark" : "light");
					}}
					trackColor={SWITCH_TRACK_COLOR}
					thumbColor={"fuchsia"}
				/>
			</Animated.View>
		</Animated.View>
	);
};
