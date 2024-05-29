import { Image } from "react-native";

const IMAGES = {
  chat: require("../../assets/images/icons/Chat.png"),
  voice: require("../../assets/images/icons/voice.png"),
  navigation: require("../../assets/images/icons/navigation.png"),
  artist: require("../../assets/images/icons/artist.png"),
  next: require("../../assets/images/icons/next.png"),
  prev: require("../../assets/images/icons/prev.png"),
  pause: require("../../assets/images/icons/pause.png"),
  settings: require("../../assets/images/icons/settings.png"),
  logo: require("../../assets/images/icons/logo.png")
};

const Icon = ({ name, size = 24, style = {}, ...rest }) => {
  const [width, height] = [size, size];

  return (
    <Image source={IMAGES[name]} style={[{ width, height }, style]} {...rest} />
  );
};

export default Icon;
