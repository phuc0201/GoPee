import Coupons from "@/dummy-data/coupon";
import { Coupon } from "@/models/promotion.model";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Promotions() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [coupons, setCoupons] = useState<Coupon[]>(Coupons);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View className="flex-row items-center gap-4 py-4">
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text className="text-xl font-medium">Ưu đãi</Text>
      </View>
      <View>
        <TextInput
          placeholder="Nhập mã khuyến mãi hoặc mã quà tặng tại đây"
          className="p-4 bg-gray-100 rounded-lg placeholder:text-gray-400 px-5"
        ></TextInput>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="mt-1 flex-1">
        {coupons.length === 0 ? (
          <View className="items-center mt-20">
            <Image
              style={{ width: 150, height: 150, opacity: 0.4 }}
              source={require("../../assets/images/gift-voucher.png")}
            ></Image>
            <Text className="text-gray-400 text-center">
              🎉 Chưa có ưu đãi nào 🎉
            </Text>
          </View>
        ) : (
          coupons.map((coupon, idx) => (
            <View
              key={coupon.id}
              className={`p-5 px-2 flex-row items-center gap-4${idx !== coupons.length - 1 ? " border-b border-gray-200" : ""}`}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                }}
                source={coupon.image}
              ></Image>
              <View className="flex-1">
                <Text className="text-lg font-medium">{coupon.title}</Text>
                <Text className="text-gray-500">{coupon.description}</Text>
              </View>
              <Pressable>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="#4b5563"
                />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
