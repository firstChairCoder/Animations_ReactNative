import React from "react";
import { StyleSheet, View } from "react-native";

import BounceButton from "./BounceButton";
import SubmitButton from "./SubmitButton";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

const Buttons = () => {
	return (
		<View style={styles.container}>
			<BounceButton />
			<SubmitButton />
		</View>
	);
};

export default Buttons;
