import React, {useState, useEffect} from 'react';
import {
    PhotoContainerStyle,
    PhotoImageStyle,
    PhotoTitleStyle
} from './style';
import {ImageSourcePropType, Text} from "react-native";
import {getPhotoFile, PhotoResponse} from "../../../api/photo.api";

interface PhotoProps {
    photo: PhotoResponse;
    onPress: () => void;
}

const Photo: React.FC<PhotoProps> = ({photo, onPress}: PhotoProps) => {
    // const [image, setImage] = useState<ImageSourcePropType | undefined>();
    const [image, setImage] = useState<string | undefined>();
    const [selected, setSelected] = useState<boolean>(false);

    const handleLongPress = () => {
        setSelected(!selected);
    };

    useEffect(() => {
        getPhotoFile(photo.id, photo.name)
            .then(imageUrl => {
                //  setImage(require(imageUrl.uri))
                setImage(imageUrl.uri)
            })
            .catch(error => alert(error.message))
    }, [photo]);

    return (
        <PhotoContainerStyle
            onLongPress={handleLongPress}
            onPress={onPress}
            selected={selected}
        >
            {image
                // ? <PhotoImageStyle source={image}/>
                ? <Text>{image}</Text>
                : <Text>Loading...</Text>
            }
            <PhotoTitleStyle>{photo.name}</PhotoTitleStyle>
        </PhotoContainerStyle>
    );
}

export default Photo;
