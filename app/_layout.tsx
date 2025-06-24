import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="location" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
