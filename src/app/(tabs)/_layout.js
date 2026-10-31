import React from 'react';
import { Stack } from 'expo-router';

export default function TabsLayout() {
  return React.createElement(
    Stack,
    null,
    React.createElement(Stack.Screen, {
      options: { headerShown: false },
    })
  );
}
