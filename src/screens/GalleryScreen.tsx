import { ItemContainerStyle } from "../components/containers/PrimaryContainer/style";
import { ScrollItemContainerStyle } from "../components/containers/PrimaryScrollContainer/style";
import Album from "../components/buttons/Album";
import { AddAlbum } from "../components/buttons/AddAlbum";
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";

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

export default function GalleryScreen(items: any) {
    const selectedAlbum = useSelector((state: any) => state.album.selectedAlbum);
    const [isAlbumSelected, setIsAlbumSelected] = useState<boolean>(false);

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

    return (
        <ItemContainerStyle>
          <ScrollItemContainerStyle
            data={data}
            renderItem={renderItem}
            keyExtractor={items.id}
            numColumns={2}
          />
          <AddAlbum isAlbumSelected={isAlbumSelected}/>
        </ItemContainerStyle>
    );
}
