import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PaymentMethod() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
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
        <Text className="text-xl font-medium">Phương thức thanh toán</Text>
      </View>

      <View>
        <Text className="font-medium text-lg">
          Các phương thức được liên kết
        </Text>
        <Text className="text-gray-600">Quét sang trái để làm mặc định</Text>
      </View>

      <View>
        <Pressable className="flex-row items-center justify-between py-6">
          <View className="flex-row items-center gap-4">
            <View className="w-10 h-10 items-center justify-center rounded-full bg-primary/10">
              <Foundation name="dollar-bill" size={20} color="green" />
            </View>
            <Text>Tiền mặt</Text>
          </View>
          <MaterialCommunityIcons
            name="record-circle"
            size={24}
            color="rgb(88 188 107)"
          />
        </Pressable>
        <View>
          <Text className="text-xl font-medium my-4">Add Methods</Text>

          <Pressable className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 items-center justify-center rounded-full bg-primary/10">
                <AntDesign name="creditcard" size={15} color="green" />
              </View>
              <Text>Thẻ tín dụng</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </Pressable>

          <Pressable className="flex-row items-center justify-between py-4">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 items-center justify-center rounded-full overflow-hidden">
                <Image
                  source={require("../../assets/images/payment-methods/momo.png")}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <Text>Momo</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
