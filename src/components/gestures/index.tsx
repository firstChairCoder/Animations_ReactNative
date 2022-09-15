import React from "react";
import {
	FlatList,
	Text,
	LayoutAnimation,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import SwipeRow from "./SwipeRow";
import { getGradientRGB } from "../../utils";

const initialData = [...Array(10)].fill(0).map((data, index) => ({
	text: `Row ${index + 1}`,
	key: `key-${index}`,
	backgroundColor: getGradientRGB(index, 10),
}));

class SwipeGesture extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: initialData };
	}

	deleteItem = (item) => {
		const updatedData = this.state.data.filter(
			(dataItem) => dataItem !== item
		);

		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		this.setState({ data: updatedData });
	};

	renderItem = ({ item, index }) => (
		<SwipeRow
			key={item.key}
			item={item}
			swipeThreshold={-150}
			onSwipe={this.deleteItem}
		>
			<Text
				style={[styles.text, { backgroundColor: item.backgroundColor }]}
			>
				Row {index + 1}
			</Text>
		</SwipeRow>
	);

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<FlatList data={this.state.data} renderItem={this.renderItem} />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		fontWeight: "bold",
		color: "white",
		fontSize: 26,
		flex: 1,
		textAlign: "center",
		padding: 25,
	},
});

export default SwipeGesture;
