import { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraContainerStyle } from "../components/containers/PrimaryContainer/style";
import * as ImagePicker from "expo-image-picker";
import { ViewStyle } from "../components/modals/AddAlbum/style";

export default function App() {
  const [imageUri, setImageUri] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [ratio, setRatio] = useState<[number, number]>([4, 3]);
  const [flashMode, setFlashMode] = useState<"off" | "on">("off");

  const openImagePicker = async (useCamera: boolean) => {
    let result;

    if (useCamera) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: ratio,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: ratio,
        quality: 1,
      });
    }

    if (!result.canceled && "uri" in result) {
      setImageUri(result.uri as string);
    }
  };

  function changeRatio() {
    setRatio(ratio[0] === 4 ? [16, 9] : [4, 3]);
  }

  function toggleFlashMode() {
    setFlashMode(flashMode === "off" ? "on" : "off");
  }

  return (
    <CameraContainerStyle>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ViewStyle>
          <Button
            title="Take a Picture"
            onPress={() => openImagePicker(true)}
          />
          <Button
            title="Choose from Gallery"
            onPress={() => openImagePicker(false)}
          />
          <Button title="Change Ratio" onPress={changeRatio} />
          <Button title="Toggle Flash" onPress={toggleFlashMode} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </ViewStyle>
      </Modal>
    </CameraContainerStyle>
  );
}
