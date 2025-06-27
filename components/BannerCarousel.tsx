import React, { useState } from "react";
import {
  Dimensions,
  Image,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

const screenWidth = Dimensions.get("window").width;

const data = [
  require("../assets/images/banner/1.jpeg"),
  require("../assets/images/banner/2.jpeg"),
  require("../assets/images/banner/3.jpeg"),
  require("../assets/images/banner/4.jpeg"),
  require("../assets/images/banner/5.jpeg"),
];

const BannerCarousel = () => {
  const [containerWidth, setContainerWidth] = useState(
    Dimensions.get("window").width
  );
  const progress = useSharedValue<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };
  return (
    <View
      onLayout={handleLayout}
      style={{ flexGrow: 1, marginTop: 10, marginBottom: 10 }}
    >
      <Carousel
        loop
        autoPlay
        width={containerWidth}
        height={containerWidth / 2}
        data={data}
        onProgressChange={progress}
        scrollAnimationDuration={3000}
        renderItem={({ item }) => (
          <View style={{ padding: 4 }}>
            <View style={styles.card}>
              <Image source={item} style={styles.image} resizeMode="cover" />
            </View>
          </View>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 50,
          width: 6,
          height: 6,
        }}
        activeDotStyle={{
          backgroundColor: "rgba(0,0,0,0.8)",
        }}
        containerStyle={{ gap: 5, marginTop: -20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});

export default BannerCarousel;
