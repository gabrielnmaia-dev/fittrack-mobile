import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, BORDER_RADIUS } from '@/theme/colors';

/**
 * Botão principal (lime) usado nas telas de autenticação.
 */
export default function PrimaryButton({
  label,
  onPress,
  icon = 'lightning-bolt',
  loading = false,
  disabled = false,
  style,
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.button,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.onPrimary} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>{label}</Text>
          {icon ? (
            <MaterialCommunityIcons name={icon} size={17} color={COLORS.onPrimary} style={styles.icon} />
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: COLORS.primaryPressed,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.55,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  icon: {
    marginLeft: 8,
  },
});
