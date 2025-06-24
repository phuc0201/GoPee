import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#00b14f" }}>
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
    </Tabs>
  );
}
