import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/theme/colors';

export default function ProfileScreen() {
  function logout() {
    router.replace('/(auth)/login');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>FD</Text>
        </View>
        <Text style={styles.title}>Felipe Dev</Text>
        <Text style={styles.subtitle}>@felipe.dev • Objetivo: Ganhar Músculo</Text>

        <Pressable onPress={logout} style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Encerrar Sessão (RF03)</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 32,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: '100%',
    maxWidth: 360,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: COLORS.onPrimary,
    fontWeight: '800',
    fontSize: 22,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  logoutText: {
    color: COLORS.error,
    fontWeight: '600',
    fontSize: 14,
  },
});
