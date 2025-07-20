import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ActivityCard from "./ActivityCard";

interface ActivityProps {
  isActive?: boolean;
}

const ActivityScene: React.FC<ActivityProps> = ({ isActive = false }) => {
  return (
    <View style={styles.container} className="">
      <ScrollView className="px-4">
        {Array.from({ length: isActive ? 1 : 10 }).map((_, idx) => (
          <ActivityCard key={idx} isActive={isActive} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});

export default ActivityScene;
