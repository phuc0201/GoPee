import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import "../global.css";

export default function RootLayout() {
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="location" options={{ headerShown: false }} />
            <Stack.Screen name="destination" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="booking" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
          <Toast />
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
}
