import { Image, Text, TouchableOpacity, View } from "react-native";

export function HomeCategory() {
  const categories = [
    {
      id: 1,
      title: "Đồ ăn",
      link: "",
      image: require("../assets/images/category/icon-food.png"),
      isCustomIcon: false,
    },
    {
      id: 2,
      title: "Đặt xe",
      link: "",
      image: require("../assets/images/category/transport.png"),
      isCustomIcon: false,
    },
    {
      id: 3,
      title: "Khách sạn",
      link: "",
      image: require("../assets/images/category/hotel.png"),
      isCustomIcon: false,
    },
    {
      id: 4,
      title: "Giao hàng",
      link: "",
      image: require("../assets/images/category/delivery.png"),
      isCustomIcon: false,
    },
    {
      id: 5,
      title: "Đi chợ",
      link: "",
      image: require("../assets/images/category/market.png"),
      isCustomIcon: false,
    },
    {
      id: 6,
      title: "Quà tặng",
      link: "",
      image: require("../assets/images/category/gift.png"),
      isCustomIcon: false,
    },
    {
      id: 7,
      title: "Bảo hiểm",
      link: "",
      image: require("../assets/images/category/insurance.png"),
      isCustomIcon: false,
    },
    {
      id: 8,
      title: "Tất cả",
      isCustomIcon: true,
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {categories.map((item) => (
        <View
          key={item.id}
          style={{
            width: "25%",
            aspectRatio: 1,
            padding: 3,
            marginLeft: -3,
            marginRight: -3,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              alignItems: "center",
              backgroundColor: "rgba(153, 224, 185, 0.1)",
            }}
            className="rounded-xl"
          >
            {!item.isCustomIcon ? (
              <View>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                  }}
                  source={item.image}
                />
              </View>
            ) : (
              <View
                style={{
                  width: 36,
                  height: 36,
                  marginBottom: 3,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 5,
                    backgroundColor: "#18804B",
                    margin: 1,
                  }}
                />
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 5,
                    backgroundColor: "#22B15D",
                    margin: 1,
                  }}
                />
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 5,
                    backgroundColor: "#18804B",
                    margin: 1,
                  }}
                />
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 5,
                    backgroundColor: "#22B15D",
                    margin: 1,
                  }}
                />
              </View>
            )}
            <Text
              style={{
                fontSize: 10,
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
