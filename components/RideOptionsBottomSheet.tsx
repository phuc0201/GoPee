import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

interface RideOptionProps {
  isOpen: boolean;
  isQuietRide: boolean;
  isAssitiveRide: boolean;
  onClose: () => void;
}

const RideOptionsBottomSheet: React.FC<RideOptionProps> = ({
  isOpen,
  isQuietRide,
  isAssitiveRide,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [quietRide, setQuietRide] = React.useState(isQuietRide);
  const [assitiveRide, setAssitiveRide] = React.useState(isAssitiveRide);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={{
        flex: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: "hidden",
      }}
      index={-1}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      handleStyle={{ display: "none" }}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View style={{ padding: 20, justifyContent: "space-between", flex: 1 }}>
          <View style={{ height: Dimensions.get("window").height * 0.7 }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Cho mỗi chuyến đi
              </Text>
            </View>
            <Pressable
              onPress={() => setQuietRide(!quietRide)}
              className="py-4 border-b border-gray-200 flex-row items-center justify-between"
            >
              <View>
                <View className="flex-row items-center gap-3">
                  <Text className="font-medium text-lg">
                    Chuyến xe yên lặng
                  </Text>
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      backgroundColor: "#000",
                      borderRadius: 1000,
                    }}
                  ></View>
                  <Text className="text-gray-600">Miễn phí</Text>
                </View>
                <Text style={{ color: "#71717a", marginTop: 4, fontSize: 13 }}>
                  Tài xế không bắt chuyện nếu không cần
                </Text>
              </View>
              <View>
                <View
                  style={{
                    width: 42,
                    height: 24,
                    borderRadius: 14,
                    backgroundColor: quietRide ? "#18B657" : "#ccc",
                    justifyContent: "center",
                    padding: 2,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 12,
                      backgroundColor: "#fff",
                      transform: [{ translateX: quietRide ? 18 : 0 }],
                      elevation: 2,
                    }}
                  />
                </View>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setAssitiveRide(!assitiveRide)}
              className="py-4 flex-row items-center justify-between"
            >
              <View>
                <View className="flex-row items-center gap-3">
                  <Text className="font-medium text-lg">Chuyến xe Ân cần</Text>
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      backgroundColor: "#000",
                      borderRadius: 1000,
                    }}
                  />
                  <Text className="text-gray-600">Miễn phí</Text>
                </View>
                <Text
                  style={{
                    color: "#71717a",
                    marginTop: 4,
                    fontSize: 13,
                    maxWidth: "80%",
                  }}
                >
                  Hành khách là phụ nữ có thai hoặc có con nhỏ, người lớn tuổi
                  hoặc mang vác nặng, cần sự hỗ trợ.
                </Text>
              </View>
              <View>
                <View
                  style={{
                    width: 42,
                    height: 24,
                    borderRadius: 14,
                    backgroundColor: assitiveRide ? "#18B657" : "#ccc",
                    justifyContent: "center",
                    padding: 2,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 12,
                      backgroundColor: "#fff",
                      transform: [{ translateX: assitiveRide ? 18 : 0 }],
                      elevation: 2,
                    }}
                  />
                </View>
              </View>
            </Pressable>
          </View>
          <Pressable onPress={onClose} className="bg-primary p-4 rounded-full">
            <Text className="text-white font-medium mx-auto">Cập nhật</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default RideOptionsBottomSheet;
