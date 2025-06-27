import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const screenWidth = Dimensions.get("window").width;
const CARD_WIDTH = screenWidth * 0.4;
const CARD_SPACING = 12;

const data = [
  {
    id: "1",
    title: "Cơm Bì Chả - Đồng giá 1.000đ",
    image: require("../assets/images/poster/aspect_square/1.jpeg"),
  },
  {
    id: "2",
    title: "Bánh Mì Ơi - Khao nửa giá",
    image: require("../assets/images/poster/aspect_square/2.jpeg"),
  },
  {
    id: "3",
    title: "Đặt sữa định kỳ - Ưu đãi độc quyền",
    image: require("../assets/images/poster/aspect_square/3.jpeg"),
  },
  {
    id: "4",
    title: "Grab góp deal thích mê",
    image: require("../assets/images/poster/aspect_square/4.jpeg"),
  },
  {
    id: "5",
    title: "9.9 - Ngày đôi, ưu đãi nhân đôi",
    image: require("../assets/images/poster/aspect_square/5.jpeg"),
  },
  {
    id: "6",
    title: "Bánh trung thu - Giá ở vạch đích",
    image: require("../assets/images/poster/aspect_square/6.jpeg"),
  },
];

const CardList = () => {
  return (
    <View style={{ marginTop: 10 }}>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl">Khuyễn mãi mỗi ngày</Text>
        <AntDesign name="arrowright" size={18} color="black" />
      </View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 15,
        }}
        ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <Text
              style={{ paddingTop: 5, color: "#4b5563" }}
              className="line-clamp-1"
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
  },
  image: {
    width: "100%",
    height: CARD_WIDTH,
    borderRadius: 10,
  },
});

export default CardList;
