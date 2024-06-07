import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline, Circle } from "react-native-maps";
import * as Location from "expo-location";
import Slider from "@react-native-community/slider";
import useInterestStore from "../store/useInterestStore";

import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledActivityIndicator = styled(ActivityIndicator);

const Explore = () => {
  const [location, setLocation] = useState(null);
  const [circleRadius, setCircleRadius] = useState(2000);
  const [errorMsg, setErrorMsg] = useState(null);
  const { places, getPlacesByInterests } = useInterestStore();

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
      await getPlacesByInterests(currentLocation.coords.latitude, currentLocation.coords.longitude, circleRadius);
    })();
  }, []);

  const handleRadiusChange = async (value) => {
    setCircleRadius(value);
    if (location) {
      await getPlacesByInterests(location.latitude, location.longitude, value);
    }
  };

  return (
    <StyledView className="flex-1">
      {location ? (
        <>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
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
            {places && places.map((place, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                title={place.name}
              />
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
            <StyledText className="text-center">Diameter: {circleRadius} meters</StyledText>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={100}
              maximumValue={10000}
              step={100}
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
          <StyledText className="text-xl mt-4">Waiting for location...</StyledText>
          <StyledText className="text-center mt-2">
            We are getting your current position and will show it on the map.
          </StyledText>
        </StyledView>
      )}
    </StyledView>
  );
};

export default Explore;
