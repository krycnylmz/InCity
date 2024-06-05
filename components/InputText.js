import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

function InputText({ placeholder, onChangeText,secureTextEntry,value }) {

  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        placeholderTextColor="#003f5c"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry} // This will enable secure text entry for password inputs
        value={value} // Ensure that the value of the input field is set
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputView: {
    width: "80%",
    backgroundColor: "#E0E1DD",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
});

export default InputText;
