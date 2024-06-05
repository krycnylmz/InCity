import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Pressable, TouchableOpacity, Linking, Modal, FlatList, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import usePlaceStore from "../store/usePlaceStore";

// `route` props'unu function parametreleri arasına ekleyin.
const Place = ({ route }) => {
  // `route.params` kullanarak `placeDetail` parametresine erişin.
  const { placeId } = route.params;
  const navigation = useNavigation();
  const placeholderImage = require("../assets/images/ImagePlaceholder.png");
  const { place, setPlace } = usePlaceStore();
  const [activeTab, setActiveTab] = useState('Reviews');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        await setPlace(placeId);
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    };

    fetchPlace();
  }, [setPlace]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Reviews':
        return place.reviews && place.reviews.length > 0 ? place.reviews.map((review, index) => (
          <Text key={index} className="text-md mb-2 bg-gray-50 p-2 rounded-md">{review}</Text>
        )) : <Text className="text-md">No reviews available.</Text>;
      case 'Details':
        return (
          <View>
            <Text className="text-md mb-2">Address: {place.vicinity}</Text>
            <TouchableOpacity onPress={() => place.internationalPhoneNumber && Linking.openURL(`tel:${place.internationalPhoneNumber}`)}>
              <Text className="text-md mb-2">Phone: {place.internationalPhoneNumber || 'N/A'}</Text>
            </TouchableOpacity>
            <Text className="text-md mb-2">Website: {place.website || ''}</Text>
            <Text className="text-md mb-2">Opening Hours:</Text>
            {place.openingHours && place.openingHours.length > 0 ? place.openingHours.map((hour, index) => (
              <Text key={index} className="text-md ml-2">{hour}</Text>
            )) : <Text className="text-md ml-2">No opening hours available.</Text>}
          </View>
        );
      case 'Photos':
        return (
          <ScrollView horizontal>
            {place.photos && place.photos.length > 0 ? place.photos.map((photo, index) => (
              <Pressable key={index} onPress={() => { setSelectedIndex(index); setModalVisible(true); }}>
                <Image source={{ uri: photo }} style={{ width: 100, height: 100, marginRight: 10 }} />
              </Pressable>
            )) : <Text className="text-md">No photos available.</Text>}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  const renderModalContent = () => (
    <FlatList
      horizontal
      pagingEnabled
      data={place.photos}
      renderItem={({ item }) => (
        <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
          <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      initialScrollIndex={selectedIndex}
      getItemLayout={(data, index) => (
        { length: Dimensions.get('window').width, offset: Dimensions.get('window').width * index, index }
      )}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
        });
      }}
    />
  );

  return (
    <ScrollView className="">
      <View className="w-full h-72 bg-slate-300 ">
        
        <TouchableOpacity  onPress={() => setModalVisible(true)} className="">
          {place.photos && place.photos.length > 0 ? (
            <Image
              source={{ uri: place.photos[0] }}
              className="object-contain w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={placeholderImage}
              className="object-contain w-full h-full"
            />
          )}
        </TouchableOpacity>
        <View className="absolute top-0 w-full h-12 p-4 flex flex-row justify-between">
          <View className="h-12 min-w-18 rounded-full bg-gray-50 p-2 flex flex-row items-center justify-center ">
            <Icon name="star" size={24} className="text-teal-600" />
            <Text>{place.rating ? place.rating : "-"}</Text>
          </View>
        </View>
      </View>
      <View className="p-4 bg-gray-100 -top-10 flex-1 rounded-t-3xl flex flex-col justify-between">
        <Text className=" text-2xl font-medium">{place.name}</Text>
        <View>
          <Text className="">{place.vicinity}</Text>
          <Text className="text-md">{place.location}</Text>

          <View className="flex flex-row justify-between my-2 mb-4">
            {['Reviews', 'Details', 'Photos'].map(tab => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} className={`bg-gray-200 p-2 px-4 rounded-2xl ${activeTab === tab ? 'bg-teal-600' : 'text-gray-600'}`}>
                <Text className={`text-xl ${activeTab === tab ? 'text-gray-50' : 'text-gray-600'} `}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderTabContent()}
        </View>
        <View className=" bottom-0 h-24 w-full flex flex-row justify-end items-center ">
          {/* <Text className="text-teal-600 text-3xl font-bold">
            ${place.price || 'N/A'}
            <Text className="text-sm font-normal">/1 person</Text>
          </Text> */}
          {
            place.internationalPhoneNumber ?
            <TouchableOpacity onPress={() => place.internationalPhoneNumber && Linking.openURL(`tel:${place.internationalPhoneNumber}`)} className=" bg-teal-600 rounded-3xl p-2 px-4">
            <Text className="text-white text-lg">Call Now!</Text>
          </TouchableOpacity>
            :
            ""
          }
        </View>
      </View>

      <Modal visible={modalVisible} transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ position: 'absolute', top: 40, right: 20, zIndex: 1 }} onPress={() => setModalVisible(false)}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          {renderModalContent()}
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Place;
