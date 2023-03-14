import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { defaultUserImg } from "../assets/defaultUserImg.jpeg";
import { useState, useEffect } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Ionicons } from "@expo/vector-icons";

export default function MyProfileScreen({ setToken, userToken, userId }) {
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setisLoading] = useState(true);

  console.log("token >>>>>", userToken, "id >>>>", userId);

  useEffect(() => {
    const getUserInfos = async () => {
      try {
        const infos = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );

        console.log("infos >>>>>>", infos.data);
        setEmail(infos.data.email);
        setUsername(infos.data.username);
        setDescription(infos.data.description);
        if (infos.data.photo) {
          setAvatar(infos.data.photo.url);
        }
        console.log("avatar >>>>", avatar);
      } catch (error) {
        console.log("catch error>>>>>", error.response);
      }
      setisLoading(false);
    };
    getUserInfos();
  }, []);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <View style={styles.avatarBlock}>
          {/* Si il n'y a pas d'image de déposé, avoir une image par défaut  */}
          <View>
            {avatar ? (
              <Image style={styles.avatar} source={avatar} />
            ) : (
              <Ionicons
                name="md-person-circle-sharp"
                size={150}
                color="#717171"
              />
            )}
          </View>

          <View>
            <TouchableOpacity style={{ marginBottom: 15 }}>
              <MaterialIcons name="photo-library" size={30} color="#717171" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="photo-camera" size={30} color="#717171" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Objectif avoir les informations de l'utilisateurs qui s'affichent et quand on clique dessus on ça revien à 0 et on peut mdoifier  */}
        <TextInput
          style={styles.textInput}
          placeholder="Email du user"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        ></TextInput>
        <TextInput
          style={[styles.textInput, styles.multiline]}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        ></TextInput>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Log Out"
          onPress={() => {
            setToken(null);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 70,
  },

  button: {
    borderWidth: 2,
    borderColor: "#EB5A62",
    borderRadius: 30,
    marginVertical: 15,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#717171",
    fontWeight: "bold",
  },
  avatarBlock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatar: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    borderColor: "#EB5A62",
    borderWidth: 3,
    marginRight: 25,
    borderRadius: "100%",
  },
  textInput: {
    color: "#C4C4C6",
    borderBottomWidth: 1,
    borderColor: "#EB5A62",
    fontSize: 15,
    marginVertical: 10,
    paddingBottom: 15,
  },
  multiline: {
    borderWidth: 1,
    height: 100,
    paddingTop: 10,
    paddingLeft: 10,
  },
  avatar: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    borderColor: "#EB5A62",
    borderWidth: 3,
    marginRight: 25,
    borderRadius: "100%",
    marginBottom: 10,
  },
});
