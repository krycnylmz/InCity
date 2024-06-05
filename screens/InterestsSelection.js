import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addInterests } from "../api/apiService";
const InterestSelection = ({ route }) => {
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const placeTypes = [
    { value: "accounting", label: "Accounting" },
    { value: "airport", label: "Airport" },
    { value: "amusement_park", label: "Amusement Park" },
    { value: "aquarium", label: "Aquarium" },
    { value: "art_gallery", label: "Art Gallery" },
    { value: "atm", label: "ATM" },
    { value: "bakery", label: "Bakery" },
    { value: "bank", label: "Bank" },
    { value: "bar", label: "Bar" },
    { value: "beauty_salon", label: "Beauty Salon" },
    { value: "bicycle_store", label: "Bicycle Store" },
    { value: "book_store", label: "Book Store" },
    { value: "bowling_alley", label: "Bowling Alley" },
    { value: "bus_station", label: "Bus Station" },
    { value: "cafe", label: "Cafe" },
    { value: "campground", label: "Campground" },
    { value: "car_dealer", label: "Car Dealer" },
    { value: "car_rental", label: "Car Rental" },
    { value: "car_repair", label: "Car Repair" },
    { value: "car_wash", label: "Car Wash" },
    { value: "casino", label: "Casino" },
    { value: "cemetery", label: "Cemetery" },
    { value: "church", label: "Church" },
    { value: "city_hall", label: "City Hall" },
    { value: "clothing_store", label: "Clothing Store" },
    { value: "convenience_store", label: "Convenience Store" },
    { value: "courthouse", label: "Courthouse" },
    { value: "dentist", label: "Dentist" },
    { value: "department_store", label: "Department Store" },
    { value: "doctor", label: "Doctor" },
    { value: "drugstore", label: "Drugstore" },
    { value: "electrician", label: "Electrician" },
    { value: "electronics_store", label: "Electronics Store" },
    { value: "embassy", label: "Embassy" },
    { value: "fire_station", label: "Fire Station" },
    { value: "florist", label: "Florist" },
    { value: "funeral_home", label: "Funeral Home" },
    { value: "furniture_store", label: "Furniture Store" },
    { value: "gas_station", label: "Gas Station" },
    { value: "gym", label: "Gym" },
    { value: "hair_care", label: "Hair Care" },
    { value: "hardware_store", label: "Hardware Store" },
    { value: "hindu_temple", label: "Hindu Temple" },
    { value: "home_goods_store", label: "Home Goods Store" },
    { value: "hospital", label: "Hospital" },
    { value: "insurance_agency", label: "Insurance Agency" },
    { value: "jewelry_store", label: "Jewelry Store" },
    { value: "laundry", label: "Laundry" },
    { value: "lawyer", label: "Lawyer" },
    { value: "library", label: "Library" },
    { value: "light_rail_station", label: "Light Rail Station" },
    { value: "liquor_store", label: "Liquor Store" },
    { value: "local_government_office", label: "Local Government Office" },
    { value: "locksmith", label: "Locksmith" },
    { value: "lodging", label: "Lodging" },
    { value: "meal_delivery", label: "Meal Delivery" },
    { value: "meal_takeaway", label: "Meal Takeaway" },
    { value: "mosque", label: "Mosque" },
    { value: "movie_rental", label: "Movie Rental" },
    { value: "movie_theater", label: "Movie Theater" },
    { value: "moving_company", label: "Moving Company" },
    { value: "museum", label: "Museum" },
    { value: "night_club", label: "Night Club" },
    { value: "painter", label: "Painter" },
    { value: "park", label: "Park" },
    { value: "parking", label: "Parking" },
    { value: "pet_store", label: "Pet Store" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "physiotherapist", label: "Physiotherapist" },
    { value: "plumber", label: "Plumber" },
    { value: "police", label: "Police" },
    { value: "post_office", label: "Post Office" },
    { value: "primary_school", label: "Primary School" },
    { value: "real_estate_agency", label: "Real Estate Agency" },
    { value: "restaurant", label: "Restaurant" },
    { value: "roofing_contractor", label: "Roofing Contractor" },
    { value: "rv_park", label: "RV Park" },
    { value: "school", label: "School" },
    { value: "secondary_school", label: "Secondary School" },
    { value: "shoe_store", label: "Shoe Store" },
    { value: "shopping_mall", label: "Shopping Mall" },
    { value: "spa", label: "Spa" },
    { value: "stadium", label: "Stadium" },
    { value: "storage", label: "Storage" },
    { value: "store", label: "Store" },
    { value: "subway_station", label: "Subway Station" },
    { value: "supermarket", label: "Supermarket" },
    { value: "synagogue", label: "Synagogue" },
    { value: "taxi_stand", label: "Taxi Stand" },
    { value: "tourist_attraction", label: "Tourist Attraction" },
    { value: "train_station", label: "Train Station" },
    { value: "transit_station", label: "Transit Station" },
    { value: "travel_agency", label: "Travel Agency" },
    { value: "university", label: "University" },
    { value: "veterinary_care", label: "Veterinary Care" },
    { value: "zoo", label: "Zoo" }
  ];

  // const toggleInterest = (interest) => {
  //   setSelectedInterests(prevState =>
  //     prevState.includes(interest)
  //       ? prevState.filter(i => i !== interest)
  //       : [...prevState, interest]
  //   );
  // };

  const handleInterestSelect = (interest) => {
    setSelectedInterests((prevSelectedInterests) => {
      if (prevSelectedInterests.includes(interest)) {
        return prevSelectedInterests.filter((i) => i !== interest);
      } else {
        return [...prevSelectedInterests, interest];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await addInterests(selectedInterests);
      // Alert.alert('Success', 'Your interests have been saved!');
      navigation.navigate("Home"); // Navigate to the Home screen after successful submission
    } catch (error) {
      console.error('Error adding interests:', error);
      Alert.alert('Error', 'Failed to save your interests. Please try again.');
    }
  };

  useEffect(() => {
    if (selectedInterests.length === placeTypes.length) {
      Alert.alert("WOW", "You got us very excited. Let's quickly save the areas of interest and see what we can do.");
    }
  }, [selectedInterests]);

  return (
    <View className="p-4 h-full">
      <View className="w-full rounded-md p-4 bg-slate-100">
        <Text className="text-2xl">Let's Get to Know You</Text>
        <Text>Please select your areas of interest!</Text>
      </View>
      <ScrollView className="w-full py-4">
        <View className="flex flex-row justify-between flex-wrap gap-4">
          {placeTypes.map((place, index) => (
            <Pressable
              key={index}
              onPress={() => handleInterestSelect(place.value)}
              className={`p-2 rounded-md w-[45%] h-24 items-center justify-center ${
                selectedInterests.includes(place.value) ? "bg-green-400" : "bg-white"
              }`}
            >
              <Text className="text-xl text-center">{place.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View className="w-full flex flex-row justify-end py-4">
        <Pressable
          onPress={handleSubmit}
          className="bg-green-500 rounded-md w-24 h-12 items-center justify-center"
        >
          <Text className="text-xl text-white">Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InterestSelection;
