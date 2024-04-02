import {ItemContainerStyle} from "../components/containers/PrimaryContainer/style";
import {ScrollItemContainerStyle} from "../components/containers/PrimaryScrollContainer/style";
import {listPhotosByAlbumId, PhotoResponse} from "../api/photo.api";
import Photo from "../components/buttons/Photo";
import {useState, useEffect} from "react";

const renderItem: any = ({photo}: { photo: PhotoResponse }) => (
    <Photo
        photo={photo}
        onPress={() => console.log(`Photo ${photo.id} clicked.`)}
    />
);

export default function PhotosScreen(albumId: number) {
    const [photos, setPhotos] = useState<PhotoResponse[]>([]);

    useEffect(() => {
        listPhotosByAlbumId(albumId)
            .then(json => setPhotos(json.photos));
    }, []);

    return (
        <ItemContainerStyle>
            <ScrollItemContainerStyle
                data={photos}
                renderItem={renderItem}
                //keyExtractor={items.id}
                numColumns={2}
            />
        </ItemContainerStyle>
    );
}

