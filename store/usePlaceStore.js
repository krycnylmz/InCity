import { create } from "zustand";
import { getPlaceById as apiGetPlaceById } from "../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
const usePlaceStore = create((set) => ({
  place: {},
  setPlace: async (placeId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }
      const place = await apiGetPlaceById(token, placeId);
      set({ place });
      return place;
    } catch (error) {
      console.error("Getting place detail failed - :", error.message);
      throw error;
    }
  },
}));

export default usePlaceStore;
