import { FlatList } from "react-native";

import ListHeader from "./ListHeader";
import SongItem from "./SongItem";
import type { ISongs } from "../screens/Player";
// eslint-disable-next-line import/no-cycle
import { MUSIC } from "../screens/Player";

interface SongListProps {
  getSongDetails: (details: ISongs) => void;
}

const SongList: React.FC<SongListProps> = ({ getSongDetails }) => {
  return (
    <FlatList
      ListHeaderComponent={<ListHeader />}
      data={MUSIC}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <SongItem {...{ item, getSongDetails }} />}
    />
  );
};

export default SongList;
