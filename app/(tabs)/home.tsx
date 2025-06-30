import BannerCarousel from "@/components/BannerCarousel";
import CardList from "@/components/CardList";
import { HomeCategory } from "@/components/HomeCategory";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCROLL_THRESHOLD = 10;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const shouldScroll = offsetY > SCROLL_THRESHOLD;

      if (shouldScroll !== isScrolled) {
        setIsScrolled(shouldScroll);
      }
    },
    [isScrolled]
  );

  const containerStyle = useMemo(
    () => `flex-1 ${isScrolled ? "bg-white" : "bg-primary"}`,
    [isScrolled]
  );

  const HeaderContent = useMemo(
    () => (
      <View className="bg-primary w-full flex-row items-center gap-3 px-4 py-3">
        <TouchableOpacity activeOpacity={0.7} className="relative">
          <View className="bg-white/40 rounded-full w-12 h-12" />
          <MaterialCommunityIcons
            style={{
              transform: [{ translateX: -10 }, { translateY: -10 }],
            }}
            name="line-scan"
            size={20}
            color="#fff"
            className="absolute top-1/2 left-1/2"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/location/fallback")}
          className="flex-1 bg-white p-[9px] rounded-xl flex-row items-center gap-2 shadow-lg"
        >
          <EvilIcons name="search" size={24} color="gray" className="pb-1" />
          <Text className="text-gray-400 text-base">Tìm địa điểm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          className="border border-zinc-200 rounded-full overflow-hidden"
        >
          <Image
            source={require("../../assets/images/man.png")}
            className="w-11 h-11 rounded-full"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    ),
    []
  );

  return (
    <View style={{ paddingTop: insets.top }} className={containerStyle}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}
        className="flex-1"
      >
        {HeaderContent}
        <View className="flex-1 p-4 bg-white">
          <HomeCategory />
          {/*  */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginLeft: -4,
              marginRight: -4,
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 4,
              }}
            >
              <View className="border border-gray-200 rounded-xl p-3">
                <Text className="text-gray-500 text-sm">Thanh toán</Text>
                <View className="flex-row justify-between">
                  <Text>Thêm thẻ</Text>
                  <FontAwesome
                    name="credit-card-alt"
                    size={18}
                    color="#58bc6b"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 4,
              }}
            >
              <View className="border border-gray-200 rounded-xl p-3">
                <Text className="text-gray-500 text-sm">GoPeeRewards</Text>
                <View className="flex-row justify-between">
                  <Text>0</Text>
                  <Image
                    source={require("../../assets/images/coin.png")}
                    className="w-5 h-5 object-contain"
                  ></Image>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/*  */}
          <BannerCarousel />
          <CardList />
        </View>
      </ScrollView>
    </View>
  );
}
