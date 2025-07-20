import {
  AntDesign,
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BookingDetails() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#f4f4f5" }}>
        {/* HEADER */}
        <View
          style={{
            paddingTop: insets.top + 10,
          }}
          className="flex-row items-center justify-between p-4 bg-white"
        >
          <View className="flex-row items-center gap-4">
            <Pressable onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <Text className="text-xl font-medium">Chi tiết chuyến đi</Text>
          </View>
          <Pressable>
            <Text className="font-bold text-blue-500">Xóa</Text>
          </Pressable>
        </View>

        <ScrollView className="pt-2">
          {/* DRIVER INFO */}
          <View className="p-4 bg-white mb-2 flex-row justify-between items-center">
            <View>
              <Text className="text-lg">Nguyen Ba Phuoc</Text>
              <View
                style={{ marginBottom: 6 }}
                className="flex-row gap-2 items-center"
              >
                <Text style={{ fontSize: 10 }} className="text-zinc-800">
                  HONDA
                </Text>
                <Text style={{ fontSize: 10 }} className="text-zinc-800">
                  |
                </Text>
                <Text style={{ fontSize: 10 }} className="text-zinc-800">
                  FUTURE
                </Text>
              </View>
              <View className="bg-zinc-200 p-1">
                <Text style={{ fontSize: 12, textAlign: "center" }}>
                  77E1 - 184.62
                </Text>
              </View>
            </View>
            <View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10000,
                  objectFit: "contain",
                }}
                source={require("../../assets/images/avatar-default.jpg")}
              />
              <View
                style={{
                  width: 40,
                  position: "absolute",
                  bottom: -1,
                  left: "50%",
                  transform: [{ translateX: "-50%" }],
                  elevation: 2,
                }}
                className="bg-white flex-row items-center justify-center gap-1 rounded"
              >
                <Text style={{ fontSize: 12 }}>5</Text>
                <AntDesign name="star" size={10} color="black" />
              </View>
            </View>
          </View>

          {/* SCHEDULE INFO */}
          <View className="p-4 bg-white mb-2">
            <View className="border border-primary/50 rounded-lg overflow-hidden">
              {/* SCHEDULE INFO HEADER */}
              <View className="flex-row justify-between items-start bg-primary/10 p-3 gap-3">
                <Image
                  style={{
                    marginVertical: "auto",
                    width: 30,
                    height: 30,
                    objectFit: "contain",
                  }}
                  source={require("../../assets/images/calendar-v2.png")}
                ></Image>
                <View className="flex-1 mx-auto">
                  <Text className="text-sm font-semibold">
                    Lên lịch di chuyển
                  </Text>
                  <Text className="text-xs text-zinc-500">
                    Đặt lịch theo lịch trình của bạn
                  </Text>
                </View>
                <View className="p-1 px-3 bg-primary/80 rounded-md">
                  <Text className="text-sm text-white font-medium">
                    Khám phá ngay
                  </Text>
                </View>
              </View>

              <View className="p-3 border-b border-zinc-100">
                <View className="flex-row items-center gap-2 mb-2">
                  <View className="bg-blue-400 aspect-square w-4 rounded-full flex-row items-center justify-center">
                    <FontAwesome6
                      name="child-reaching"
                      size={8}
                      color="white"
                    />
                  </View>
                  <Text className="line-clamp-1 flex-1 text-sm">
                    195 Nguyễn Xí
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="bg-yellow-400 aspect-square w-4 rounded-full flex-row items-center justify-center">
                    <FontAwesome6 name="location-dot" size={8} color="white" />
                  </View>
                  <Text className="line-clamp-1 flex-1 text-sm">
                    498 Dương Quảng Hàm
                  </Text>
                </View>
              </View>

              <View className="p-3 flex-row items-center">
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={14}
                  style={{ marginRight: 6 }}
                />
                <Text className="text-xs">15:15</Text>
                <Entypo name="dot-single" size={14} color="black" />
                <Text className="text-xs">T2</Text>
              </View>
            </View>
          </View>

          {/* SUMMARY */}
          <View className="p-4 bg-white mb-2">
            <View className="gap-2 border-b border-zinc-100 pb-3">
              <Text style={{ fontWeight: 500, fontSize: 16 }}>Thanh toán</Text>
              <View className="flex-row justify-between">
                <Text style={styles.summaryTitle}>Cước phí</Text>
                <Text style={styles.summaryTitle}>15.000đ</Text>
              </View>
              <View className="flex-row justify-between">
                <Text style={styles.summaryTitle}>Khuyến mãi</Text>
                <Text style={styles.summaryTitle}>-0đ</Text>
              </View>
              <View className="flex-row justify-between">
                <Text style={styles.summaryTitle}>Bảo hiểm chuyến đi</Text>
                <Text style={styles.summaryTitle}>1000đ</Text>
              </View>
            </View>
            <View className="pt-3 flex-row justify-between items-center">
              <Text style={[styles.summaryTitle, { fontWeight: 500 }]}>
                Tổng tiền
              </Text>
              <Text style={[styles.summaryTitle, { fontWeight: 500 }]}>
                16.000đ
              </Text>
            </View>
          </View>

          {/* RIDE INFO */}
          <View className="p-4 bg-white">
            <Text className="font-medium text-lg">
              Mã chuyến đi: 987654323456
            </Text>
            <Text className="text-xs text-zinc-500 py-1">
              20/7/2025 | 15:15
            </Text>

            <View className="flex-row items-center gap-1 py-5 border-b border-zinc-100">
              <View className="aspect-square w-5 rounded-full flex-row items-center justify-center">
                <FontAwesome6 name="child-reaching" size={14} color="black" />
              </View>
              <Text className="line-clamp-1 flex-1 font-medium">
                195 Nguyễn Xí
              </Text>
            </View>
            <View className="flex-row items-center gap-1 py-5">
              <View className="aspect-square w-5 rounded-full flex-row items-center justify-center">
                <FontAwesome6 name="location-dot" size={14} color="#facc15" />
              </View>
              <Text className="line-clamp-1 flex-1 font-medium">
                498 Dương Quảng Hàm
              </Text>
            </View>

            {/*  */}
            <Pressable className="bg-zinc-200 rounded-lg p-3">
              <Text className="text-center font-medium">Bạn cần hổ trợ ?</Text>
            </Pressable>

            {/*  */}
            <View
              style={{
                height: Dimensions.get("screen").height * 0.2,
              }}
            ></View>
          </View>
        </ScrollView>

        {/* CONTROL */}
        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            elevation: 5,
          }}
          className="h-20 items-center justify-center px-4 py-2 bg-white"
        >
          <Pressable className="w-full bg-primary rounded-lg p-4">
            <Text className="text-white font-medium text-center">Đặt lại</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryTitle: {
    fontSize: 14,
    color: "black",
  },
});
