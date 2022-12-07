import styled from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import Animated, {
	Extrapolate,
	FlipOutXUp,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
	Easing,
	ZoomIn,
	FadeInDown,
	FadeOut,
} from "react-native-reanimated";
import { Ionicons, Entypo } from "@expo/vector-icons";

const Container = styled(Animated.View)`
	width: 100%;
	height: 330px;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 40px;
	z-index: 9999;
`;

const ScrollTextView = styled(Animated.View)`
	height: 30px;
	width: 100%;
	align-items: center;
	position: absolute;
	top: 60px;
	z-index: 9999;
`;

const StatusText = styled.Text`
	font-size: 19px;
	color: #c3c3c3;
	font-weight: 600;
	text-align: center;
`;

const IconViewOut = styled(Animated.View)`
	height: 80px;
	width: 100px;
	border-radius: 80px;
	background: #f1f1f1;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 0px 8px rgba(1, 1, 1, 0.15);
	z-index: 999;
`;

const IconView = styled.View`
	height: 80px;
	width: 80px;
	border-radius: 40px;
	background: white;
	align-items: center;
	justify-content: center;
	box-shadow: 4px 15px 8px rgba(1, 1, 1, 0.15);
`;

const IconContent = styled(Animated.View)``;

const Wave = styled(Animated.View)`
	height: 350px;
	width: 350px;
	border-radius: 200px;
	box-shadow: 0px 0px 20px red;
	position: absolute;
	z-index: 10;
`;

const texts = ["Connected...", "Secure payment...", "Purchased"];

export const StatusContent = () => {
	const [icon, setIcon] = useState<any>("md-wifi");
	const listRef = useRef<FlatList>(null);

	const buttonScale = useSharedValue(1);
	const wave1Opacity = useSharedValue(1);
	const wave1Scale = useSharedValue(0);
	const waveBackground = useSharedValue("#F3F3F3");
	const wave2Opacity = useSharedValue(1);
	const wave2Scale = useSharedValue(0);
	const iconOpacity = useSharedValue(0);

	const buttonAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: buttonScale.value }],
	}));

	const iconAnimatedStyle = useAnimatedStyle(() => ({
		opacity: iconOpacity.value,
	}));

	useEffect(() => {
		setTimeout(() => {
			let index = 0;

			iconOpacity.value = withSequence(
				withTiming(1),
				withDelay(2400, withTiming(0)),
				withTiming(1),
				withDelay(2400, withTiming(0)),
				withTiming(1),
				withDelay(2400, withTiming(0)),
				withTiming(1)
			);

			wave1Scale.value = withRepeat(
				withTiming(1, { duration: 2500, easing: Easing.linear }),
				-1,
				false
			);

			wave2Scale.value = withDelay(
				800,
				withRepeat(
					withTiming(1, { duration: 2500, easing: Easing.linear }),
					-1,
					false
				)
			);

			waveBackground.value = withDelay(
				8000,
				withTiming("rgba(241, 241, 241, 0.4)")
			);

			const interval = setInterval(() => {
				if (index < texts.length - 1) {
					index = index + 1;

					setTimeout(
						() =>
							listRef.current.scrollToIndex({
								index,
								animated: true,
							}),
						index === 2 ? 3000 : 0
					);

					if (index === 1) {
						setIcon("link-sharp");
						setTimeout(
							() => setIcon("shield-checkmark-outline"),
							2900
						);
					}

					if (index === 2) {
						setTimeout(() => setIcon("check"), 2900);
					}
				} else {
					clearInterval(interval);
				}
			}, 3000);
		}, 3000);
	}, []);

	const wave1AnimatedStyle = useAnimatedStyle(() => {
		wave1Opacity.value = interpolate(
			wave1Scale.value,
			[0, 0.8, 1],
			[1, 1, 0],
			Extrapolate.CLAMP
		);

		return {
			transform: [{ scale: wave1Scale.value }],
			opacity: wave1Opacity.value,
			backgroundColor: waveBackground.value,
		};
	});

	const wave2AnimatedStyle = useAnimatedStyle(() => {
		wave2Opacity.value = interpolate(
			wave2Scale.value,
			[0, 0.8, 1],
			[1, 1, 0],
			Extrapolate.CLAMP
		);

		return {
			transform: [{ scale: wave2Scale.value }],
			opacity: wave2Opacity.value,
			backgroundColor: waveBackground.value,
		};
	});

	return (
		<Container exiting={FadeOut.duration(600)} style={buttonAnimatedStyle}>
			<ScrollTextView entering={FadeInDown.duration(600).delay(300)}>
				<FlatList
					ref={listRef}
					data={texts}
					showsVerticalScrollIndicator={false}
					scrollEnabled={false}
					renderItem={({ item }) => <StatusText>{item}</StatusText>}
				/>
			</ScrollTextView>
			<IconViewOut entering={ZoomIn.duration(600).delay(300)}>
				<IconView>
					<IconContent style={iconAnimatedStyle}>
						{icon === "check" ? (
							<Entypo name="check" size={50} color="black" />
						) : (
							<Ionicons name={icon} size={45} color="#C3C3C3" />
						)}
					</IconContent>
				</IconView>
			</IconViewOut>
			<Wave style={wave1AnimatedStyle} />
			<Wave style={wave2AnimatedStyle} />
		</Container>
	);
};
