import { Ionicons } from "@expo/vector-icons";

//#B3B3B3
const SUBTEXT_COLORS = "#555";

export const menuData = () => {
  return [
    {
      id: "1",
      icon: <Ionicons name="map" size={24} color={SUBTEXT_COLORS} />,
      title: "Maps"
    },
    {
      id: "2",
      icon: <Ionicons name="images" size={24} color={SUBTEXT_COLORS} />,
      title: "Photo Album"
    },
    {
      id: "3",
      icon: <Ionicons name="camera" size={24} color={SUBTEXT_COLORS} />,
      title: "Camera"
    },
    {
      id: "4",
      icon: <Ionicons name="walk" size={24} color={SUBTEXT_COLORS} />,
      title: "Health & Fitness"
    },
    {
      id: "5",
      icon: <Ionicons name="film" size={24} color={SUBTEXT_COLORS} />,
      title: "Shows & Movies"
    },
    {
      id: "6",
      icon: <Ionicons name="book" size={24} color={SUBTEXT_COLORS} />,
      title: "Books"
    }
  ];
};
