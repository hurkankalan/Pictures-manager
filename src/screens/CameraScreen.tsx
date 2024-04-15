import {useEffect, useState, useRef} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {Camera, FlashMode} from "expo-camera";
import {StatusBar} from "expo-status-bar";
import {createPhoto} from "../api/photo.api";

export function CameraScreen() {
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const [ratio, setRatio] = useState("16:9");
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlash] = useState<FlashMode>();

  useEffect(() => {
    if (imageUri) {
      createPhoto(imageUri, ['label'])
        .then(() => alert('Successfully saved'));
    }
  }, [imageUri]);

  function changeRatio() {
    setRatio(ratio === "16:9" ? "4:3" : "16:9");
  }

  function changeZoom() {
    setZoom(zoom === 0 ? 0.5 : 0);
  }

  function toggleFlashMode() {
    setFlash(flashMode === "off" || !flashMode ? "on" : ("off" as any));
  }

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: "center"}}>Requesting permission</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: "center"}}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission"/>
      </View>
    );
  }
  return (
    <>
      <StatusBar hidden={true}/>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        ratio={ratio}
        zoom={zoom}
        flashMode={flashMode}
      />
      <Button title="Change Ratio" onPress={changeRatio}/>
      <Button title="Change Zoom" onPress={changeZoom}/>
      <Button title="Toggle Flash" onPress={toggleFlashMode}/>
      <Button
        title="Take a picture"
        onPress={async () => {
          if (cameraRef.current) {
            const pictureMetadata = await cameraRef.current.takePictureAsync();
            setImageUri(pictureMetadata.uri);
          } else {
            alert('Fail to take photo');
          }
        }}
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
});