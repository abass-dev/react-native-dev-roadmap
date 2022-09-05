import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  Alert,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function App() {
  const [username, setUsername] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  function inputValueHandler(entredText) {
    setUsername(entredText);
  }
  async function removeDataHandler() {
    try {
      await AsyncStorage.removeItem("username");
    } catch (error) {
      console.log(error);
    }
    setCurrentUser(null);
    Alert.alert("Data Removed!!", "", [{ text: "Okay 👌" }]);
  }

  function resetInputHandler() {
    setUsername("");
  }

  async function onSaveHandler() {
    if (!username) {
      alert("Invalid Username");
      return;
    }
    try {
      await AsyncStorage.setItem("username", username);
    } catch (error) {
      console.log(error);
    }
    Alert.alert(
      "Data Saved!!!",
      "To be able to read the data click on `(Read data)` button.",
      [{ text: "Okay 👌", onPress: resetInputHandler }]
    );
  }

  async function onReadDataHandler() {
    try {
      const value = await AsyncStorage.getItem("username");
      if (!value) {
        ToastAndroid.show("There is not data to read", ToastAndroid.LONG);
      } else {
        setCurrentUser(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Local Storage</Text>
      <TextInput
        placeholder="Value to be save"
        style={styles.textInput}
        onChangeText={inputValueHandler}
        value={username}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button onPress={onSaveHandler} title="Save data" />
        </View>
        <View style={styles.button}>
          <Button onPress={onReadDataHandler} title="Read data" />
        </View>
        <View style={styles.button}>
          <Button onPress={removeDataHandler} title="Remove data" />
        </View>
      </View>
      {currentUser && (
        <View style={styles.data}>
          <Text style={styles.dataText}>{currentUser}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
  },
  textInput: {
    minWidth: 300,
    fontSize: 20,
    padding: 6,
    borderWidth: 1,
    marginVertical: 30,
    borderColor: "blue",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 5,
  },
  data: {
    marginVertical: 25,
    padding: 10,
    margin: 10,
    backgroundColor: "#1bc6ff",
  },
  dataText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
