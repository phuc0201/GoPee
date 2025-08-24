import { AuthService } from "@/services/auth.service";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-simple-toast";
const authService = new AuthService();

export default function LoginWithPhone() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [sentOTP, setSentOTP] = useState<boolean>(false);
  const inputs = useRef<Array<TextInput | null>>([]);
  const OTPlength = 6;
  const [phone, setPhone] = useState<string>("");
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(OTPlength).fill("")
  );

  const handleChange = (text: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);

    if (text && index < OTPlength - 1) {
      inputs.current[index + 1]?.focus();
    }
    if (index + 1 === OTPlength && text !== "") {
      inputs.current[index]?.blur();
    }
  };

  const onSendOTP = async () => {
    try {
      if (phone?.trim() !== "") {
        const res = await authService.signinWithPhoneNumber(phone);
        987654321;

        setSentOTP(true);
        setTimeout(() => {
          inputs.current[0]?.focus();
          inputs.current[0]?.setNativeProps({ showSoftInputOnFocus: true });
        }, 50);
      }
    } catch (error) {
      Toast.show("Login failed", Toast.LONG, {
        backgroundColor: "red",
      });
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await authService.verifyOTP(phone, otpValues.join(""));

      const saveToken = await authService.onSaveToken(
        res.data.access_token,
        res.data.refresh_token
      );

      if (saveToken) {
        router.replace("/(tabs)/home");
      } else {
        Toast.show("Login failed", Toast.LONG, {
          backgroundColor: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearOTP = () => {};

  function isValidVietnamesePhone(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, "");
    const regex = /^(09|03|07|08|05)\d{8}$/;
    return regex.test(cleaned);
  }

  return (
    <View
      style={{
        flex: 1,
      }}
      className="bg-primary"
    >
      <View
        style={{
          marginTop: insets.top,
          padding: 16,
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "space-between",
        }}
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={22} color="grey" />
          </Pressable>
          <Text className="font-medium text-lg">Bắt đầu</Text>
          <View
            style={{
              width: 20,
            }}
          ></View>
        </View>

        <View className="flex-1 justify-between pt-10">
          <View>
            {!sentOTP && (
              <>
                <Text className="text-zinc-500">Số điện thoại</Text>
                <View className="flex-row items-center gap-5">
                  <View className="flex-row items-center border-b h-12">
                    <Image
                      style={{
                        width: 50,
                        height: 30,
                        objectFit: "contain",
                      }}
                      source={require("../../assets/images/vietnam.png")}
                    />
                    <Text>+ 84</Text>
                  </View>
                  <TextInput
                    value={phone}
                    onChangeText={(e) => setPhone(e)}
                    className="flex-1 border-b h-12"
                    keyboardType="numeric"
                    placeholder="0987654321"
                  ></TextInput>
                </View>
              </>
            )}

            {sentOTP && (
              <View className="flex-row items-center justify-center gap-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <View
                    key={idx}
                    className="w-14 h-14 border rounded-lg items-center justify-center"
                  >
                    <TextInput
                      ref={(ref) => {
                        inputs.current[idx] = ref;
                      }}
                      keyboardType="numeric"
                      maxLength={1}
                      textAlign="center"
                      onChangeText={(text) => handleChange(text, idx)}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>

          <View className="px-4">
            <Text className="text-black text-center mb-5">
              Gửi mã xác thực thông tin qua{" "}
              <Text className="font-medium">Tin nhắn</Text>
            </Text>
            {!sentOTP && (
              <Pressable
                onPress={() => onSendOTP()}
                className="bg-primary rounded-full p-4"
              >
                <Text className="text-white font-medium text-center">
                  Tiếp tục
                </Text>
              </Pressable>
            )}
            {sentOTP && (
              <Pressable
                onPress={() => verifyOTP()}
                className="bg-primary rounded-full p-4"
              >
                <Text className="text-white font-medium text-center">
                  Xác nhận
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
