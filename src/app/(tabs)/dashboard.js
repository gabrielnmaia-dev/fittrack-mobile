import { StyleSheet, Text, View } from 'react-native';

import { Brand } from '@/components/BrandLogo';
import { COLORS } from '@/theme/colors';

/** Placeholder da área logada — as telas de treino/progresso ainda serão implementadas. */
export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Brand markSize={34} wordmarkSize={20} />
      <Text style={styles.title}>Área do atleta</Text>
      <Text style={styles.subtitle}>Treinos, progressos e perfil em construção.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: 24,
  },
  title: {
    marginTop: 20,
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 8,
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
