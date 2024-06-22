import React, { useCallback, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import { TaskInterface, ListItem } from "../components/Swiper";

const titles = [
	"Record the dismissible tutorial 🎥",
	"Leave 👍🏼 to the video",
	"Check YouTube comments",
	"Subscribe to the channel 🚀",
	"Leave a ⭐️ on the GitHub Repo",
];
const BG_COLOR = "linen";
const TASKS: TaskInterface[] = titles.map((title, index) => ({ title, index }));

// const TASKS = [
//   {
//     index: 0,
//     title: 'Record the dismissible tutorial 🎥',
//   },
//   { ... }, { ... }, { ... }
// ];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: BG_COLOR,
		padding: 20,
	},
	title: {
		fontSize: 60,
		fontWeight: "bold",
		marginVertical: 20,
		paddingLeft: "5%",
	},
});

export const SwipeDeleteScreen = () => {
	const [tasks, setTasks] = useState(TASKS);

	const onDismiss = useCallback((task: TaskInterface) => {
		setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
	}, []);

	const scrollRef = useRef(null);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tasks</Text>
			<ScrollView ref={scrollRef} style={{ flex: 1 }}>
				{tasks.map((task) => (
					<ListItem
						simultaneousHandlers={scrollRef}
						key={task.index}
						task={task}
						onDismiss={onDismiss}
					/>
				))}
			</ScrollView>
		</View>
	);
};