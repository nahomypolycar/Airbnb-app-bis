import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import reviewsStars from "../components/Reviews";
import Swiper from "react-native-swiper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

export default function RoomScreen() {
  const route = useRoute();
  const [room, setRoom] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [coords, setCoords] = useState("");
  const { id } = route.params;
  const [error, setError] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [display, setDisplay] = useState(3);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        setRoom(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchdata();
    console.log("c'est la room", room.photos.length);
  }, []);

  useEffect(() => {
    const askPermissionToGetCoords = async () => {
      try {
        // Demande de permission d'accéder à la localisation du téléphone
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          // Récupération des coordonnées
          const { coords } = await Location.getCurrentPositionAsync();

          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
        } else {
          alert(" Permission denied");
        }
      } catch (error) {
        console.log("error location", error.response);
      }
    };
    askPermissionToGetCoords();
  }, []);

  return isLoading ? (
    <Text>En cours de chargement </Text>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Swiper style={{ horizontal: false, height: 250, autoplay: true }}>
            {room.photos.map((photo) => {
              return (
                <ImageBackground
                  source={{ uri: photo.url }}
                  style={styles.imageBg}
                  key={photo.picture_id}
                >
                  <View style={styles.priceTag}>
                    <Text style={styles.price}>{room.price} € </Text>
                  </View>
                </ImageBackground>
              );
            })}
          </Swiper>

          <View style={styles.roomsInfo}>
            <View>
              <Text style={styles.roomsTitle}>{room.title} </Text>
              <View style={styles.reviews}>
                <Text>{reviewsStars(room.ratingValue)}</Text>
                <Text style={styles.reviewsNbr}>{room.reviews} reviews</Text>
              </View>
            </View>

            <Image
              source={{ uri: room.user.account.photo.url }}
              style={styles.avatar}
            />
          </View>
          <Text numberOfLines={display}>{room.description}</Text>
          {display === 3 ? (
            <TouchableOpacity
              onPress={() => {
                setDisplay(0);
              }}
            >
              <Text>Show more</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setDisplay(3);
              }}
            >
              <Text>Show less</Text>
              <MaterialIcons name="arrow-drop-up" size={24} color="black" />
            </TouchableOpacity>
          )}

          <View>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 48.856614,
                longitude: 2.3522219,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{
                  longitude: room.location[0],
                  latitude: room.location[1],
                }}
              />
            </MapView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infotest: {
    color: "red",
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  // ------------------- ROOMS --------------------

  flatlist: {
    paddingHorizontal: 20,
  },
  imageBg: {
    width: "100%",
    height: 250,
  },
  priceTag: {
    backgroundColor: "black",
    width: 70,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  roomsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#BBBBBB",
    marginBottom: 20,
  },
  roomsTitle: {
    fontSize: 16,
  },
  reviews: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  reviewsNbr: {
    paddingLeft: 10,
  },
  text: {
    color: "green",
    fontSize: 30,
    fontWeight: "bold",
  },
  // --------------------------MAP--------------------------------
  map: {
    width: "100%",
    height: 250,
  },
  // -------------------------SWIPPER
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
});
