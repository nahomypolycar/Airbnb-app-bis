import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSummit = async () => {
    //console.log({ email, username, description, password, confirmPassword });
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            { email, username, description, password }
          );
          console.log(response.data);
          setToken(response.data.token, response.data.id);
          alert("vous êtes bien inscrit");
        } catch (error) {
          setErrorMessage("Error occured");
          console.log(error.response.data);
        }
      } else {
        setErrorMessage("Please make sure your passwords match");
      }
    } else {
      setErrorMessage("Please make sure that all the fields are completed");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Image
          source={require("../assets/logo-airbnb.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          value={email}
          placeholder="Email"
          style={styles.textInput}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage("");
          }}
        />

        <TextInput
          value={username}
          placeholder="Username"
          style={styles.textInput}
          onChangeText={(text) => {
            setUsername(text);
            setErrorMessage("");
          }}
        />
        <TextInput
          value={description}
          placeholder=" Describe yourself in a few words..."
          style={[styles.textInput, styles.multiline]}
          multiline
          onChangeText={(text) => {
            setDescription(text);
            setErrorMessage("");
          }}
        />
        <TextInput
          value={password}
          placeholder="password"
          style={styles.textInput}
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage("");
          }}
        />
        <TextInput
          value={confirmPassword}
          placeholder="confirm password"
          style={styles.textInput}
          secureTextEntry
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrorMessage("");
          }}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSummit}>
          <Text>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.textBtn}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
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
    marginBottom: 20,
  },

  // INPUT

  textInput: {
    color: "#C4C4C6",
    borderBottomWidth: 1,
    borderColor: "#EB5A62",
    fontSize: 15,
    marginVertical: 10,
    width: "70%",
    paddingBottom: 15,
  },
  multiline: {
    borderWidth: 1,
    height: 100,
    paddingTop: 10,
    paddingLeft: 10,
  },
  button: {
    borderWidth: 2,
    borderColor: "#EB5A62",
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 30,
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  textBtn: {
    fontSize: 20,
    color: "#717171",
  },
  linkText: {
    fontSize: 15,
    color: "#717171",
    paddingBottom: 60,
  },
  errorMessage: {
    color: "#EB5A62",
    paddingTop: 50,
  },
});
