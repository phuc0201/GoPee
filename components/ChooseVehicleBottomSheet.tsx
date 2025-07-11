import { Vehicles } from "@/dummy-data/vehicle";
import Entypo from "@expo/vector-icons/Entypo";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import RideOptionsBottomSheet from "./RideOptionsBottomSheet";
import VehicleCard from "./VehicleCard";

const ChooseVehicleBottomSheet = () => {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedVehicleTypeID, setSelectedVehicleTypeID] = useState<number>(
    Vehicles[0].id
  );
  const [isOpenRideOptions, setIsOpenRideOptions] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <BottomSheet ref={bottomSheetRef} snapPoints={[200]}>
        <BottomSheetView style={styles.contentContainer}>
          {Vehicles.map((item) => (
            <VehicleCard
              key={item.id}
              vehicle={{ ...item }}
              selectedVehicleTypeID={selectedVehicleTypeID}
              setSelectedVehicleTypeID={setSelectedVehicleTypeID}
            />
          ))}
        </BottomSheetView>
      </BottomSheet>

      <View style={styles.controlPanel}>
        <View className="flex-row items-center py-4">
          <Pressable
            onPress={() => router.push("/booking/payment-method")}
            style={{
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightColor: "#e5e7eb",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
              borderLeftColor: "transparent",
            }}
            className="flex-1 flex-row items-center justify-center gap-3"
          >
            <Image
              source={require("../assets/images/payment-cod.png")}
              style={{
                width: 20,
                height: 20,
              }}
            ></Image>
            <Text className="">Tiền mặt</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/booking/promotions")}
            style={{
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightColor: "#e5e7eb",
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
              borderLeftColor: "transparent",
            }}
            className="flex-1"
          >
            <Text className="mx-auto">Ưu đãi</Text>
          </Pressable>
          <Pressable
            onPress={() => setIsOpenRideOptions(!isOpenRideOptions)}
            style={{
              paddingLeft: 30,
              paddingRight: 30,
            }}
          >
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color="black"
              style={{ margin: "auto" }}
            />
          </Pressable>
        </View>
        <Pressable
          onPress={() => router.replace("/booking/match-driver")}
          className="bg-primary rounded-full p-4"
        >
          <Text className="text-white mx-auto">Đặt ngay</Text>
        </Pressable>
      </View>

      <RideOptionsBottomSheet
        isOpen={isOpenRideOptions}
        isQuietRide={false}
        isAssitiveRide={false}
        onClose={() => setIsOpenRideOptions(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 150,
    paddingTop: 0,
    alignItems: "center",
  },
  controlPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
    elevation: 3,
  },
});

export default ChooseVehicleBottomSheet;
