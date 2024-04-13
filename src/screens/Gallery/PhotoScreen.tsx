import React from "react";
import {Text} from "react-native";

export default function PhotoScreen({route}:any) {
    const {photo} = route.params;

    return (
        <Text>Visualiser les détails et/ou modifier la photo {photo.id}</Text>
    );
}

