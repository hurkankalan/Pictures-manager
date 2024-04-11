import {ItemContainerStyle} from "../components/containers/PrimaryContainer/style";
import {ScrollItemContainerStyle} from "../components/containers/PrimaryScrollContainer/style";
import Album from "../components/buttons/Album";
import {AddAlbum} from "../components/buttons/AddAlbum";
import {useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import AddAlbumModal from "../components/modals/AddAlbum";
import AlbumScreen from "./AlbumScreen";
import PhotoScreen from "./PhotoScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export interface DataItem {
    id: number;
    name: string;
}

const Gallery = createNativeStackNavigator();

export default function GalleryScreen({navigation}: any) {
    const selectedAlbum = useSelector((state: any) => state.album.selectedAlbum);
    const [isAlbumSelected, setIsAlbumSelected] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [albums, setAlbums] = useState<DataItem[]>([
        {id: 1, name: "Élément 1"},
        {id: 2, name: "Élément 2"},
        {id: 3, name: "Élément 3"},
    ]);

    useEffect(() => {
        if (selectedAlbum.length === 0) {
            setIsAlbumSelected(false);
        } else {
            setIsAlbumSelected(true);
        }
    }, [selectedAlbum]);

    const renderItem: any = useCallback(({album}: { album: DataItem }) => (
        <Album
            key={album.id}
            id={album.id}
            name={album.name}
            onPress={() => navigation.navigate('Album', {albumId: album.id})}
            image={require("../../assets/images/album_icon.png")}
        />
    ), []);

    const displayAddAlbumModal = () => {
        setModalVisible(true);
    }

    return (
        <>


            <ItemContainerStyle>
                <ScrollItemContainerStyle
                    data={albums}
                    renderItem={renderItem}
                    numColumns={2}
                />
                <AddAlbum onPress={() => displayAddAlbumModal()} isAlbumSelected={isAlbumSelected}/>
                {
                    modalVisible && (
                        <AddAlbumModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                    )
                }
            </ItemContainerStyle>
            <Gallery.Navigator>
                <Gallery.Screen name={"Album"} component={AlbumScreen} initialParams={{albumId: 1}}/>
                <Gallery.Screen name={"Photo"} component={PhotoScreen}/>
            </Gallery.Navigator>
        </>
    );
}
