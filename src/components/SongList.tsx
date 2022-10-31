import React from "react";
import { FlatList } from "react-native";
import ListHeader from "./ListHeader";
import SongItem from "./SongItem";

import { ISongs, MUSIC } from "../screens/Player";

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
