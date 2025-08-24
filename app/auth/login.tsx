import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="bg-primary flex-1">
      <Pressable
        onPress={() => router.back()}
        style={{
          top: insets.top,
          paddingTop: 10,
          left: 20,
        }}
      >
        <MaterialIcons name="arrow-back-ios" size={22} color="white" />
      </Pressable>

      {/*  */}
      <View
        style={{
          paddingTop: insets.top + 100,
        }}
        className="items-center justify-between flex-1"
      >
        <View className="items-center">
          <Text className="font-bold text-6xl text-white">GoPee</Text>
          <Text className="text-white max-w-60 text-center mt-3">
            Siêu ứng dụng đáp ứng mọi nhu cầu hàng ngày
          </Text>
        </View>
        {/*  */}
        <View className="flex-1 w-full p-6 justify-between">
          <View></View>
          <View>
            <Pressable className="bg-white mb-4 p-4 px-6 rounded-full flex-row items-center justify-between gap-2">
              <FontAwesome6 name="facebook" size={24} color="#0866FF" />
              <Text className="font-medium">Tiếp tục với Facebook</Text>
              <Text></Text>
            </Pressable>
            <Pressable className="bg-white p-4 px-6 rounded-full flex-row items-center justify-between gap-2">
              <Image
                style={{
                  width: 24,
                  height: 24,
                  objectFit: "contain",
                }}
                source={require("../../assets/images/google.png")}
              />
              <Text className="font-medium">Tiếp tục với Google</Text>
              <Text></Text>
            </Pressable>

            <View className="flex-row items-center gap-5 py-7">
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: "#fff",
                }}
              ></View>
              <Text className="text-white">hoặc</Text>
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: "#fff",
                }}
              ></View>
            </View>

            <Pressable
              onPress={() => router.push("/auth/login-with-phone")}
              className="bg-white p-4 px-6 rounded-full flex-row items-center justify-between gap-2"
            >
              <FontAwesome6 name="phone" size={21} color="black" />
              <Text className="font-medium">Tiếp tục với số điện thoại</Text>
              <Text></Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View></View>
    </View>
  );
}
