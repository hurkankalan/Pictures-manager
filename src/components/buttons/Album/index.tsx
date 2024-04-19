import React, {MutableRefObject} from 'react';
import { AlbumContainerStyle, AlbumImageStyle, AlbumTitleStyle } from './style';
import {ImageSourcePropType} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {removeSelectAlbum, setSelectAlbum} from "../../../store/slices/albumSlice";

interface AlbumProps {
    id: number;
    name: string;
    onPress: () => void;
    image: ImageSourcePropType;
    touchedAnAlbum: MutableRefObject<boolean>;
}

const Album: React.FC<AlbumProps> = ({ name, onPress, image, id, touchedAnAlbum}: AlbumProps) => {
    const dispatch = useDispatch();
    const selectedAlbum = useSelector((state: any) => state.album.selectedAlbum);

    const handleLongPress = (albumId: number) => {
      touchedAnAlbum.current = true;
        if (selectedAlbum.includes(albumId)) {
            dispatch(removeSelectAlbum(albumId));
        } else {
            dispatch(setSelectAlbum(albumId));
        }
    };

    return (
        <AlbumContainerStyle
            onLongPress={() => handleLongPress(id)}
            onPress={onPress}
            selected={selectedAlbum.includes(id)}
        >
            <AlbumImageStyle source={image} />
            <AlbumTitleStyle>{name}</AlbumTitleStyle>
        </AlbumContainerStyle>
    );
}

export default Album;