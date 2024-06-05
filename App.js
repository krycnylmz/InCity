import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import WelcomeScreen from "./screens/Welcome";
import LoginScreen from "./screens/Login";
import Register from "./screens/Register";
import HomeScreen from "./screens/Home";
import InterestsSelectionScreen from "./screens/InterestsSelection";
import PlaceScreen from "./screens/Place";
import EventScreen from "./screens/Event";
import ProfileScreen from "./screens/Profile";

const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Welcome");

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);
        const token = await AsyncStorage.getItem("userToken");
        const isSetInterests = await AsyncStorage.getItem("isSetInterests");
        if (token) {
          if (!JSON.parse(isSetInterests)) {
            setInitialRoute("InterestsSelection");
          } else {
            setInitialRoute("Home");
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View className="flex-1" onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login Screen",
              headerStyle: {
                backgroundColor: "black",
              },
              headerTintColor: "red",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InterestsSelection"
            component={InterestsSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Place"
            component={PlaceScreen}
            options={{ headerShown: true, title: "", headerTintColor:"rgb(13 148 136)" }}
          />
          <Stack.Screen
            name="Event"
            component={EventScreen}
            options={{ headerShown: true, title: "", headerTintColor:"rgb(13 148 136)" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: true, headerTintColor:"rgb(13 148 136)" }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Register Screen",
              headerStyle: {
                backgroundColor: "black",
              },
              headerTintColor: "red",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
