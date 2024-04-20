import {ItemContainerStyle} from "../../components/containers/PrimaryContainer/style";
import {ScrollItemContainerStyle} from "../../components/containers/PrimaryScrollContainer/style";
import Album from "../../components/buttons/Album";
import {AddAlbum} from "../../components/buttons/AddAlbum";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {ListRenderItemInfo} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/navigation.types";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {getAlbums} from "../../store/slices/albumSlice";

type GalleryScreenRouteProp = RouteProp<RootStackParamList, 'GalleryHome'>;
type GalleryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GalleryHome'>;

export type GalleryScreenProps = {
  route: GalleryScreenRouteProp;
  navigation: GalleryScreenNavigationProp;
};

export interface DataItem {
  "id": number,
  "name": string,
  "created_at": string,
  "shared_to": [],
  "owner": {
    "email": string,
  }
}

export default function GalleryScreen({route, navigation}: GalleryScreenProps) {
  const dispatch = useDispatch();
  const selectedAlbum = useSelector((state: any) => state.album.selectedAlbum);
  const [isAlbumSelected, setIsAlbumSelected] = useState<boolean>(false);
  const data = useSelector((state: any) => state.album.albumList);
  const userId = useSelector((state: any) => state.auth.userId);
  const error = useSelector((state: any) => state.auth.error);
  const loading = useSelector((state: any) => state.auth.loading);
  console.log('user id : ' + userId);
  console.log('error : ' + error);
  console.log('loading : ' + loading);

  useEffect(() => {
    if (!loading) {
      // @ts-ignore
      dispatch(getAlbums(userId));
    }
  }, [dispatch, loading]);

  useEffect(() => {
    setIsAlbumSelected(selectedAlbum.length !== 0);
  }, [selectedAlbum]);

  const renderItem: any = useCallback(({item}: ListRenderItemInfo<DataItem>) => (
    <Album
      key={item.id}
      id={item.id}
      name={item.name}
      onPress={() => navigation.navigate('Album', {album: item})}
      image={require("../../../assets/images/album_icon.png")}
    />
  ), []);

  return (
      <ItemContainerStyle>
        <ScrollItemContainerStyle
            data={data}
            renderItem={renderItem}
            keyExtractor={renderItem.id}
            numColumns={2}
        />
        <AddAlbum isAlbumSelected={isAlbumSelected}/>
      </ItemContainerStyle>
  );
}
