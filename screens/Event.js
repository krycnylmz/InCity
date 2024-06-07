import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";


// `route` props'unu function parametreleri arasına ekleyin.
const Event = ({ route }) => {
  // `route.params` kullanarak `event` parametresine erişin.
  const { event } = route.params;
  const navigation = useNavigation();
  const placeholderImage = require("../assets/images/ImagePlaceholder.png");

  return (
    <ScrollView className="">
      <View className="w-full h-80 bg-slate-300 mb-4 relative">
        {event.imageUrl ? (
          <Image
            source={{ uri: event.imageUrl }}
            className="object-contain w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Image
            source={placeholderImage}
            className="object-contain w-full h-full"
            resizeMode="cover"
          />
        )}
        <View className="absolute bottom-0 right-0 bg-teal-500 p-2 rounded-tl-md">
          <Text className="text-gray-50 text-xl ">1 / 1</Text>
        </View>
      </View>
      <View className="bg-gray-1500 rounded-3xl p-4">
        <Text className="text-2xl font-bold mb-2 text-teal-600">
          {event.name}
        </Text>
        <Text className="text-xl text-gray-700 mb-2">{event.description}</Text>
        <View className="flex flex-row justify-between">
          <Text className="text-md text-gray-700 mb-2">Date: {event.date}</Text>
          <Text className="text-md text-gray-700 mb-2">Time: {event.time}</Text>
        </View>
        {/* <TouchableOpacity onPress={() => Linking.openURL(event.addressUrl)}>
          <Text className="text-md text-teal-600 mb-2">
            Address: {event.address}
          </Text>
        </TouchableOpacity> */}

        <View className="flex flex-row justify-between mt-4">
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${event.internationalPhoneNumber}`)
            }
            className="bg-teal-600 p-4 rounded-2xl flex flex-row justify-center items-center"
          >
            <Icon name="phone" size={18} className="text-gray-50 mx-2" />
            <Text className="text-md text-gray-50">Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `https://maps.google.com/?q=${event.latitude},${event.longitude}`
              )
            }
            className="bg-teal-600 p-4 rounded-2xl"
          >
            <Text className="text-md text-gray-50">View on Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Event;
