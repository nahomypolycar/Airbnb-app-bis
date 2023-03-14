import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import reviewsStars from "../components/Reviews";
import Swiper from "react-native-swiper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

export default function RoomScreen() {
  const route = useRoute();
  const [room, setRoom] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [coords, setCoords] = useState("");
  const { id } = route.params;
  const [error, setError] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

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
    console.log("c'est la room", room);
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
          <ImageBackground
            source={{ uri: room.photos[0].url }}
            style={styles.imageBg}
          >
            <View style={styles.priceTag}>
              <Text style={styles.price}>{room.price} € </Text>
            </View>
          </ImageBackground>

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
          <Text>{room.description}</Text>
          <View>
            <Text>Latitude : {room.location[0]}</Text>
            <Text>Longitude : {room.location[1]}</Text>
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
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  // --------------------------MAP--------------------------------
  map: {
    width: "100%",
    height: 250,
  },
});
