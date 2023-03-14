import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const CustomGoback = () => {
  const navigation = useNavigation();
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      color="gray"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default CustomGoback;
