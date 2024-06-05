import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Linking,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import usePlaceStore from "../store/usePlaceStore";

// `route` props'unu function parametreleri arasına ekleyin.
const Explore = ({ route }) => {
  return (
    <ScrollView className="">
      <Text>Explore</Text>
    </ScrollView>
  );
};

export default Explore;
