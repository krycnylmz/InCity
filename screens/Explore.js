import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Circle,Callout } from "react-native-maps";
import * as Location from "expo-location";
import Slider from "@react-native-community/slider";
import useExplorerPlaceStore from "../store/useExplorerPlaceStore";

import { styled } from "nativewind";
import { debounce } from "lodash";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledActivityIndicator = styled(ActivityIndicator);

const Explore = () => {
  const [location, setLocation] = useState(null);
  const [circleRadius, setCircleRadius] = useState(250);
  const [errorMsg, setErrorMsg] = useState(null);
  const { places, setPlaces, isLoading } = useExplorerPlaceStore();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      // İlk yüklemede konuma göre yerleri getir
      await setPlaces(circleRadius);
    })();
  }, []);

  const debouncedSetPlaces = useCallback(
    debounce(async (value) => {
      if (location) {
        try {
          await setPlaces(value);
        } catch (error) {
          Alert.alert(
            "Error",
            "Failed to fetch places. Please try again later."
          );
        }
      }
    }, 500), // 500ms gecikme
    [location]
  );

  const handleRadiusChange = (value) => {
    setCircleRadius(value);
    debouncedSetPlaces(value);
  };

  return (
    <StyledView className="flex-1">
      {location ? (
        <>
          {isLoading && (
            <StyledView className="absolute top-12 left-5 right-5 bg-white p-4 rounded-xl shadow-lg z-50">
              <StyledActivityIndicator size="small" color="teal" />
            </StyledView>
          )}
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0321,
            }}
          >
            <Marker
              pinColor="blue"
              title="You are here"
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
            {places &&
              places.map((place, index) => (
                <Marker
                key={index}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
              >
                <Callout onPress={() => navigation.navigate("Place", { placeId: place.placeId })}>
                  <View>
                    <Text>{place.name}</Text>
                    <Text>{place.rating}</Text>
                  </View>
                </Callout>
              </Marker>
              ))}
            <Circle
              center={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              radius={circleRadius}
              strokeWidth={2}
              strokeColor="white"
              fillColor="rgba(123,174,203,0.3)"
            />
          </MapView>
          <StyledView className="absolute bottom-12 left-5 right-5 bg-white p-4 rounded-xl shadow-lg">
            <StyledText className="text-center">
              Diameter: {circleRadius} meters
            </StyledText>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={250}
              maximumValue={2000}
              step={50}
              value={circleRadius}
              onValueChange={handleRadiusChange}
              minimumTrackTintColor="#1B1B1E"
              maximumTrackTintColor="#4E4F53"
              thumbTintColor="#25B1A0"
            />
          </StyledView>
        </>
      ) : (
        <StyledView className="flex-1 justify-center items-center">
          <StyledActivityIndicator size="large" color="teal" />
          <StyledText className="text-xl mt-4">
            Waiting for location...
          </StyledText>
          <StyledText className="text-center mt-2">
            We are getting your current position and will show it on the map.
          </StyledText>
        </StyledView>
      )}
    </StyledView>
  );
};

export default Explore;
