import React from 'react';
import { DataItem } from './GalleryScreen';
import Album from "../components/buttons/Album";

export default function PhotoGalleryScreen(items: any) {
    const data: DataItem[] = [
        { id: 1, name: "Photo 1" },
        { id: 2, name: "Photo 2" },
        { id: 3, name: "Photo 3" },
    ];

    const renderItem: any = ({ item }: { item: DataItem }) => (
        <Album
            id={item.id}
            name={item.name}
            onPress={() => console.log("test")}
            image={require("../../assets/images/album_icon.png")}
        />
    );
}