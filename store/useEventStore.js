import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getEvents as apiGetEvents,
} from "../api/apiService";

const useEventStore = create((set)=>({
  events: [],
  setEvents: async (radius) => {
    try {
      const events = await apiGetEvents(radius);
      console.log(`panda events ${events}`);
      set({ events });
      return events;
    } catch (error) {
      console.error("Getting events failed - :", error.message);
      throw error;
    }
  },
    // getEvents: async function () {
  //   try {
  //     const token = await AsyncStorage.getItem("userToken");
  //     if (!token) {
  //       throw new Error("No token found");
  //     }
  //   } catch (error) {
      
  //   }
  // }
}))


export default useEventStore;