import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PhotoScreen from "./PhotoScreen";
import AlbumScreen from "./AlbumScreen";
import GalleryScreen from "./GalleryScreen";


const Gallery = createNativeStackNavigator();

export default function GalleryNavigator() {
  return (
    <Gallery.Navigator>
      <Gallery.Screen name={"Gallery"} component={GalleryScreen}/>
      <Gallery.Screen name={"Album"} component={AlbumScreen}/>
      <Gallery.Screen name={"Photo"} component={PhotoScreen}/>
    </Gallery.Navigator>
  );
}
