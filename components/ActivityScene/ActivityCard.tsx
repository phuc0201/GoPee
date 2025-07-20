import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface ActivityCardProps {
  isActive?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ isActive = false }) => {
  return (
    <>
      <View
        style={{
          marginBottom: 10,
          borderColor: "#e4e4e7",
        }}
        className="rounded-lg bg-white border"
      >
        <View
          style={{
            paddingHorizontal: 13,
            paddingTop: 12,
            alignItems: "flex-start",
          }}
          className="flex-row justify-between"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center">
              <Image
                source={require("../../assets/images/vehicle/suv.png")}
                style={{
                  width: 20,
                  height: 20,
                  objectFit: "contain",
                }}
              ></Image>
            </View>
            <View className="">
              <View className="flex-row items-center">
                <Text className="text-sm text-gray-400">14/7/2025</Text>
                <Entypo name="dot-single" size={18} color="#9ca3af" />
                <Text className="text-sm text-gray-400">11:59</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-700 font-bold">90.000 đ</Text>
                <Entypo name="dot-single" size={18} color="#9ca3af" />
                <Text className="text-sm text-gray-400 font-medium">GoCar</Text>
              </View>
            </View>
          </View>

          <View
            className={`p-1 px-4 h-fit rounded-full ${isActive ? "" : "bg-primary/10"}`}
          >
            <Text
              style={{
                fontSize: 12,
                color: isActive ? "#EA950C" : "#00b14f",
              }}
            >
              {isActive ? "Đang thực hiện" : "Hoàn thành"}
            </Text>
          </View>
        </View>

        {/*  */}
        <View className="flex-row items-center border-b border-gray-100 p-4">
          <View className="flex-col items-center">
            <View className="relative flex-row">
              <FontAwesome6 name="dot-circle" size={14} color="#00b14f" />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  position: "absolute",
                  top: -1,
                  left: 20,
                  maxWidth: 200,
                  flexShrink: 1,
                }}
                className="line-clamp-1 text-sm"
              >
                Lê Tuấn Mậu Lê Tuấn Mậu Lê Tuấn Mậu
              </Text>
            </View>

            <View
              style={{ width: 1, height: 6, backgroundColor: "#9ca3af" }}
            ></View>

            <View className="relative flex-row items-center">
              <FontAwesome6 name="location-dot" size={17} color="#F52D56" />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 20,
                  maxWidth: 200,
                  flexShrink: 1,
                }}
                className="line-clamp-1 text-sm"
              >
                Lê Tuấn Mậu Lê Tuấn Mậu Lê Tuấn Mậu
              </Text>
            </View>
          </View>

          <View
            style={{
              width: 16,
              height: 16,
              position: "absolute",
              bottom: "0%",
              left: "52.5%",
              transform: [{ translateY: "50%" }],
            }}
          >
            <Image
              source={require("../../assets/images/hexagonal.png")}
              className="w-full h-full object-cover"
            ></Image>

            <Ionicons
              style={{
                position: "absolute",
                top: 5,
                left: "30%",

                transform: [{ rotate: "180deg" }],
              }}
              name="triangle-sharp"
              size={7}
              color="white"
            />
          </View>
        </View>

        {/*  */}
        <View
          style={{
            justifyContent: isActive ? "flex-end" : "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
          className="p-4 py-2"
        >
          <Link
            href={{
              pathname: "/booking/[id]",
              params: { id: 1 },
            }}
            asChild
          >
            <Text className="text-gray-500 text-sm">Xem chi tiết</Text>
          </Link>
          {!isActive && (
            <Pressable
              style={{
                borderRadius: 4,
              }}
              className="px-4 p-1 bg-primary"
            >
              <Text className="text-white font-medium text-sm">Đặt lại</Text>
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

export default ActivityCard;
