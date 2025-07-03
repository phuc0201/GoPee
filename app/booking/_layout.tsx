import { Stack } from "expo-router";

export default function BookingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="choose-vehicle"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
