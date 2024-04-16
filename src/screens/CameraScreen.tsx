import { useEffect, useState, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { createPhoto } from "../api/photo.api";
import {
  Entypo,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export function CameraScreen() {
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const [ratio, setRatio] = useState("16:9");
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlash] = useState<FlashMode>();
  const [camType, setCamType] = useState<CameraType>();

  useEffect(() => {
    if (imageUri) {
      createPhoto(imageUri, ["label"]).then(() => alert("Successfully saved"));
    }
  }, [imageUri]);

  function uploadImage() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    }).then((result) => {
      if (!result.canceled && "uri" in result) {
        setImageUri(result.uri as any);
      }
    });
  }

  async function takePicture() {
    if (cameraRef.current) {
      const pictureMetadata = await cameraRef.current.takePictureAsync();

      setImageUri(pictureMetadata.uri);
    } else {
      alert("Fail to take photo");
    }
  }

  function changeRatio() {
    setRatio(ratio === "16:9" ? "4:3" : "16:9");
  }

  function zoomIn() {
    setZoom(1);
  }

  function zoomOut() {
    setZoom(0);
  }

  function toggleFlashMode() {
    setFlash(flashMode === "off" || !flashMode ? "on" : ("off" as any));
  }

  function toggleCameraType() {
    setCamType(camType === "back" || !camType ? "front" : ("back" as any));
  }

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
          }}
        >
          Requesting permission
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
          }}
        >
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <>
      <StatusBar hidden={true} />

      <Camera
        style={styles.camera}
        ref={cameraRef}
        ratio={ratio}
        zoom={zoom}
        flashMode={flashMode}
        type={camType}
      >
        <Entypo
          name="circle"
          size={70}
          color="white"
          onPress={takePicture}
          style={styles.takePicture}
        />

        <MaterialCommunityIcons
          name="aspect-ratio"
          size={45}
          color="white"
          onPress={changeRatio}
          style={styles.ratio}
        />

        <Ionicons
          name={flashMode === "on" ? "flash-outline" : "flash-off-outline"}
          size={50}
          color="white"
          onPress={toggleFlashMode}
          style={styles.flash}
        />

        <Fontisto
          name="zoom-plus"
          size={25}
          color="white"
          onPress={zoomIn}
          style={styles.zoomIn}
        />

        <MaterialIcons
          name="zoom-out"
          size={32}
          color="white"
          onPress={zoomOut}
          style={styles.zoomOut}
        />

        <Ionicons
          name="camera-reverse-outline"
          size={50}
          color="white"
          onPress={toggleCameraType}
          style={styles.cameraType}
        />

        <Octicons
          name="file-directory"
          size={40}
          color="white"
          style={styles.file}
          onPress={uploadImage}
        />
      </Camera>
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    display: "flex",
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },

  flash: {
    position: "absolute",
    top: 35,
    left: 25,
  },

  zoomIn: {
    position: "absolute",
    bottom: 35,
    left: "28%",
  },

  zoomOut: {
    position: "absolute",
    bottom: 33,
    left: "66%",
  },

  ratio: {
    position: "absolute",
    top: 90,
    right: 27,
  },

  cameraType: {
    position: "absolute",
    top: 25,
    right: 25,
  },

  takePicture: {
    position: "absolute",
    bottom: 15,
    left: "42%",
  },

  file: {
    position: "absolute",
    top: 160,
    right: 30,
  },
});
