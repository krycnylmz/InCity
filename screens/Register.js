import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import useAuthStore from '../store/useAuthStore';
import InputText from "../components/InputText";

const Register = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("koray1");
  const [surname, setSurname] = useState("yilmaz");
  const [email, setEmail] = useState("k1@gmail.com");
  const [password, setPassword] = useState("1234");
  const [age, setAge] = useState("23");
  const [gender, setGender] = useState("MALE");

  const { register, isSetInterests } = useAuthStore();

  const handleNextStep = () => {
    // First step validation if needed
  };

  const handleRegister = async () => {
    if (!name || !surname || !email || !password || !age || !gender) {
      alert("Please enter all fields!");
    } else {
      let isOk = await register(name, surname, email, password, age, gender);
      if(isOk){
        if (!isSetInterests) {
          navigation.navigate('InterestsSelection'); // Kayıt başarılı ve login ise yönlendirme yap
        }else{
          navigation.navigate('Home'); // Kayıt başarılı ve login ise yönlendirme yap
        }
      }
    }
  };

  const renderStep1 = () => (
    <>
      <InputText
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <InputText
        placeholder="Surname"
        onChangeText={setSurname}
        value={surname}
      />
      <InputText
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <View className="w-full flex flex-row justify-end px-8 items-center">
        <TouchableOpacity
          className="bg-green-600 w-32 p-4 rounded-md"
          onPress={() => setStep(2)}
        >
          <Text className="text-white text-center">Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <InputText
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <InputText
        placeholder="Age"
        onChangeText={setAge}
        value={age}
        keyboardType="numeric"
      />
      <View className="w-full flex flex-row justify-center items-center">
        <Picker
          selectedValue={gender}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Female" value="FEMALE" />
          <Picker.Item label="Other" value="OTHER" />
        </Picker>
      </View>
      <View className="w-full flex flex-row justify-between px-8 items-center">
        <TouchableOpacity
          className="bg-gray-600 w-32 p-4 rounded-md"
          onPress={() => setStep(1)}
        >
          <Text className="text-white text-center">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-600 w-32 p-4 rounded-md"
          onPress={handleRegister}
        >
          <Text className="text-white text-center">REGISTER</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <ImageBackground
      source={require("../assets/images/loginBackground.png")}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="w-full my-8 items-center justify-center">
          <Image
            source={require("../assets/images/logo.png")}
            className="px-1"
          />
        </View>
        <View className="flex-1 flex-col items-center justify-start">
          {step === 1 ? renderStep1() : renderStep2()}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Register;
