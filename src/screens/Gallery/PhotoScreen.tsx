import React from "react";
import {Text} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../navigation/navigation.types";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type PhotoScreenRouteProp = RouteProp<RootStackParamList, 'Photo'>;
type PhotoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Photo'>;

export type PhotoScreenProps = {
  route: PhotoScreenRouteProp;
  navigation: PhotoScreenNavigationProp;
};

export default function PhotoScreen({route, navigation}: PhotoScreenProps) {
  const {photo} = route.params;

  return (
    <Text>Visualiser les détails et/ou modifier la photo {photo.id}</Text>
  );
}

