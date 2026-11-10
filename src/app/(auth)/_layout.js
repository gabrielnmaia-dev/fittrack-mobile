import { Stack } from 'expo-router';

import { COLORS } from '@/theme/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="cadastro-perfil" />
      <Stack.Screen name="consulta-perfil" />
    </Stack>
  );
}
