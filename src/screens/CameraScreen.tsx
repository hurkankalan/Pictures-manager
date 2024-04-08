import { useState } from 'react';
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CameraContainerStyle} from "../components/containers/PrimaryContainer/style";
import * as ImagePicker from 'expo-image-picker';
import {ViewStyle} from "../components/modals/AddAlbum/style";
import {createPhoto} from "../api/photo.api";

export default function App() {
    const [imageUri, setImageUri] = useState<string | undefined>();
    const [modalVisible, setModalVisible] = useState(true);

    const openImagePicker = async (useCamera: boolean) => {
        let result;

        if (useCamera) {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }

        if (!result.canceled && 'uri' in result) {
            setImageUri(result.uri as string);
            await createPhoto(result.uri as string);
        }
    };

  return (
      <CameraContainerStyle>
          <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                  setModalVisible(!modalVisible);
              }}>
              <ViewStyle>
                  <Button title="Take a Picture" onPress={() => openImagePicker(true)}/>
                  <Button title="Choose from Gallery" onPress={() => openImagePicker(false)}/>
                  <Button title="Cancel" onPress={() => setModalVisible(false)}/>
              </ViewStyle>
          </Modal>
      </CameraContainerStyle>
  );
}