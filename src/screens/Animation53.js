import React, { useState } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	runOnJS,
} from "react-native-reanimated";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
	circle: {
		width: 15,
		height: 15,
		backgroundColor: "ivory",
		borderRadius: 50,
		position: "absolute",
		right: "15%",
		top: "15%",
	},
	headerWrapper: {
		backgroundColor: "#075E54",
		paddingBottom: 5,
		overflow: "hidden",
	},
	headerText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},
	tab: {
		flex: 1,
		textAlign: "center",
		textTransform: "uppercase",
		fontSize: 15,
		color: "rgba(255, 255, 255,0.6)",
	},
	navWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	searchWrapper: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	searchInput: {
		flex: 1,
		height: 30,
		paddingTop: 0,
		paddingBottom: 0,
		textAlignVertical: "center",
	},
});

export const Animation53 = () => {
	const [toggleSearch, setToggleSearch] = useState(false);
	const [showSearchHeader, setShowSearchHeader] = useState(false);
	const [query, setQuery] = useState("")

	const scale = useSharedValue(1);
	const opacity = useSharedValue(0);

	const animatedCircleStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
			opacity: opacity.value,
		};
	});

	const onPressOpen = () => {
		scale.value = withTiming(50, { duration: 300 }, () => {
			runOnJS(setShowSearchHeader)(true);
		});
		opacity.value = 1;
		setToggleSearch(true);
	};

	const onPressClose = () => {
		scale.value = withTiming(1, { duration: 300 }, () => {
			opacity.value = 0;
		});
		setShowSearchHeader(false);
		setToggleSearch(false);
	};

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					backgroundColor: toggleSearch ? "white" : "#075E54",
					height: StatusBar.currentHeight || 30,
				}}
			>
				<StatusBar
					translucent
					backgroundColor={toggleSearch ? "white" : "#075E54"}
					barStyle={toggleSearch ? "dark-content" : "light-content"}
				/>
			</View>
			<View style={styles.headerWrapper}>
				<Animated.View style={[styles.circle, animatedCircleStyle]} />

				{showSearchHeader ? (
					<View style={[styles.navWrapper, styles.searchWrapper]}>
						<TouchableOpacity onPress={onPressClose}>
							<Ionicons
								name="arrow-back"
								color="grey"
								size={20}
								style={{ marginRight: 4 }}
							/>
						</TouchableOpacity>
						<TextInput
							style={styles.searchInput}
							textAlignVertical="center"
							autoFocus={true}
							value={query}
							onChangeText={(val) => setQuery(val)}
							placeholder={"Your text here..."}
						/>
					</View>
				) : (
					<View style={[styles.navWrapper]}>
						<Text style={styles.headerText}>WhatsApp</Text>
						<View style={{ flexDirection: "row" }}>
							<TouchableOpacity onPress={onPressOpen}>
								<AntDesign
									name="search1"
									color="white"
									size={20}
									style={{ marginRight: 16 }}
								/>
							</TouchableOpacity>
							<Entypo
								name="dots-three-vertical"
								color="white"
								size={20}
							/>
						</View>
					</View>
				)}

				<View style={styles.navWrapper}>
					<AntDesign
						name="camera"
						color="white"
						size={20}
						style={{ marginRight: 16 }}
					/>
					<Text style={[styles.headerText, styles.tab]}>Chats</Text>
					<Text style={[styles.headerText, styles.tab]}>Status</Text>
					<Text style={[styles.headerText, styles.tab]}>Calls</Text>
				</View>
			</View>
		</View>
	);
};
