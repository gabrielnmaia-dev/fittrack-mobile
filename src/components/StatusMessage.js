import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, BORDER_RADIUS } from '@/theme/colors';

/**
 * Banner de feedback (erro/sucesso) exibido acima das ações do formulário.
 */
export default function StatusMessage({ type = 'error', text, style }) {
  if (!text) return null;

  const isError = type === 'error';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isError ? 'rgba(248, 113, 113, 0.12)' : 'rgba(52, 211, 153, 0.12)' },
        style,
      ]}
      accessibilityRole="alert"
    >
      <MaterialCommunityIcons
        name={isError ? 'alert-circle-outline' : 'check-circle-outline'}
        size={16}
        color={isError ? COLORS.error : COLORS.success}
      />
      <Text style={[styles.text, { color: isError ? COLORS.error : COLORS.success }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  text: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '600',
  },
});
