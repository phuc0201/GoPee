import ActivityScene from "@/components/ActivityScene";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const renderScene = SceneMap({
  activity: () => <ActivityScene isActive={true} />,
  history: () => <ActivityScene />,
});

const routes = [
  { key: "activity", title: "Đang diễn ra" },
  { key: "history", title: "Lịch sử" },
];

export default function ActivityScreen() {
  const insets = useSafeAreaInsets();
  const [activities, setActivities] = useState<any[]>([{}]);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const customTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: "#00b14f",
        }}
        style={{
          backgroundColor: "#fff",
          height: 45,
          elevation: 1,
        }}
        tabStyle={{
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        activeColor="#00b14f"
        inactiveColor="#848484"
        pressColor="transparent"
        pressOpacity={1}
      />
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={[styles.container]}>
        <View
          style={{
            top: insets.top,
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <Text className="text-2xl px-4 pt-2 font-bold">Hoạt động</Text>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={styles.tabViewContainer}
            renderTabBar={customTabBar}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabViewContainer: {
    backgroundColor: "#fff",
  },
});
