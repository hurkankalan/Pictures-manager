import React, {useCallback, useEffect, useState} from 'react';
import {listPhotosByAlbumId, PhotoResponse} from "../../api/photo.api";
import Photo from "../../components/buttons/Photo";
import {ItemContainerStyle} from "../../components/containers/PrimaryContainer/style";
import {ScrollItemContainerStyle} from "../../components/containers/PrimaryScrollContainer/style";
import {ListRenderItemInfo} from "react-native";

export default function AlbumScreen({route, navigation}: any) {
    const {albumId} = route.params;
    const [photos, setPhotos] = useState<PhotoResponse[]>([])

    useEffect(() => {
        if (!isNaN(albumId)) {
            listPhotosByAlbumId(albumId)
                .then(listing => setPhotos(listing.photos));
        }
    }, [albumId]);

    const renderItem: any = useCallback(({item}: ListRenderItemInfo<PhotoResponse>) => (
        <Photo
            key={item.id}
            photo={item}
            onPress={() => navigation.navigate('Photo', {photo: item})}
        />
    ), []);

    return (
        <ItemContainerStyle>
            <ScrollItemContainerStyle
                data={photos}
                renderItem={renderItem}
                numColumns={2}
            />
        </ItemContainerStyle>
    );
}