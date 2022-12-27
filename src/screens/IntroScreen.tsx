import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const IntroScreen = ({ navigation }) => {
	const insets = useSafeAreaInsets();
	return (
		<>
			<ScrollView
				style={{
					flex: 0.95,
					backgroundColor: "linen",
					paddingTop: insets.bottom * 1.25,
				}}
				contentContainerStyle={{
					justifyContent: "center",
					paddingHorizontal: 16,
					paddingBottom: insets.bottom * 1.25,
				}}
			>
				<Pressable
					onPress={() => navigation.navigate("Progress")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Progress
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("BasicGesture")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#F00",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Basic Gesture
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("IntScroll")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#FF0",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Scroll Int.
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("IntColor")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#F0F",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Color Int.
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("AdvancedFlatList")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#BE9",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							FlatList
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("Flight")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#CC3",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Airline
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("Toolbar")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#FDA",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Toolbar
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("Wallet")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#369",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Wallet FlatList
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("SlideCounter")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#640",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Slide Counter
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("Layout")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#C1A",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Layout Animation
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("Swipe")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#1CE",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Swiper
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("BottomSheet")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#FDA",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Bottom Sheet
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("Ripple")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#8EA",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Ripple
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("Menu")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#ACE",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Menu
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>

				<Pressable
					onPress={() => navigation.navigate("Square")}
					style={{ marginVertical: 8 }}
				>
					<View
						style={{
							flexDirection: "row",
							height: 48,
							borderWidth: 2,
							borderColor: "#DED369",
							borderRadius: 12,
							paddingHorizontal: 32,
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								marginRight: 32,
								fontSize: 24,
								fontWeight: "bold",
							}}
						>
							Rotating Square
						</Text>
						<Icon
							name="chevron-circle-right"
							color={"white"}
							size={24}
						/>
					</View>
				</Pressable>
			</ScrollView>
			<View style={{ flex: 0.05, backgroundColor: "linen" }} />
		</>
	);
};
