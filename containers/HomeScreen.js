import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Flatlist,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

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

  return (
    <SafeAreaView style={styles.container}>
      <Flatlist
        data={rooms}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      >
        <View>
          <Text>Welcome </Text>
          {/* <Button
      title="Go to Profile"
      onPress={() => {
        navigation.navigate("Profile", { userId: 123 });
      }}
    /> */}
        </View>
      </Flatlist>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 130,
    width: 150,
    resizeMode: "contain",
    marginTop: 120,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 30,
  },
});
