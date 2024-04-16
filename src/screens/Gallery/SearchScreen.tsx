import React, {useCallback, useEffect, useState} from 'react';
import {listPhotosByAlbumId, PhotoResponse} from "../../api/photo.api";
import Photo from "../../components/buttons/Photo";
import {ItemContainerStyle} from "../../components/containers/PrimaryContainer/style";
import {ScrollItemContainerStyle} from "../../components/containers/PrimaryScrollContainer/style";
import {ListRenderItemInfo} from "react-native";
import {RootStackParamList} from "../../navigation/navigation.types";
import {RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;
type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export type SearchScreenProps = {
  route: SearchScreenRouteProp;
  navigation: SearchScreenNavigationProp;
};

export default function SearchScreen({route, navigation}: SearchScreenProps) {
  const {album, search, includeShared} = route.params;
  const [photos, setPhotos] = useState<PhotoResponse[]>([])

  useEffect(() => {
    if (!isNaN(album?.id)) {
      listPhotosByAlbumId(album.id, search, includeShared)
        .then(listing => setPhotos(listing.photos));
    }
  }, [album, search, includeShared]);

  const renderItem: any = useCallback(({item}: ListRenderItemInfo<PhotoResponse>) => (
    <Photo
      key={item.id}
      photo={item}
      onPress={() => {
        navigation.navigate('Photo', {photo: item})
      }}
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