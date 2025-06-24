import { Stack } from "expo-router";

export default function LocationLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="fallback" options={{ headerShown: false }} />
      <Stack.Screen name="map-selector" options={{ headerShown: false }} />
    </Stack>
  );
}
