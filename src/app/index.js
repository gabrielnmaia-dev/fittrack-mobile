import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS } from '@/theme/colors';

export default function IndexScreen() {
  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(
      Text,
      { style: styles.title },
      'FitTrack Mobile'
    ),
    React.createElement(
      Text,
      { style: styles.subtitle },
      'Projeto configurado com Expo Router'
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 12,
    textAlign: 'center',
  },
});
