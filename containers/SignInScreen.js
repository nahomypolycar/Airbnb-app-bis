import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";
import { ScrollView } from "react-native-web";

export default function SignInScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    if (email && password) {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email, password }
        );

        console.log("response >>>>", response.data.token);
        alert("vous êtes connecté", response.data.token);
        setToken(response.data.token);
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-airbnb.png")}
        />
        <Text style={styles.title}>Sign In</Text>

        <TextInput
          placeholder="Email"
          style={styles.textInput}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage("");
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textInput}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage("");
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text>Sign In</Text>
        </TouchableOpacity>

        <Text>{errorMessage}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.linkText}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  // LOGO AVEC NOM DE LA PAGE
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  logo: {
    height: 130,
    width: 150,
    resizeMode: "contain",
    marginTop: 120,
  },
  title: {
    color: "gray",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 90,
  },
  pageInfos: {
    alignItems: "center",
    paddingTop: 120,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingBottom: 40,
  },
  textInput: {
    color: "#C4C4C6",
    borderBottomWidth: 1,
    borderColor: "#EB5A62",
    fontSize: 15,
    marginVertical: 10,
    width: "70%",
    paddingBottom: 25,
  },
  errorMessage: {
    color: "red",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: "#EB5A62",
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 30,
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 100,
  },
  textBtn: {
    fontSize: 20,
    color: "#717171",
  },
  linkText: {
    fontSize: 15,
    color: "#717171",

    paddingBottom: 400,
  },
  errorMessage: {
    color: "#EB5A62",
    paddingTop: 50,
  },
});
