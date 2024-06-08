import { create } from "zustand";
import { getPlacesByRadius as apiGetPlacesByRadius } from "../api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useExplorerPlaceStore = create((set) => ({
  places: [],
  isLoading: false,
  setPlaces: async (radius) => {
    console.log(`panda radius ${radius}`);
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }
      const places = await apiGetPlacesByRadius(token, radius);
      set({ places, isLoading: false });
      return places;
    } catch (error) {
      console.error("Getting place detail failed - :", error.message);
      set({ isLoading: false });
      throw error;
    }
  },
}));

export default useExplorerPlaceStore;
