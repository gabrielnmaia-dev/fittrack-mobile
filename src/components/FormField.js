import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, SPACING } from '@/theme/colors';
import Input from './Input';

/**
 * Campo de formulário com rótulo em caixa alta + ícone (padrão da tela RF01).
 */
export default function FormField({
  label,
  icon,
  error,
  hint,
  rightIcon,
  rightIconLabel,
  onPressRightIcon,
  containerStyle,
  ...inputProps
}) {
  return (
    <View style={[styles.field, containerStyle]}>
      <View style={styles.labelRow}>
        {icon ? <MaterialCommunityIcons name={icon} size={13} color={COLORS.textSecondary} /> : null}
        <Text style={styles.label}>{label}</Text>
      </View>

      <Input
        {...inputProps}
        rightIcon={rightIcon}
        rightIconLabel={rightIconLabel}
        onPressRightIcon={onPressRightIcon}
      />

      {hint && !error ? <Text style={styles.hint}>{hint}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: SPACING.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    marginLeft: 6,
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  hint: {
    marginTop: 6,
    color: COLORS.textMuted,
    fontSize: 11,
  },
  error: {
    marginTop: 6,
    color: COLORS.error,
    fontSize: 12,
  },
});
