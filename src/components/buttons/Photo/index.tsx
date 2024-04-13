import React, {useState, useEffect} from 'react';
import {
  PhotoContainerStyle,
  PhotoImageStyle,
  PhotoStatusStyle
} from './style';
import {getPhotoFile, PhotoResponse} from "../../../api/photo.api";

interface PhotoProps {
  photo: PhotoResponse;
  onPress: () => void;
}

export default function Photo({photo, onPress}: PhotoProps) {
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [selected, setSelected] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleLongPress = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    getPhotoFile(photo.id, photo.name)
      .then(downloaded => {
        const ok = downloaded.status === 200
        setError(!ok)
        ok && setImageUri(downloaded.uri)
      })
      .catch(error => alert(error.message))
  }, [photo]);

  return (
    <PhotoContainerStyle
      onLongPress={handleLongPress}
      onPress={onPress}
      selected={selected}
    >
      {imageUri
        ? <PhotoImageStyle source={{uri: imageUri}}/>
        : <PhotoStatusStyle>{error ? 'Not found' : 'Loading...'}</PhotoStatusStyle>
      }
    </PhotoContainerStyle>
  );
}