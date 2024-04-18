import React from "react";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/navigation.types";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import Photo from "../../components/buttons/Photo";

type PhotoScreenRouteProp = RouteProp<RootStackParamList, 'Photo'>;
type PhotoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Photo'>;

export type PhotoScreenProps = {
  route: PhotoScreenRouteProp;
  navigation: PhotoScreenNavigationProp;
};

export default function PhotoScreen({route, navigation}: PhotoScreenProps) {
  const {photo} = route.params;

  return (
    <Photo photo={photo} onPress={() => {}}/>
  );
}

