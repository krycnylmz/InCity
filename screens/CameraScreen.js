import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (!permission) {
        await requestPermission();
      }
    })();
  }, [permission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(`panda ${photo.uri}`);
      navigation.navigate('PhotoPreview', { photoUri: photo.uri });
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} className="bg-blue-500 p-4 rounded-full">
          <Text className="text-white font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        ref={cameraRef}
      >
        <View className="flex-1 flex-row justify-center mt-4">
          <TouchableOpacity onPress={takePicture} className="bg-green-500 p-4 rounded-full">
            <Text className="text-white font-bold">Snap</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default CameraScreen;
