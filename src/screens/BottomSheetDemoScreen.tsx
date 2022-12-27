import React, { useCallback, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { BottomSheet, BottomSheetRefProps } from "../components/BottomSheet";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#17161A",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		height: 50,
		borderRadius: 25,
		aspectRatio: 1,
		backgroundColor: "#FFF",
		opacity: 0.5,
	},
	body: {
		flex: 1,
		backgroundColor: "rgba(50,205,50,.75)",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 32,
		fontStyle: "italic",
		color: "#FFF",
		marginVertical: 40,
	},
});

export const BottomSheetDemoScreen = () => {
	const ref = useRef<BottomSheetRefProps>(null);

	const onPress = useCallback(() => {
		const isActive = ref?.current?.isActive();
		if (isActive) {
			ref?.current?.scrollTo(0);
		} else {
			ref?.current?.scrollTo(-200);
		}
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style="inverted" />
			<TouchableOpacity style={styles.button} onPress={onPress} />
			<BottomSheet ref={ref}>
				<View style={styles.body}>
					<Text style={styles.text}>Now you see me!</Text>
					<Text style={styles.text}>Now you see me!</Text>
					<Text style={styles.text}>Now you see me!</Text>
					<Text style={styles.text}>Now you see me!</Text>
					<Text style={styles.text}>Now you see me!</Text>
				</View>
			</BottomSheet>
		</View>
	);
};
