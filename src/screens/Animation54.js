import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

// import { Header, SwipableItem, Card } from "../components/Set";
// import swipeData from "../mockdata/swipeData";

export const Animation54 = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
			{/* <View style={{ marginTop: 48, paddingHorizontal: 16, marginBottom: 24 }}>
				<Header />

				<FlatList
					data={swipeData}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<>
							<SwipableItem backgroundColor={item.avatarColor}>
								<Card {...item} />
							</SwipableItem>
						</>
					)}
					showsVerticalScrollIndicator={false}
					bounces={false}
				/>
			</View> */}
			<Text>Empty</Text>
		</SafeAreaView>
	);
};
