import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(Text, null, 'FitTrack Mobile'),
    React.createElement(StatusBar, { style: 'auto' })
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
