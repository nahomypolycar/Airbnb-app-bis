import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import reviewsStars from "../components/Reviews";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setRooms(data);
      } catch (error) {
        console.log(error.response);
      }
      setisLoading(false);
    };
    fetchdata();
  }, []);

  return isLoading ? (
    <Text>loading</Text>
  ) : (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Room", { id: item._id })}
            >
              <ImageBackground
                source={{ uri: item.photos[0].url }}
                style={styles.imageBg}
              >
                <View style={styles.priceTag}>
                  <Text style={styles.price}>{item.price} € </Text>
                </View>
              </ImageBackground>
              <View style={styles.roomsInfo}>
                <View>
                  <Text style={styles.roomsTitle}>{item.title} </Text>
                  <View style={styles.reviews}>
                    <Text>{reviewsStars(item.ratingValue)}</Text>
                    <Text style={styles.reviewsNbr}>
                      {item.reviews} reviews
                    </Text>
                  </View>
                </View>
                <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={styles.avatar}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        style={styles.flatlist}
      >
        <View>
          <Text>Welcome </Text>
        </View>
      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 130,
    width: 150,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 30,
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
});
