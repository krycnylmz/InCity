import React from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const PhotoPreview = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoUri, location } = route.params; // Assuming location is passed from the previous screen

  const savePhoto = async () => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: photoUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
      // formData.append('latitude', location.latitude);
      // formData.append('longitude', location.longitude);

      const response = await axios.post('https://incity.pythonanywhere.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.status === 200) {
        console.log(`panda responseeeeeeeee`);
        console.log(response);
        Alert.alert('Success', 'Photo saved successfully!');
        // navigation.navigate('Home'); // Navigate to the Home screen or any other screen
      } else {
        Alert.alert('Error', 'Failed to save the photo');
      }
    } catch (error) {
      console.error('Error saving photo:', error);
      Alert.alert('Error', 'An error occurred while saving the photo');
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Image source={{ uri: photoUri }} style={{ width: '100%', height: '80%' }} />
      <View className="flex-row mt-4">
        <Button title="Retake" onPress={() => navigation.goBack()} />
        <Button title="Save" onPress={savePhoto} />
      </View>
    </View>
  );
};

export default PhotoPreview;
