import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Review() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const screen = Dimensions.get("window");
  const [rating, setRating] = useState<number>(0);

  const handleRatingCompleted = (rate: number) => {
    setRating(rate);
  };

  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View
        style={{
          position: "absolute",
          top: insets.top,
          left: 16,
          right: 16,
        }}
        className="flex-row justify-between items-center"
      >
        <Pressable onPress={() => router.replace("/(tabs)/home")}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </Pressable>
        <Text className="text-lg text-white font-semibold">Đánh giá</Text>
        <Text className="w-6" />
      </View>

      {/* Content */}
      <View
        style={[
          styles.contentContainer,
          { top: insets.top + screen.height * 0.14, bottom: insets.bottom },
        ]}
        className="p-4"
      >
        <View className="bg-white flex-1 rounded-lg">
          {/* Avatar */}
          <Image
            style={styles.avatar}
            source={require("../../assets/images/avatar-default.png")}
          />

          {/* Nội dung */}
          <View style={styles.content} className="items-center px-4">
            <Text className="font-medium">Nguyen Ba Phuoc</Text>
            <Text className="text-xl text-center font-medium px-10 mt-6">
              Bạn có hài lòng về chuyến đi của mình không ?
            </Text>
            <Text className="text-sm text-zinc-500 px-2 mt-2 text-center">
              Đánh giá sẽ giúp nâng cao trải nghiệm của chuyến đi cho những lần
              sau
            </Text>
          </View>

          <View className="flex-row items-center justify-center mt-5 gap-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Pressable
                key={idx}
                onPress={() => handleRatingCompleted(idx + 1)}
              >
                <AntDesign
                  name="star"
                  size={40}
                  color={idx + 1 <= rating ? "#FFCC00" : "#EFEFF4"}
                />
              </Pressable>
            ))}
          </View>

          <View className="flex-1 p-5">
            <View
              style={{ borderRadius: 8 }}
              className="flex-1 p-3 bg-[#EFEFF2]"
            >
              <TextInput
                multiline
                className="flex-1 placeholder:text-gray-400"
                placeholder="Thêm đánh giá tại đây"
                style={{
                  textAlignVertical: "top",
                }}
              />
            </View>
          </View>

          <Pressable className="px-5 pb-5">
            <View className="w-full p-3 rounded-lg bg-primary">
              <Text className="text-white text-center font-medium">
                Đánh giá
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10000,
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateY: -50 }, { translateX: -50 }],
  },
  content: {
    marginTop: 60,
  },
});
