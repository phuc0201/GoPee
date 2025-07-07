import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DriverMatchingProps {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const DriverMatching: React.FC<DriverMatchingProps> = ({ region }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const rippleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 3],
  });

  const rippleOpacity = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
      }}
      className="bg-white"
    >
      <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: insets.top + 10,
          left: 16,
          zIndex: 10,
        }}
        className="w-12 h-12 bg-white rounded-full"
      >
        <AntDesign
          style={{ margin: "auto" }}
          name="close"
          size={24}
          color="black"
        />
      </Pressable>

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <View
          style={{ paddingHorizontal: 40 }}
          className="flex-1 items-center justify-center"
        >
          <Animated.View
            style={{
              width: 100,
              aspectRatio: 1,
              borderRadius: 1000,
              backgroundColor: "rgba(0, 122, 255, .5)",
              transform: [{ scale: rippleScale }],
              opacity: rippleOpacity,
              position: "absolute",
            }}
          />
        </View>
      </View>

      <MapView
        style={{
          flex: 1,
        }}
        region={region}
      >
        <>
          <Circle
            center={region}
            radius={2500}
            fillColor="rgba(0, 122, 255, 0.1)"
            strokeColor="rgba(0, 122, 255, 0.08)"
            strokeWidth={2}
          />
          <Circle
            center={region}
            radius={100}
            fillColor="rgba(255, 255, 255, 1)"
            strokeColor="rgba(0, 0, 0, 1)"
            strokeWidth={8}
          />
        </>
      </MapView>
    </View>
  );
};

export default DriverMatching;
