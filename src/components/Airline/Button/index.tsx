import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
	FlipInXDown,
	FlipOutXUp,
	useSharedValue,
	useAnimatedStyle,
	withTiming
} from "react-native-reanimated";
import styled from "styled-components/native";

const Content = styled(LinearGradient)`
	width: 100%;
	align-items: center;
`;

const ButtonView = styled(Animated.View)`
	width: 100%;
	align-items: center;
	position: absolute;
	bottom: 40px;
	z-index: 9999;
`;

const Button = styled.TouchableOpacity.attrs({
	activeOpacity: 1,
})`
	width: 50%;
	box-shadow: 0px 8px 6px #9bc3fb;
`;

const ButtonContent = styled(LinearGradient).attrs({
	colors: ["#6E8DFF", "#4995FE"],
	start: { x: 0.5, y: 0 },
	end: { x: 1, y: 0 },
})`
	width: 100%;
	height: 45px;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
	box-shadow: 0px 4px 10px #4995fe;
`;

const ButtonText = styled.Text`
	color: white;
	font-size: 16px;
	font-weight: bold;
`;

interface CustomButtonProps {
	showFlyInfo: boolean;
	onPress: () => void;
}

const CustomButton = ({ showFlyInfo, onPress}: CustomButtonProps) => {
	const buttonScale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: buttonScale.value }],
		};
	});

	function handlePress(press: string) {
    buttonScale.value = withTiming(press === "pressIn" ? 0.9 : 1, { duration: 80 });
  };

	return (
		<ButtonView
			entering={FlipInXDown.duration(600)}
			exiting={FlipOutXUp}
			style={animatedStyle}
		>
			<Button
				onPress={showFlyInfo ? () => {} : onPress}
				onPressIn={() => handlePress("pressIn")}
				onPressOut={() => handlePress("pressOut")}
			>
				<ButtonContent>
					<ButtonText>
						{showFlyInfo ? "Go to Home screen" : "Confirm $1,536.00"}
					</ButtonText>
				</ButtonContent>
			</Button>
		</ButtonView>
	);
};

export default CustomButton;
