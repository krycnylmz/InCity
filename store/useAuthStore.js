import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, register as apiRegister } from '../api/apiService';

const useAuthStore = create((set) => ({
  email: '',
  password: '',
  token: null,
  isSetInterests: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  login: async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      const token = response.accessToken;
      console.log(response.interestedSet);
      const isSetInterests = response.interestedSet;
      if (token) {
        await AsyncStorage.setItem('userToken', token); // Token'ı AsyncStorage'a kaydet
        await AsyncStorage.setItem('isSetInterests', JSON.stringify(isSetInterests));
        set({ token, isSetInterests });
        return true; // Başarılı giriş
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.log(`Login error: ${error.message}`);
      alert(error.message);
      return false; // Başarısız giriş
    }
  },
  register: async (name, surname, email, password, age, gender) => {
    try {
      const registerResponse = await apiRegister(name, surname, email, password, age, gender);
      console.dir(registerResponse);
      // console.log(`panda registerResponse: ${registerResponse}`);
      if (registerResponse.success) { // Kayıt başarılıysa
        const response = await apiLogin(email, password);
        const token = response.accessToken;
        const isSetInterests = response.interestedSet;
        console.log(`panda isSetInterests isSetInterests ${isSetInterests}`);
        if (token) {
          await AsyncStorage.setItem('userToken', token); // Token'ı AsyncStorage'a kaydet
          // await AsyncStorage.setItem('isSetInterests', isSetInterests); // isSetInterests
          set({ token, isSetInterests });
          return true; // Başarılı giriş
        } else {
          throw new Error('Token not found in response');
        }
      } else {
        alert(registerResponse.message || 'Registration failed, please try again.');
        return false; // Başarısız kayıt
      }
    } catch (error) {
      console.log(`panda ${error}`);
      alert('Registration failed, please try again.');
      return false; // Başarısız kayıt
    }
  },
}));

export default useAuthStore;
