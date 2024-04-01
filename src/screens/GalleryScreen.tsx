import { ItemContainerStyle } from "../components/containers/PrimaryContainer/style";
import { ScrollItemContainerStyle } from "../components/containers/PrimaryScrollContainer/style";
import Album from "../components/buttons/Album";
import { AddAlbum } from "../components/buttons/AddAlbum";
import AddAlbumModal from "../components/modals/AddAlbum";
import { useState } from "react";

interface DataItem {
  id: number;
  title: string;
}

/**
 * @todo replace with real data
 */
const data: DataItem[] = [
  { id: 1, title: "Élément 1" },
  { id: 2, title: "Élément 2" },
  { id: 3, title: "Élément 3" },
];

const renderItem: any = ({ item }: { item: DataItem }) => (
  <Album
    title={item.title}
    onPress={() => console.log("test")}
    image={require("../../assets/images/album_icon.png")}
  />
);

export default function GalleryScreen(items: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const displayAddAlbumModal = () => {
    console.log(modalVisible);

    setModalVisible(true);

    console.log(modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ItemContainerStyle>
      <ScrollItemContainerStyle
        data={data}
        renderItem={renderItem}
        keyExtractor={items.id}
        numColumns={2}
      />
      <AddAlbum onPress={() => displayAddAlbumModal()} />
      {modalVisible && (
        <AddAlbumModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </ItemContainerStyle>
  );
}
