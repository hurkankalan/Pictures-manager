import React from "react";
import {AddAlbumContainerStyle, AddAlbumImageStyle} from "./style";

interface AddAlbumProps {
    onPress: () => void;
}

export const AddAlbum: React.FC<AddAlbumProps> = ({ onPress }: AddAlbumProps) => {
    return (
        <AddAlbumContainerStyle onPress={onPress}>
            <AddAlbumImageStyle source={require('../../../../assets/images/add.png')} />
        </AddAlbumContainerStyle>
    );
}