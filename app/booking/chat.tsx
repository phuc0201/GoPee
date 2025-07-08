import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Chat() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);

  const [messages, setMessages] = useState<
    { id: string; text: string; fromUser: boolean }[]
  >([
    { id: "1", text: "Xin chào!", fromUser: false },
    {
      id: "2",
      text: "Chào bạn, mình có thể giúp gì?",
      fromUser: true,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      fromUser: true,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setIsFocusInput(true);
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setIsFocusInput(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, ...(isFocusInput ? {} : { flexGrow: 1 }) }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className="flex-1 bg-white"
          style={{ paddingTop: insets.top + 4 }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-2">
              <Pressable onPress={() => router.back()}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </Pressable>
              <View className="flex-row items-center gap-3">
                <Image
                  source={require("../../assets/images/avatar-default.png")}
                  className="w-12 h-12 rounded-full"
                />
                <View>
                  <Text>Nguyen Ba Phuoc</Text>
                  <Text className="text-gray-500">67AC - 222.22</Text>
                </View>
              </View>
            </View>
            <Feather name="phone" size={24} color="#6b7280" />
          </View>

          {/* Chat messages */}
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{ padding: 12 }}
            showsVerticalScrollIndicator={false}
            className="bg-zinc-100"
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                className={`px-4 py-2 mb-1 rounded-xl max-w-[80%] ${
                  msg.fromUser
                    ? "bg-primary self-end rounded-br-none"
                    : "bg-gray-200 self-start rounded-bl-none"
                }`}
              >
                <Text
                  className={`${msg.fromUser ? "text-white" : "text-black"}`}
                >
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View
            style={{ position: "absolute", bottom: 0 }}
            className="flex-row items-center p-2 px-4 bg-white"
          >
            <TextInput
              value={input}
              onFocus={() => setIsFocusInput(true)}
              onBlur={() => setIsFocusInput(false)}
              onChangeText={setInput}
              placeholder="Nhập tin nhắn"
              className="flex-1 rounded-lg px-4 py-2 text-base"
              multiline
              style={{ maxHeight: 100, textAlignVertical: "top" }}
            />
            <Pressable onPress={handleSend} className="ml-2">
              <Ionicons name="send" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
