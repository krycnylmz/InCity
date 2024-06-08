import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlaceCard from "../components/PlaceCard";

// Stores
import useInterestStore from "../store/useInterestStore";
import useEventStore from "../store/useEventStore";
import EventCard from "../components/EventCard";

const Home = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState();
  const { interests, getUserInterests, places, getPlacesByInterests } = useInterestStore();
  const {events, setEvents} = useEventStore();
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        // const location = await Location.getCurrentPositionAsync({});
        // const { latitude, longitude } = location.coords;

        await getUserInterests();
        const token = await AsyncStorage.getItem('userToken');
        await getPlacesByInterests();
        // console.log("Places data:", places); // Places datasını console'a bastır
      } catch (error) {
        console.error("Error fetching interests:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEvents = async () => {
      await setEvents(2000);
    };

    fetchInterests();
    fetchEvents();
  }, [getUserInterests, getPlacesByInterests, setEvents]);

  useEffect(() => {
    if (interests.length > 0) {
      setSelectedCategory(interests[0].value);
    }
    return () => {
      interests;
    }
  }, [interests])
  

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

  const onPressCategory = (slug) => {
    setSelectedCategory(slug);
  };

  const filteredPlaces = places ? places.filter((place) => place.types.includes(selectedCategory)) : [];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="flex flex-row justify-between p-4 py-1 space-y-2">
        <Image source={require("../assets/images/logo_gradient.png")} />
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="user" size={24} className="text-teal-600" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between p-4 py-1 space-y-2">
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          <Icon name="user" size={24} className="text-teal-600" />
        </TouchableOpacity>
      </View>
      
      
        <View className="flex flex-row justify-between p-4 space-y-2">
          <Text className="text-2xl font-medium">Explore!</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Explore")}>
            <Icon name="plus" size={24} className="text-gray-300" />
          </TouchableOpacity>
        </View>

      <View className="space-y-2">
        <Text className="text-xl px-4">Near Places</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="bg-gray-200 py-4 pt-6"
        >
          <View className="flex flex-row space-x-4 px-4 gap-4 w-full">
            {interests.map((interest, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onPressCategory(interest.value)}
              >
                <Text
                  className=" whitespace-nowrap w-full "
                  style={{
                    fontSize: 16,
                    color: selectedCategory === interest.value ? "teal" : "gray",
                  }}
                >
                  {interest.label}
                </Text>
                {selectedCategory === interest.value && (
                  <View className="text-4xl bg-teal-600 h-1 my-2 rounded-full bg-gray-50 items-center flex justify-center flex-row"></View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {filteredPlaces.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No places found for selected category.
          </Text>
        ) : (
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={filteredPlaces}
            renderItem={({ item }) => <PlaceCard place={item} />}
            keyExtractor={(item) => item.placeId} // Generating unique key for each place
            ref={flatListRef}
          />
        )}
      </View>
      <View className="px-2">
        <View className="pb-2">
          <Text className="text-2xl text-teal-600">Events</Text>
        </View>
        <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={events}
              renderItem={({ item }) => <EventCard event={item} />}
              keyExtractor={(item) => item.id}
              ref={flatListRef}
            />
      </View>
    </SafeAreaView>
  );
};

export default Home;


// 38,407074
// 27,114921