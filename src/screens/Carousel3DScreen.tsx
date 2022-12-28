import React, { useRef, useState, useEffect, useCallback } from "react";
import {
	Image,
	Animated,
	Text,
	View,
	Dimensions,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	InteractionManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign as Icon } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";

import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../components/Wallet";

const IMAGE_WIDTH = SCREEN_WIDTH * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const images = [
	"https://images.pexels.com/photos/1799912/pexels-photo-1799912.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1769524/pexels-photo-1769524.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1758101/pexels-photo-1758101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1698394/pexels-photo-1698394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1684429/pexels-photo-1684429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1616164/pexels-photo-1616164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1734364/pexels-photo-1734364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	"https://images.pexels.com/photos/1724888/pexels-photo-1724888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

const DATA = [...Array(images.length).keys()].map((_, i) => {
	return {
		key: faker.datatype.uuid(),
		image: images[i],
		title: faker.commerce.productName(),
		subtitle: faker.company.bs(),
		price: faker.finance.amount(80, 200, 0),
	};
});
const SPACING = 20;

const Content = ({ item }) => {
	return (
		<>
			<Text
				style={{
					textAlign: "center",
					fontWeight: "700",
					fontSize: 16,
					textTransform: "uppercase",
				}}
				numberOfLines={1}
				adjustsFontSizeToFit
			>
				{item.title}
			</Text>
			<Text style={{ fontSize: 12, opacity: 0.4 }}>{item.subtitle}</Text>
			<View style={{ flexDirection: "row", marginTop: SPACING }}>
				<Text
					style={{
						fontSize: 42,
						letterSpacing: 3,
						fontWeight: "900",
						marginRight: 8,
					}}
				>
					{item.price}
				</Text>
				<Text
					style={{
						fontSize: 16,
						lineHeight: 36,
						fontWeight: "700",
						alignSelf: "flex-end",
					}}
				>
					USD
				</Text>
			</View>
		</>
	);
};

const useMount = (func) => useEffect(() => func(), []);

export const Carousel3DScreen = () => {
	const x = useRef(new Animated.Value(0)).current;
	const ref = useRef();
	const [index, setIndex] = useState(0);

	const progress = Animated.modulo(
		Animated.divide(x, SCREEN_WIDTH),
		SCREEN_WIDTH
	);
	const onScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { x } } }],
		{
			useNativeDriver: true,
		}
	);

	const handleNext = () => {
		useMount(() => {
			const interactionPromise = InteractionManager.runAfterInteractions(
				() => onShown()
			);
			return () => interactionPromise.cancel();
		});
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#A5F1FA" }}>
			<StatusBar hidden />
			<SafeAreaView style={{ marginTop: SPACING * 4 }}>
				<View style={{ height: IMAGE_HEIGHT * 2.1 }}>
					<Animated.FlatList
						ref={ref}
						data={DATA}
						keyExtractor={(item) => item.key}
						horizontal
						pagingEnabled
						bounces={false}
						style={{ flexGrow: 0, zIndex: 99 }}
						contentContainerStyle={{
							height: IMAGE_HEIGHT + SPACING * 2,
							paddingHorizontal: SPACING * 2,
						}}
						showsHorizontalScrollIndicator={false}
						onMomentumScrollEnd={(ev) => {
							setIndex(
								Math.floor(
									ev.nativeEvent.contentOffset.x /
										SCREEN_WIDTH
								)
							);
						}}
						renderItem={({ item, index }) => {
							const inputRange = [
								(index - 1) * SCREEN_WIDTH,
								index * SCREEN_WIDTH,
								(index + 1) * SCREEN_WIDTH,
							];

							const opacity = x.interpolate({
								inputRange,
								outputRange: [0, 1, 0],
							});

							const translateY = x.interpolate({
								inputRange,
								outputRange: [50, 0, 20],
							});

							return (
								<Animated.View
									style={[
										{
											width: SCREEN_WIDTH,
											paddingVertical: SPACING,
										},
										{
											opacity,
											transform: [{ translateY }],
										},
									]}
								>
									<Image
										source={{ uri: item.image }}
										style={{
											width: IMAGE_WIDTH,
											height: IMAGE_HEIGHT,
											resizeMode: "cover",
										}}
									/>
								</Animated.View>
							);
						}}
						{...{ onScroll }}
					/>
					<View
						style={{
							width: IMAGE_WIDTH,
							alignItems: "center",
							paddingHorizontal: SPACING * 2,
							marginLeft: SPACING * 2,
							zIndex: 80,
						}}
					>
						{DATA.map((item, index) => {
							const inputRange = [
								(index - 0.2) * SCREEN_WIDTH,
								index * SCREEN_WIDTH,
								(index + 0.2) * SCREEN_WIDTH,
							];

							const opacity = x.interpolate({
								inputRange,
								outputRange: [0, 1, 0],
							});

							const rotateY = x.interpolate({
								inputRange,
								outputRange: ["45deg", "0deg", "45deg"],
							});

							return (
								<Animated.View
									key={item.key}
									style={{
										position: "absolute",
										opacity,
										transform: [
											{ perspective: IMAGE_WIDTH * 4 },
											{ rotateY },
										],
									}}
								>
									<Content item={item} />
								</Animated.View>
							);
						})}
					</View>
					<Animated.View
						style={{
							width: IMAGE_WIDTH + SPACING * 2,
							position: "absolute",
							backgroundColor: "#FFF",
							backfaceVisibility: "visible",
							zIndex: -1,
							top: SPACING * 2,
							left: SPACING,
							bottom: 0,
							shadowColor: "#000",
							shadowOpacity: 0.2,
							shadowRadius: 24,
							shadowOffset: {
								width: 0,
								height: 0,
							},
							transform: [
								{
									perspective: IMAGE_WIDTH * 4,
								},
								{
									rotateY: progress.interpolate({
										inputRange: [0, 0.5, 1],
										outputRange: [
											"0deg",
											"90deg",
											"180deg",
										],
									}),
								},
							],
						}}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: IMAGE_WIDTH + SPACING * 4,
						paddingHorizontal: SPACING,
						paddingVertical: SPACING,
					}}
				>
					<TouchableOpacity
						disabled={index === 0}
						style={{ opacity: index === 0 ? 0.3 : 1 }}
						onPress={() => {
							ref?.current?.scrollToOffset({
								offset: (index - 1) * SCREEN_WIDTH,
								animated: true,
							});
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Icon name="swapleft" size={42} color="#000" />
							<Text style={{ fontSize: 12, fontWeight: "800" }}>
								PREV
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						disabled={index === DATA.length - 1}
						style={{ opacity: index === DATA.length - 1 ? 0.3 : 1 }}
						onPress={() => {
							ref?.current?.scrollToOffset({
								offset: (index + 1) * SCREEN_WIDTH,
								animated: true,
							});
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text style={{ fontSize: 12, fontWeight: "700" }}>
								NEXT
							</Text>
							<Icon name="swapright" size={42} color="#000" />
						</View>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};
