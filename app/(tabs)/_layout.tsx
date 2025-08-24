import { AuthService } from "@/services/auth.service";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function TabsLayout() {
  const authService = new AuthService();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogged = async () => {
      const token = await authService.getRefreshToken();
      setIsLogin(token ? true : false);
    };

    checkLogged();
  }, []);

  return (
    <>
      {!isLogin && (
        <View
          style={{
            elevation: 4,
            zIndex: 1000,
          }}
          className="absolute bottom-0 left-0 right-0 px-4 py-6 flex-row justify-between bg-white rounded-t-3xl gap-3"
        >
          <Pressable
            className="flex-1 py-4 rounded-full bg-primary/10 items-center"
            onPress={() => setIsLogin(true)}
          >
            <Text className="text-green-800 font-semibold">Đăng ký</Text>
          </Pressable>
          <Pressable
            onPressIn={() => router.push("/auth/login")}
            className="flex-1 py-4 rounded-full bg-primary items-center"
            onPress={() => console.log("Đăng nhập")}
          >
            <Text className="text-white font-semibold">Đăng nhập</Text>
          </Pressable>
        </View>
      )}
      <View className="flex-1">
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#00b14f",
            tabBarButton: (props) => {
              const { children, ...rest } = props as any;
              return <Pressable {...rest}>{children}</Pressable>;
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              headerShown: false,
              title: "Trang chủ",
              tabBarIcon: ({ color }) => (
                <AntDesign name="home" size={20} color={color} />
              ),
            }}
          ></Tabs.Screen>

          <Tabs.Screen
            name="activity"
            options={{
              headerShown: false,
              title: "Hoạt động",
              tabBarIcon: ({ color }) => (
                <AntDesign name="clockcircleo" size={20} color={color} />
              ),
            }}
          ></Tabs.Screen>

          <Tabs.Screen
            name="payment"
            options={{
              headerShown: false,
              title: "Thanh toán",
              tabBarIcon: ({ color }) => (
                <Ionicons name="wallet-outline" size={20} color={color} />
              ),
            }}
          ></Tabs.Screen>

          <Tabs.Screen
            name="chat"
            options={{
              headerShown: false,
              title: "Tin nhắn",
              tabBarIcon: ({ color }) => (
                <AntDesign name="message1" size={20} color={color} />
              ),
            }}
          ></Tabs.Screen>
        </Tabs>
      </View>
    </>
  );
}
