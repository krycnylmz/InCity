import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

// const API_BASE_URL = 'http://in-city-backend-v1.westeurope.azurecontainer.io:8080/api/v1';
const API_BASE_URL = "http://192.168.1.7:8080/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

const login = async (email, password) => {
  try {
    // console.log('Login request:', { email, password });
    const response = await apiClient.post("/user/login", { email, password });
    console.log("Server login response:", response.data.data);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.log("Login failed", error.response.data);
      throw new Error(error.response.data.message || "Login failed");
    } else {
      console.error("Login failed", error.message);
      throw new Error("Login failed");
    }
  }
};

const register = async (name, surname, email, password, age, gender) => {
  try {
    console.log("Register request:", {
      name,
      surname,
      email,
      password,
      age,
      gender,
    });
    const response = await apiClient.post("/user/register", {
      name,
      surname,
      email,
      password,
      age: parseInt(age),
      gender: gender.toUpperCase(),
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Registration failed with response:", error.response.data);
    } else {
      console.error("Registration failed:", error.message);
    }
    throw error;
  }
};

const addInterests = async (interests) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await apiClient.post(
      "/interest/add",
      { interests },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    await AsyncStorage.setItem("isSetInterests", "true");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Add interests failed with response:", error.response.data);
    } else {
      console.error("Add interests failed:", error.message);
    }
    throw error;
  }
};

const getUserInterests = async (token) => {
  try {
    const response = await apiClient.get("/interest/getUserInterests", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.data.interests;
  } catch (error) {
    if (error.response) {
      console.error(
        "Getting interests failed with response:",
        error.response.data
      );
    } else {
      console.error("Getting interests failed:", error.message);
    }
    throw error;
  }
};

// http://localhost:8080/api/v1/maps/getPlacesByUserInterest?latitude=38.40707&longitude=27.11492

const getPlacesByRadius = async (token, radius) => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const response = await apiClient.get(
      "/maps/getPlacesByUserInterestRadius",
      {
        params: {
          latitude,
          longitude,
          radius,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Getting places failed with response:",
        error.response.data
      );
    } else {
      console.error("Getting places failed:", error.message);
    }
    throw error;
  }
};

const getPlacesByInterests = async (token) => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const response = await apiClient.get(
      "/maps/getPlacesByUserInterest",
      {
        params: {
          latitude,
          longitude,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Getting places failed with response:",
        error.response.data
      );
    } else {
      console.error("Getting places failed:", error.message);
    }
    throw error;
  }
};

const getEvents = async (radius) => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await apiClient.get(
      "/events/getInterestSuggestionCoordinates",
      {
        params: {
          latitude,
          longitude,
          radius,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(`panda res ${response}`);
    return response.data.data;
  } catch (error) {
    console.error("Getting events failed on apiService:", error);
    throw error;
  }
};

const getPlaceById = async (token, placeId) => {
  try {
    const response = await apiClient.get(`/maps/placeDetails/${placeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getPlaceById:", error);
    throw error; // rethrow the error to be caught by the caller
  }
};


export {
  login,
  register,
  addInterests,
  getUserInterests,
  getPlacesByInterests,
  getPlacesByRadius,
  getEvents,
  getPlaceById,
};
