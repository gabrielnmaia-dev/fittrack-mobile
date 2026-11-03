import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '@/theme/colors';

export default function WorkoutsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.card}>
        <MaterialCommunityIcons name="dumbbell" size={48} color={COLORS.primary} />
        <Text style={styles.title}>Módulo de Treinos</Text>
        <Text style={styles.subtitle}>Tela 3 (RF06 a RF12) em desenvolvimento.</Text>
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
  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
