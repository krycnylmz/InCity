import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import IconIo from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";


function EventCard({ event }) {
  const EventPlaceholderImage = require("../assets/images/EventPlaceHolder.png");
  const navigation = useNavigation();
  return (
    <View className="pr-2 min-w-[300px]">
      <Pressable
        onPress={() => navigation.navigate("Event", { event: event })}
        className="bg-gray-50 p-2 rounded-xl flex flex-row"
      >
        {event.imageUrl ? (
          <Image
            source={{ uri: event.imageUrl }}
            className="h-24 w-24 object-cover rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <Image
            source={EventPlaceholderImage}
            className="h-24 w-24 object-cover rounded-lg"
            resizeMode="cover"
          />
        )}
        <View className="ml-2 min-w-[200px] flex flex-col justify-between">
          <Text className="truncate text-lg text-slate-900">{event.name} </Text>
          <View className="flex flex-col">
            <View className="flex flex-row justify-between">
              <IconIo name="alarm-outline" size={18} color="rgb(13 148 136)" />
              <Text className=" text-sm text-teal-800 self-end ">
                {event.time}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <IconIo name="calendar-outline" size={18} color="rgb(13 148 136)" />
              <Text className=" text-sm text-teal-800 self-end ">
                {event.date}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-end">
            <View className="bg-teal-700 px-1 rounded-2xl">
              <Text className=" text-white text-xs">Today</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default EventCard;
