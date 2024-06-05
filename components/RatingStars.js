import React from "react";
import { View, Icon, Text } from "react-native";
import IconIo from "react-native-vector-icons/Ionicons";

const RatingStars = ({ rating, userRating }) => {
  if (!rating) {
    rating = 0;
  }
  const filledStars = Math.floor(rating);
  const halfStar = Math.round(rating % 1) === 0.5; // Check for exact half star
  const emptyStars = 5 - (filledStars + (halfStar ? 1 : 0));

  return (
    <View className="flex flex-row justify-between items-center ">
      <View className="flex flex-row mt-2 mb-1 ">
        {[...Array(filledStars)].map((_, index) => (
          <IconIo key={index} name="star" size={18} color="#DFA430" />
        ))}
        {halfStar && <IconIo name="star-half" size={18} color="#FFC107" />}
        {[...Array(emptyStars)].map((_, index) => (
          <IconIo key={index} name="star-outline" size={18} color="#FFC107" />
        ))}
        <IconIo name="arrow-redo" size={18} color="#FFC107" />
        <Text>  {rating} </Text>
      </View>
      <View className="flex flex-row">
        <IconIo name="people-outline" size={18} color="#FFC107" />
        <Text> {userRating} </Text>
      </View>
    </View>
  );
};


export default RatingStars;
