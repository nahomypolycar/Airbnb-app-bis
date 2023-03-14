import logoImage from "../assets/logo-airbnb.png";
import { Image } from "react-native";
import { StyleSheet } from "react-native";

const HeaderLogo = () => {
  return <Image style={styles.logoImg} source={logoImage} />;
};

export default HeaderLogo;

const styles = StyleSheet.create({
  logoImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    alignItems: "center",
  },
});
