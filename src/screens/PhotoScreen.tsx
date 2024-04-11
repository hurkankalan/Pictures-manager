import React from "react";
import {Text} from "react-native";

export default function PhotoDetailsScreen({route}:any) {
    const {photo} = route.params;

    return (
        <Text>Modifier la photo {photo.id}</Text>
    );
}

