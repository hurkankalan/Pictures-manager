import { ItemContainerStyle } from "../components/containers/PrimaryContainer/style";
import { ScrollItemContainerStyle } from "../components/containers/PrimaryScrollContainer/style";
import Album from "../components/buttons/Album";
import { AddAlbum } from "../components/buttons/AddAlbum";

interface DataItem {
  id: number;
  title: string;
}

/**
 * @todo replace with real data
 */
const data: DataItem[] = [
  { id: 1, title: "Élément 1" },
  { id: 2, title: "Élément 2" },
  { id: 3, title: "Élément 3" },
];

const renderItem: any = ({ item }: { item: DataItem }) => (
  <Album
    title={item.title}
    onPress={() => console.log("test")}
    image={require("../../assets/images/album_icon.png")}
  />
);

export default function GalleryScreen(items: any) {
  return (
    <ItemContainerStyle>
      <ScrollItemContainerStyle
        data={data}
        renderItem={renderItem}
        keyExtractor={items.id}
        numColumns={2}
      />
      <AddAlbum onPress={() => console.log("test")} />
    </ItemContainerStyle>
  );
}
