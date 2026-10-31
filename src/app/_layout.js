import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { COLORS } from '@/theme/colors';

export default function RootLayout() {
  return React.createElement(
    SafeAreaProvider,
    null,
    React.createElement(StatusBar, { style: 'auto' }),
    React.createElement(
      Stack,
      null,
      React.createElement(Stack.Screen, {
        options: {
          headerShown: false,
          backgroundColor: COLORS.background,
        },
      })
    )
  );
}
