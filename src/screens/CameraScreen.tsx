import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {FormInputStyle} from "../components/inputs/PrimaryInput/style";
import {CameraContainerStyle} from "../components/containers/PrimaryContainer/style";

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (permission?.status === 'undetermined') {
    return (
      <CameraContainerStyle>
        <Text>Requesting camera permission</Text>
        <Button title="Request permission" onPress={() => requestPermission()} />
      </CameraContainerStyle>
    );
  }

    if (permission?.status !== 'granted') {
        return (
          <CameraContainerStyle>
              <Text>Camera permission not granted</Text>
          </CameraContainerStyle>
        );
    }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
      <CameraContainerStyle>
        <Camera style={{ flex: 1 }} type={type}>
          <CameraContainerStyle>
            <TouchableOpacity onPress={toggleCameraType}>
              <FormInputStyle>Flip Camera</FormInputStyle>
            </TouchableOpacity>
          </CameraContainerStyle>
        </Camera>
      </CameraContainerStyle>
  );
}