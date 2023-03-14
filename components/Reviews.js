import { AntDesign } from "@expo/vector-icons";

const reviewsStars = (rate) => {
  const tab = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rate) {
      tab.push(<AntDesign name="star" size={24} color="#FFB100" key={i} />);
    } else {
      tab.push(<AntDesign name="star" size={24} color="#BBBBBB" key={i} />);
    }
  }
  return tab;
};

export default reviewsStars;
