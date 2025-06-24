import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function AutoGetLocation() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
      }}
    >
      <View className="flex-1 flex justify-between items-center py-20 px-5">
        <View>
          <Text className="text-4xl">
            Rất tiếc, chúng tôi không thể xác định vị trí của bạn
          </Text>
          <Text className="text-gray-500">
            Vui lòng cập nhật địa chỉ của bạn bằng cách thủ công để có thể tiếp
            tục sử dụng ứng dụng
          </Text>
          <View className="my-16">
            <Image
              className="object-cover w-52 h-56 m-auto"
              source={require("../../assets/images/location.png")}
            />
          </View>
        </View>
        <Pressable
          className="bg-primary rounded-full p-4 w-full flex items-center justify-center"
          onPress={() => router.replace("/location/fallback")}
        >
          <Text className="text-white text-xl">Cập nhật vị trí</Text>
        </Pressable>
      </View>
    </View>
  );
}
