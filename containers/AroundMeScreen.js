import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import axios from "axios";

const AroundMe = () => {
  // state pour recevoir la permission + state error + state isLoading

  const [isLoading, setisLoading] = useState(true);
  const [coordinates, setCoordinates] = useState([
    48.84308872908949, 2.4052953605883602,
  ]);
  const [rooms, setRooms] = useState([]);

  // useState pour recevoir la permission et recevoir les coordonées

  useEffect(() => {
    const askPermissionToGetCoords = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const { coords } = await Location.getCurrentPositionAsync();
          setCoordinates([coords.latitude, coords.longitude]);
          console.log("coords around me page >>>>>", coords);

          const { data } = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${coords.latitude}&longitude=${coords.longitude}`
          );
          setRooms(data);
          console.log("rooms data >>>>", data);
        } else {
          alert(" Permission denied");
          const { data } = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around`
          );
        }
      } catch (error) {
        console.log(error.response);
      }

      setisLoading(false);
    };

    askPermissionToGetCoords();
  }, []);

  return isLoading ? (
    <Text>En cours de chargement !</Text>
  ) : (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coordinates[0],
          longitude: coordinates[1],
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        {rooms.map((room) => {
          return (
            <Marker
              key={room._id}
              coordinate={{
                latitude: room.location[1],
                longitude: room.location[0],
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default AroundMe;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
