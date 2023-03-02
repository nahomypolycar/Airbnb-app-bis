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

export default function HomeScreen() {
  const navigation = useNavigation();

  const data = "toto";

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome </Text>
        {/* <Button
      title="Go to Profile"
      onPress={() => {
        navigation.navigate("Profile", { userId: 123 });
      }}
    /> */}
      </View>
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
