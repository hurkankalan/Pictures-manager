import {DataItem} from "../screens/Gallery/GalleryScreen";
import {PhotoResponse} from "../api/photo.api";

// Define which params the screen can get in route.params
// ScreenName: {route.params}
export type RootStackParamList = {
  GalleryHome: undefined;
  Album: { album: DataItem };
  Photo: { photo: PhotoResponse };
  Search: { search: string, includeShared: boolean, album: DataItem };
};