import React, {useCallback, useEffect, useState} from 'react';
import {listPhotosByAlbumId, PhotoResponse} from "../../api/photo.api";
import Photo from "../../components/buttons/Photo";
import {ItemContainerStyle} from "../../components/containers/PrimaryContainer/style";
import {ScrollItemContainerStyle} from "../../components/containers/PrimaryScrollContainer/style";
import {ListRenderItemInfo} from "react-native";
import {RootStackParamList} from "../../navigation/navigation.types";
import {RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type AlbumScreenRouteProp = RouteProp<RootStackParamList, 'Album'>;
type AlbumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Album'>;

export type AlbumScreenProps = {
  route: AlbumScreenRouteProp;
  navigation: AlbumScreenNavigationProp;
};

export default function AlbumScreen({route, navigation}: AlbumScreenProps) {
  const {album} = route.params;
  const [photos, setPhotos] = useState<PhotoResponse[]>([])

  useEffect(() => {
    if (!isNaN(album?.id)) {
      listPhotosByAlbumId(album.id)
        .then(listing => setPhotos(listing.photos));
    }
  }, [album]);

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