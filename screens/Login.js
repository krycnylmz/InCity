import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import useAuthStore from "../store/useAuthStore"; // useAuthStore'u import edin
import InputText from "../components/InputText";

const Login = ({ navigation }) => {
  const { email, setEmail, password, setPassword, login, isSetInterests } = useAuthStore();

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please enter all fields!");
    } else {
      const success = await login(email, password);
      console.log(`panda is ok ${success}`);
      if (success) {
        if (!isSetInterests) {
          navigation.navigate('InterestsSelection'); // Giriş başarılıysa yönlendirme yapın
        }
        navigation.navigate('Home'); // Giriş başarılıysa yönlendirme yapın
      }
    }
  };

  return (
    <>

      <ImageBackground
        source={require("../assets/images/loginBackground.png")}
        className="flex-1"
      >
        <View className="flex-1 flex-col items-center justify-start pt-16">
          <View className="w-full my-8 items-center justify-center">
            <Image
              source={require("../assets/images/logo.png")}
              className="px-1"
            />
          </View>
          <InputText
            placeholder="Email"
            onChangeText={handleEmailChange}
            value={email}
          />
          <InputText
            placeholder="Password"
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry={true}
          />
          <View className="w-full flex flex-row justify-end px-8 items-center">
            <TouchableOpacity
              className="bg-green-600 w-32 p-4 rounded-md"
              onPress={handleLogin}
            >
              <Text className="text-white text-center">LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Login;
