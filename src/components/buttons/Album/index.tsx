import React, { useState } from 'react';
import { AlbumContainerStyle, AlbumImageStyle, AlbumTitleStyle } from './style';
import {ImageSourcePropType} from "react-native";

interface AlbumProps {
    title: string;
    onPress: () => void;
    image: ImageSourcePropType;
}

const Album: React.FC<AlbumProps> = ({ title, onPress, image }: AlbumProps) => {
    const [selected, setSelected] = useState<boolean>(false);

    const handleLongPress = () => {
        setSelected(!selected);
    };

    return (
        <AlbumContainerStyle
            onLongPress={handleLongPress}
            onPress={onPress}
            selected={selected}
        >
            <AlbumImageStyle source={image} />
            <AlbumTitleStyle>{title}</AlbumTitleStyle>
        </AlbumContainerStyle>
    );
}

export default Album;