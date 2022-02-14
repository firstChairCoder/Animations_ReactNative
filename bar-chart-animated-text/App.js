import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Animation1,
  Animation2,
  Animation3,
  Animation4,
  Animation5,
} from "./src/screens";
import Button from "./src/components/Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "wheat",
  },
});

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("Peeps")}
        color={"#F00"}
        text={"Animation 1"}
      />
      <Button
        onPress={() => navigation.navigate("StarWars")}
        color={"#FFA500"}
        text={"Animation 2"}
      />
      <Button
        onPress={() => navigation.navigate("CustomCell")}
        color={"#FF0"}
        text={"Animation 3"}
      />
      <Button
        onPress={() => navigation.navigate("SvgProgress")}
        color={"#080"}
        text={"Animation 4"}
      />
      <Button
        onPress={() => navigation.navigate("Unknown")}
        color={"#00F"}
        text={"Animation 5"}
      />
      {/*  <Button
          onPress={() => navigation.navigate("Ticker")}
          color={"#4B0082"}
          text={"Animation 6"}
        />
        <Button
          onPress={() => navigation.navigate("Flags")}
          color={"#EE82EE"}
          text={"Animation 7"}
        />
        <Button
          onPress={() => navigation.navigate("Behance")}
          color={"mistyrose"}
          text={"Animation 8"}
        />
        <Button
          onPress={() => navigation.navigate("Checklist")}
          color={"cadetblue"}
          text={"Animation 9"}
        />
        <Button
          onPress={() => navigation.navigate("C")}
          color={"salmon"}
          text={"Animation 10"}
        /> */}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: "",
          headerTransparent: true,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name={"Home"} component={HomeScreen} />
        <Stack.Screen name={"Peeps"} component={Animation1} />
        <Stack.Screen name={"StarWars"} component={Animation2} />
        <Stack.Screen name={"CustomCell"} component={Animation3} />
        <Stack.Screen name={"SvgProgress"} component={Animation4} />
        <Stack.Screen name={"Unknown"} component={Animation5} />
        {/*  <Stack.Screen name={"Ticker"} component={Animation6} />
          <Stack.Screen name={"Flags"} component={Animation7} />
          <Stack.Screen name={"Behance"} component={Animation8} />
          <Stack.Screen name={"Checklist"} component={Animation9} />
          <Stack.Screen name={"C"} component={Animation10} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>Carpe Diem</Text>
    // </View>
  );
}

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/stack";
// import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// import {
//   Animation1,
//   Animation2,
//   Animation3,
//   Animation4,
//   Animation5,
//   Animation6,
//   Animation7,
//   Animation8,
//   Animation9,
//   Animation10,
// } from "./src/screens";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "wheat",
//   },
//row: {
//           flexDirection: "row",
//           alignItems: "center",
//           marginVertical: 7,
//         },
// text: {
//             fontSize: 32,
//             fontWeight: "300",
//             fontStyle: "italic",
//             textAlign: "center",
//           }
// });

// const Stack = createNativeStackNavigator();

// const Button = ({ onPress, color, text }) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View
//         style={styles.row}
//       >
//         <Icon
//           name={"hand-pointing-right"}
//           color={color}
//           size={32}
//           style={{ marginRight: 30 }}
//         />
//         <Text
//           style={styles.text}
//         >
//           {text}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// function HomeScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Button
//         onPress={() => navigation.navigate("Peeps")}
//         color={"#F00"}
//         text={"Animation 1"}
//       />
//       <Button
//         onPress={() => navigation.navigate("StarWars")}
//         color={"#FFA500"}
//         text={"Animation 2"}
//       />
//       <Button
//         onPress={() => navigation.navigate("CustomCell")}
//         color={"#FF0"}
//         text={"Animation 3"}
//       />
//       <Button
//         onPress={() => navigation.navigate("Angular")}
//         color={"#080"}
//         text={"Animation 4"}
//       />
//       <Button
//         onPress={() => navigation.navigate("SvgProgress")}
//         color={"#00F"}
//         text={"Animation 5"}
//       />
//       <Button
//         onPress={() => navigation.navigate("Ticker")}
//         color={"#4B0082"}
//         text={"Animation 6"}
//       />
//       <Button
//         onPress={() => navigation.navigate("Flags")}
//         color={"#EE82EE"}
//         text={"Animation 7"}
//       />
//       <Button
//         onPress={() => navigation.navigate("Behance")}
//         color={"mistyrose"}
//         text={"Animation 8"}
//       />
//       <Button
//         onPress={() => navigation.navigate("Checklist")}
//         color={"cadetblue"}
//         text={"Animation 9"}
//       />
//       <Button
//         onPress={() => navigation.navigate("C")}
//         color={"salmon"}
//         text={"Animation 10"}
//       />
//     </View>
//   );
// }

// export default function App({ navigation }) {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerTitle: "",
//           headerTransparent: true,
//           headerBackTitleVisible: false,
//         }}
//       >
//         <Stack.Screen name={"Home"} component={HomeScreen} />
//         <Stack.Screen name={"Peeps"} component={Animation1} />
//         <Stack.Screen name={"StarWars"} component={Animation2} />
//         <Stack.Screen name={"CustomCell"} component={Animation3} />
//         <Stack.Screen name={"Angular"} component={Animation4} />
//         <Stack.Screen name={"SvgProgress"} component={Animation5} />
//         <Stack.Screen name={"Ticker"} component={Animation6} />
//         <Stack.Screen name={"Flags"} component={Animation7} />
//         <Stack.Screen name={"Behance"} component={Animation8} />
//         <Stack.Screen name={"Checklist"} component={Animation9} />
//         <Stack.Screen name={"C"} component={Animation10} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
