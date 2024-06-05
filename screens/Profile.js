import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Pressable,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = () => {

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken"); // Token'ı sil
      await AsyncStorage.removeItem("isSetInterests"); // Token'ı sil
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      }); // Welcome ekranına yönlendir
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView className=" flex flex-1 p-4 ">
      <View className="p-4 flex flex-col gap-2">
        <View className="flex flex-col bg-slate-200 rounded-md p-2 py-4">
          <Text>Profile</Text>
        </View>
        <View className="flex flex-col bg-slate-200 rounded-md p-2 py-4">
        <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
