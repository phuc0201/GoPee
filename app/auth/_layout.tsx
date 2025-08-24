import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="login-with-phone"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
