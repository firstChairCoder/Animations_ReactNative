import type { FC, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20
  },
  iconWrapper: {
    borderRadius: 100,
    padding: 12
  },
  iconText: {
    fontSize: 22,
    fontWeight: "500"
  }
});

interface IconViewProps {
  icon: ReactNode;
  title: string;
}

const IconView: FC<IconViewProps> = ({ icon, title }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: "#000"
          }
        ]}
      >
        {icon}
      </View>
      <Text style={[styles.iconText, { color: "#555" }]}>{title}</Text>
    </View>
  );
};

export default IconView;
