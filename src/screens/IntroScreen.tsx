import React from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";

export const IntroScreen = ({ navigation }) => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "linen",
				justifyContent: "center",
				paddingHorizontal: 16,
			}}
		>
			<Pressable onPress={() => navigation.navigate("Progress")} style={{ marginVertical: 8 }}>
				<View
					style={{
						flexDirection: "row",
						height: 48,
						borderWidth: 1,
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

			<Pressable onPress={() => navigation.navigate("BasicGesture")} style={{ marginVertical: 8 }}>
				<View
					style={{
						flexDirection: "row",
						height: 48,
						borderWidth: 1,
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

			<Pressable onPress={() => navigation.navigate("IntScroll")} style={{ marginVertical: 8 }}>
				<View
					style={{
						flexDirection: "row",
						height: 48,
						borderWidth: 1,
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

			<Pressable onPress={() => navigation.navigate("IntColor")} style={{ marginVertical: 8 }}>
				<View
					style={{
						flexDirection: "row",
						height: 48,
						borderWidth: 1,
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

			<Pressable onPress={() => navigation.navigate("AdvancedFlatList")} style={{ marginVertical: 8 }}>
				<View
					style={{
						flexDirection: "row",
						height: 48,
						borderWidth: 1,
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

			<Pressable onPress={() => navigation.navigate("Flight")} style={{ marginVertical: 8 }}>
				<View
					style={{
						flexDirection: "row",
						height: 48,
						borderWidth: 1,
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

			<Pressable onPress={() => navigation.navigate("Toolbar")} style={{ marginVertical: 8 }}>
				<View
					style={{
						flexDirection: "row",
						height: 48,
						borderWidth: 1,
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
		</View>
	);
};
