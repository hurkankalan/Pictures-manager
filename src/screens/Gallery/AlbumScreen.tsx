import React, {useCallback, useEffect, useState} from 'react';
import {listPhotosByAlbumId, PhotoResponse} from "../../api/photo.api";
import Photo from "../../components/buttons/Photo";
import {ItemContainerStyle} from "../../components/containers/PrimaryContainer/style";
import {ScrollItemContainerStyle} from "../../components/containers/PrimaryScrollContainer/style";
import {ListRenderItemInfo} from "react-native";
import {RootStackParamList} from "../../navigation/navigation.types";
import {RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ImageOptions} from "../../components/buttons/ImageOptions";
import {useSelector} from "react-redux";

type AlbumScreenRouteProp = RouteProp<RootStackParamList, 'Album'>;
type AlbumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Album'>;

export type AlbumScreenProps = {
  route: AlbumScreenRouteProp;
  navigation: AlbumScreenNavigationProp;
};

export default function AlbumScreen({route, navigation}: AlbumScreenProps) {
  const {album} = route.params;
  const [photos, setPhotos] = useState<PhotoResponse[]>([])
  const [includeShared, setIncludeShared] = useState<boolean>(false);
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState<boolean>(true);
  const selectedPhoto = useSelector((state: any) => state.photo.selectedPhoto);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onSearchButtonPress: (e) => {
          navigation.navigate("Search", {search: e.nativeEvent.text?.trim(), includeShared, album});
        }
      }
    });
  }, [navigation, searchBar]);

  useEffect(() => {
    if (!isNaN(album?.id)) {
      console.log(album.id);
      listPhotosByAlbumId(album.id)
        .then(listing => setPhotos(listing.photos));
    }
  }, [album]);

  useEffect(() => {
    setIsPhotoSelected(!isPhotoSelected);
    console.log('selected photo : ' + selectedPhoto);
  }, [selectedPhoto]);

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
        contentInsetAdjustmentBehavior="automatic"
        data={photos}
        renderItem={renderItem}
        numColumns={2}
      />
      <ImageOptions isImageSelected={isPhotoSelected} />
    </ItemContainerStyle>
  );
}