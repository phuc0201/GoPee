import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface CustomMarkerProps {
  isMoving: boolean;
}

const styles = StyleSheet.create({
  marker: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 0,
    width: 56,
    height: 56,
    transform: [{ translateX: "-50%" }, { translateY: "-100%" }],
  },
});

export default function CustomMarker({ isMoving }: CustomMarkerProps) {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const [hiddenRippleDot, setHiddenRippleDot] = useState<boolean>(false);

  useEffect(() => {
    if (!isMoving) {
      scale.value = withRepeat(
        withTiming(1, {
          duration: 1000,
        }),
        -1,
        false
      );
      opacity.value = withRepeat(
        withTiming(0.1, {
          duration: 1000,
        }),
        -1,
        false
      );
    } else {
      ((scale.value = 0), (opacity.value = 0));
    }
  }, [isMoving]);

  useEffect(() => {
    if (isMoving) {
      translateY.value = withSpring(-6, { damping: 5 });
      setHiddenRippleDot(true);
    } else {
      translateY.value = withSequence(
        withTiming(-10, { duration: 80 }),
        withTiming(0, { duration: 180 }, (finished) => {
          if (finished) {
            runOnJS(setHiddenRippleDot)(false);
          }
        })
      );
    }
  }, [isMoving]);

  const pinAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container]}>
      <Animated.View style={[styles.marker, pinAnimatedStyle]}>
        <Image
          source={require("../assets/images/gps.png")}
          style={{ width: 56, height: 60, resizeMode: "cover" }}
        />
      </Animated.View>
      {!hiddenRippleDot && (
        <>
          {/* RippleDot to */}
          <Animated.View
            style={[
              {
                position: "absolute",
                left: "50%",
                bottom: 0,
                transform: [
                  { translateX: "-50%" },
                  { translateY: "50%" },
                  { rotateX: "70deg" },
                  { scale: scale },
                ],
                zIndex: -1,
                backgroundColor: "#000",
                opacity: opacity,
                height: 30,
                width: 30,
                borderRadius: 10000,
              },
            ]}
          />
          {/* RippleDot nhỏ */}
          <Animated.View
            style={[
              {
                position: "absolute",
                left: "50%",
                bottom: 0,
                transform: [
                  { translateX: "-50%" },
                  { translateY: "50%" },
                  { rotateX: "70deg" },
                  { scale: scale },
                ],
                zIndex: -1,
                backgroundColor: "#000",
                opacity: opacity,
                height: 20,
                width: 20,
                borderRadius: 10000,
              },
            ]}
          />
        </>
      )}
      {hiddenRippleDot && (
        <Animated.View
          style={[
            {
              position: "absolute",
              left: "50%",
              bottom: 0,
              transform: [
                { translateX: "-50%" },
                { translateY: "50%" },
                { rotateX: "70deg" },
              ],

              zIndex: -1,
              backgroundColor: "#000",
              opacity: 0.3,
              height: 10,
              width: 10,
              borderRadius: 10000,
            },
          ]}
        ></Animated.View>
      )}
    </Animated.View>
  );
}
