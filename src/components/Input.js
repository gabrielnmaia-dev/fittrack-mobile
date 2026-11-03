import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { COLORS, BORDER_RADIUS } from '@/theme/colors';

/**
 * Campo de texto escuro com ícones opcionais à esquerda e à direita.
 */
export default function Input({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = COLORS.textMuted,
  leftIcon,
  rightIcon,
  rightIconLabel,
  onPressRightIcon,
  secureTextEntry = false,
  autoCapitalize = 'none',
  autoCorrect = false,
  keyboardType,
  textContentType,
  editable = true,
  returnKeyType,
  onSubmitEditing,
  accessibilityLabel,
  containerStyle,
  inputStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon ? (
        <MaterialCommunityIcons
          name={leftIcon}
          size={17}
          color={COLORS.textSecondary}
          style={styles.leftIcon}
        />
      ) : null}

      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        textContentType={textContentType}
        editable={editable}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        accessibilityLabel={accessibilityLabel ?? placeholder}
        selectionColor={COLORS.primary}
      />

      {rightIcon ? (
        <Pressable
          onPress={onPressRightIcon}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={rightIconLabel ?? rightIcon}
        >
          <MaterialCommunityIcons name={rightIcon} size={19} color={COLORS.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 14,
    height: 52,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 15,
    paddingVertical: 0,
  },
});
