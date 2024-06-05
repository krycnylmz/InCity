import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground,Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/images/loginBackground.png")}
      className="flex-1 justify-center items-center"
    >
      <View className="w-full h-full justify-center items-center bg-opacity-50">
      <View className="w-full my-8 items-center justify-center">
          <Image
            source={require("../assets/images/logo.png")}
            className="px-1"
          />
        </View>
        <View className="w-full flex flex-row justify-center items-center mb-4">
          <TouchableOpacity
            className="bg-green-600 w-32 p-4 rounded-md mx-2"
            onPress={() => navigation.navigate('Login')}
          >
            <Text className="text-white text-center">LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-600 w-32 p-4 rounded-md mx-2"
            onPress={() => navigation.navigate('Register')}
          >
            <Text className="text-white text-center">REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
