import React, { useState } from 'react';
import { AlbumContainerStyle, AlbumImageStyle, AlbumTitleStyle } from './style';
import {ImageSourcePropType} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {removeSelectAlbum, setSelectAlbum} from "../../../store/slices/albumSlice";

interface AlbumProps {
    id: number;
    name: string;
    onPress: () => void;
    image: ImageSourcePropType;
}

const Album: React.FC<AlbumProps> = ({ name, onPress, image, id }: AlbumProps) => {
    const dispatch = useDispatch();
    const selectedAlbum = useSelector((state: any) => state.album.selectedAlbum);
    const [selected, setSelected] = useState<boolean>(false);

    const handleLongPress = (albumId: number) => {
        if (selectedAlbum.includes(albumId)) {
            dispatch(removeSelectAlbum(albumId));
        } else {
            dispatch(setSelectAlbum(albumId));
            console.log("test2");
        }
        setSelected(!selected);
    };

    return (
        <AlbumContainerStyle
            onLongPress={() => handleLongPress(id)}
            onPress={onPress}
            selected={selected}
        >
            <AlbumImageStyle source={image} />
            <AlbumTitleStyle>{name}</AlbumTitleStyle>
        </AlbumContainerStyle>
    );
}

export default Album;