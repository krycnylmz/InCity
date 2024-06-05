import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addInterests as apiAddInterests,
  getUserInterests as apiGetUserInterests,
  getPlacesByInterests as apiGetPlacesByInterests,
} from "../api/apiService";

const useInterestStore = create((set) => ({
  interests: [],
  places: [],
  setInterests: (interests) => set({ interests }),
  // addInterests: async (interests) => {
  //   try {
  //     const token = await AsyncStorage.getItem('userToken');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }
  //     const response = await apiAddInterests(interests, token);
  //     await AsyncStorage.setItem('isSetInterests', "true");
  //     return response;
  //   } catch (error) {
  //     console.error('Add interests failed:', error.message);
  //     throw error;
  //   }
  // },
  getUserInterests: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }
      const interests = await apiGetUserInterests(token);
      // console.log(`panda interests ${interests}`);
      set({ interests });
      return interests;
    } catch (error) {
      console.error("Getting interests failed:", error.message);
      throw error;
    }
  },

  getPlacesByInterests: async function (radius) {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }
      const places = await apiGetPlacesByInterests(token,radius);
      // console.log(`panda places ${places}`);
      set({ places });
      return places;
    } catch (error) {}
  },


}));

export default useInterestStore;
