import { ItemContainerStyle } from "../components/containers/PrimaryContainer/style";
import { ScrollItemContainerStyle } from "../components/containers/PrimaryScrollContainer/style";
import Album from "../components/buttons/Album";
import { AddAlbum } from "../components/buttons/AddAlbum";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import AddAlbumModal from "../components/modals/AddAlbum";
import { useFocusEffect } from "@react-navigation/native";
import { Image, FlatList, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

export interface DataItem {
  id: number;
  name: string;
}

/**
 * @todo replace with real data
 */
const data: DataItem[] = [
  { id: 1, name: "Élément 1" },
  { id: 2, name: "Élément 2" },
  { id: 3, name: "Élément 3" },
];

export function ImagesScreen() {
  const [imagesURI, setImagesURI] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const images = await FileSystem.readDirectoryAsync(
          FileSystem.cacheDirectory + "ImageManipulator"
        );

        setImagesURI(images as any);
      })();
    }, [])
  );

  return imagesURI.length > 0 ? (
    <FlatList
      data={imagesURI}
      keyExtractor={(imageURI) => imageURI}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <Image
            style={styles.image}
            source={{
              uri:
                FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
            }}
          />
        );
      }}
    />
  ) : null;
}

export default function GalleryScreen(items: any) {
  const selectedAlbum = useSelector((state: any) => state.album.selectedAlbum);
  const [isAlbumSelected, setIsAlbumSelected] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedAlbum.length === 0) {
      setIsAlbumSelected(false);
    } else {
      setIsAlbumSelected(true);
    }
  }, [selectedAlbum]);

  const renderItem: any = ({ item }: { item: DataItem }) => (
    <Album
      id={item.id}
      name={item.name}
      onPress={() => console.log("test")}
      image={require("../../assets/images/album_icon.png")}
    />
  );

  const displayAddAlbumModal = () => {
    setModalVisible(true);
  };

  return (
    <ItemContainerStyle>
      <ScrollItemContainerStyle
        data={data}
        renderItem={renderItem}
        keyExtractor={items.id}
        numColumns={2}
      />
      <AddAlbum
        onPress={() => displayAddAlbumModal()}
        isAlbumSelected={isAlbumSelected}
      />
      {modalVisible && (
        <AddAlbumModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </ItemContainerStyle>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    height: 500,
  },
});
