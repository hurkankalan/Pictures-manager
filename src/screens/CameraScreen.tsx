import { useState, useRef } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import { CameraContainerStyle } from "../components/containers/PrimaryContainer/style";
import * as ImagePicker from "expo-image-picker";
import { ViewStyle } from "../components/modals/AddAlbum/style";
import { Camera } from "expo-camera";

export function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [ratio, setRatio] = useState("16:9");

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Requesting permission</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  return (
    <>
      <Camera style={styles.camera} ref={cameraRef} ratio={ratio} />
      <Button
        title="Take a picture"
        onPress={async () => {
          if (cameraRef.current) {
            const pictureMetadata = await cameraRef.current.takePictureAsync();
            console.log("pictureMetadata", pictureMetadata);
          } else {
            console.log("Error while taking picture");
          }
        }}
      />
    </>
  );
}

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

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
