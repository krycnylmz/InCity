import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Components
import  RatingStars  from "./RatingStars";

const PlaceCard = React.memo(({ place }) => {
  const navigation = useNavigation();
  const placeholderImage = require("../assets/images/ImagePlaceholder.png");

  return (
    <Pressable
      onPress={() => navigation.navigate("Place", { placeId: place.placeId })}
      className="p-2"
    >
      <View className=" w-72 h-80 rounded-2xl bg-gray-50 flex justify-start items-center">
        <View className="h-64 w-72 p-2 relative">
          {place.photoUrl ? (
            <Image
              source={{ uri: place.photoUrl }}
              className="object-contain w-full h-full rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={placeholderImage}
              className="object-contain w-full h-full rounded-xl"
              resizeMode="cover"
            />
          )}
          {/* <View className="absolute top-0 right-0 m-3 rounded-full bg-gray-50 p-2">
            <Icon
              name={place.isLiked ? "heart" : "hearto"}
              color="red"
              size={18}
              className="text-gray-300"
            />
          </View> */}
          <View className="">
          <RatingStars rating={place.rating} userRating={place.userRating} /> 
            {/* <View className="flex flex-row mt-2 mb-1">
              <IconIo name="star" size={18} color="#DFA430" />
              <IconIo name="star" size={18} color="#DFA430" />
              <IconIo name="star" size={18} color="#DFA430" />
              <IconIo name="star-half" size={18} color="#DFA430" />
              <IconIo name="star-outline" size={18} color="#DFA430" />
            </View> */}
            <View className="">
              <Text className="text-lg font-medium">
                {place.name.length > 20
                  ? place.name.substring(0, 20)
                  : place.name}
              </Text>
            </View>
            {/* <View>
              <Text>{tag}</Text>
            </View> */}
          </View>
        </View>
      </View>
    </Pressable>
  );
});

export default PlaceCard;
