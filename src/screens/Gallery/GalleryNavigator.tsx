import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PhotoScreen, {PhotoScreenProps} from "./PhotoScreen";
import AlbumScreen, {AlbumScreenProps} from "./AlbumScreen";
import GalleryScreen from "./GalleryScreen";
import {RootStackParamList} from "../../navigation/navigation.types";

const Gallery = createNativeStackNavigator<RootStackParamList>();

export default function GalleryNavigator() {
  return (
    <Gallery.Navigator>
      <Gallery.Screen name={"GalleryHome"} component={GalleryScreen} options={{
        title: 'Albums'
      }}/>
      <Gallery.Screen name={"Album"} component={AlbumScreen} options={({route}: AlbumScreenProps) => ({
        title: 'Album ' + route.params.album.id
      })}/>
      <Gallery.Screen name={"Photo"} component={PhotoScreen} options={({route}: PhotoScreenProps) => ({
        title: 'Photo ' + route.params.photo.id
      })}/>
    </Gallery.Navigator>
  );
}
