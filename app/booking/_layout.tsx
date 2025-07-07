import { Stack } from "expo-router";

export default function BookingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="choose-vehicle"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="payment-method"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="promotions"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="match-driver"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
