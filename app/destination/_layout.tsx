import { Stack } from "expo-router";

export default function DestinationLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="dropoff-selector"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="search-address"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
