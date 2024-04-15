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
} from "@expo/vector-icons";

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

  function changeZoom() {
    setZoom(zoom === 0 ? 0.5 : 0);
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
      <StatusBar hidden={true} />
      <Camera
        style={styles.camera}
        ref={cameraRef}
        ratio={ratio}
        zoom={zoom}
        flashMode={flashMode}
        type={camType}
      />
      <Entypo
        name="Take a picture"
        size={24}
        color="black"
        onPress={takePicture}
      />
      <MaterialCommunityIcons
        name="ratio"
        size={24}
        color="black"
        onPress={changeRatio}
      />
      <Ionicons
        name="flash-outline"
        size={24}
        color="black"
        onPress={toggleFlashMode}
      />
      <Fontisto name="zoom" size={24} color="black" onPress={changeZoom} />
      <Ionicons
        name="camera-reverse-outline"
        size={24}
        color="black"
        onPress={toggleCameraType}
      />
    </>
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
  flash: {},
  zoom: {},
  ratio: {},
  cameraType: {},
  takePicture: {},
});
