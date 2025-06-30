import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DestinationScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 32,
        }}
        className="bg-primary/20"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-3 items-center">
            <TouchableOpacity onPress={() => router.replace("/home")}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-medium">Di chuyển</Text>
          </View>
          <TouchableOpacity className="p-2 px-5 bg-white/40 blur-lg rounded-full flex-row items-center gap-2">
            <Feather name="map" size={16} color="black" />
            <Text className="text-sm font-medium">Bản đồ</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between">
          <Text className="whitespace-break-spaces max-w-[50%] mt-3">
            Bạn muốn đi đâu nào? Đặt xe đi ngay thôi!
          </Text>
          <Image
            source={require("../../assets/images/taxi-sticker.png")}
            className="w-32 h-32 object-contain"
          ></Image>
        </View>

        <View
          style={{
            transform: [{ translateY: "50%" }],
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
          className="absolute z-10 left-4 right-4 bottom-0 flex-row items-center w-full bg-white p-6 py-2 gap-2 rounded-2xl"
        >
          <Image
            style={{
              objectFit: "contain",
            }}
            source={require("../../assets/images/location.png")}
            className="w-7 h-7"
          ></Image>
          <Text className="flex-1 text-gray-400 py-3">Bạn muốn đến đâu ?</Text>
        </View>
      </View>

      {/*  */}
      <View
        style={{
          paddingTop: 50,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <View className="gap-3">
          {Array.from({ length: 3 }).map((item, idx) => (
            <View key={idx} className="flex-row items-center gap-3">
              <View className="items-center justify-center rounded-full w-12 h-12 bg-primary/10">
                <Image
                  style={{
                    objectFit: "contain",
                  }}
                  source={require("../../assets/images/location-v2.png")}
                  className="w-6 h-6"
                ></Image>
              </View>
              <View className="flex-1 max-w-full">
                <Text className="font-medium line-clamp-1">
                  Bến xe liên tỉnh Bến xe liên tỉnh Bến xe liên tỉnh Bến xe liên
                  tỉnh Bến xe liên tỉnh Bến xe liên tỉnh Bến xe liên tỉnh Bến xe
                  liên tỉnh Bến xe liên tỉnh
                </Text>
                <Text className="text-sm text-gray-500 line-clamp-1">
                  43 Lý Nam Đế 43 Lý Nam Đế 43 Lý Nam Đế 43 Lý Nam Đế 43 Lý Nam
                  Đế 43 Lý Nam Đế 43 Lý Nam Đế 43 Lý Nam Đế 43 Lý Nam Đế
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-5">
          <Text className="font-medium text-xl">
            Đa dạng lựa chọn di chuyển cho bạn
          </Text>

          <View className="flex-1 flex-row mt-5 gap-3">
            <View
              style={{
                flexGrow: 1,
              }}
              className="h-44 bg-[#B3ECFF] rounded-2xl justify-between"
            >
              <Text className="font-medium absolute top-3 left-3">
                Đặt xe trước
              </Text>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/images/calendar.png")}
                className="absolute bottom-4 right-4"
              />
            </View>

            <View
              style={{
                flexGrow: 1,
              }}
              className="flex-col h-44 rounded-2xl gap-3"
            >
              <View
                style={{
                  flexGrow: 1,
                }}
                className="bg-[#FDEC92] rounded-2xl"
              >
                <Text
                  style={{
                    transform: [{ translateY: "-50%" }],
                  }}
                  className="absolute top-1/2 left-4 font-medium"
                >
                  Đặt xe cho{"\n"}Gia Đình
                </Text>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    transform: [{ translateY: "-50%" }],
                  }}
                  source={require("../../assets/images/family.png")}
                  className="absolute right-4 top-1/2"
                />
              </View>
              <View
                style={{
                  flexGrow: 1,
                }}
                className="bg-[#B3ECFF] rounded-2xl"
              >
                <Text
                  style={{
                    transform: [{ translateY: "-50%" }],
                  }}
                  className="absolute top-1/2 left-4 font-medium"
                >
                  Di chuyển{"\n"}theo nhóm
                </Text>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    transform: [{ translateY: "-50%" }],
                  }}
                  source={require("../../assets/images/car.png")}
                  className="absolute right-4 top-1/2"
                />
              </View>
            </View>
          </View>

          <View className="flex-1 h-20 mt-3 w-full flex-row gap-3">
            <View className="flex-1 bg-[#B3ECFF] rounded-2xl">
              <Text
                style={{
                  transform: [{ translateY: "-50%" }],
                }}
                className="absolute top-1/2 left-4 font-medium"
              >
                Đón xe ở{"\n"}sân bay
              </Text>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  transform: [{ translateY: "-50%" }],
                }}
                source={require("../../assets/images/airplane.png")}
                className="absolute right-4 top-1/2"
              />
            </View>
            <View className="flex-1 bg-[#DFF68C] rounded-2xl">
              <Text
                style={{
                  transform: [{ translateY: "-50%" }],
                }}
                className="absolute top-1/2 left-4 font-medium"
              >
                Thuê xe {"\n"}cùng tài xế
              </Text>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  transform: [{ translateY: "-50%" }],
                }}
                source={require("../../assets/images/taxi-driver.png")}
                className="absolute right-4 top-1/2"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
