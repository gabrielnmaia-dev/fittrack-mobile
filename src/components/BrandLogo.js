import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/theme/colors';
import { FONT_FAMILY } from '@/constants';

/** Quadrado lime com a letra "F" — usado como marca do app. */
export function BrandMark({ size = 44, style }) {
  return (
    <View style={[styles.mark, { width: size, height: size, borderRadius: size * 0.28 }, style]}>
      <Text style={[styles.markText, { fontSize: size * 0.54 }]}>F</Text>
    </View>
  );
}

/** Logotipo textual "FITTRACK". */
export function Wordmark({ fontSize = 22, color = COLORS.textPrimary, style }) {
  return <Text style={[styles.wordmark, { fontSize, color }, style]}>FITTRACK</Text>;
}

/** Marca completa (ícone + wordmark) na horizontal, usada nos cabeçalhos. */
export function Brand({ markSize = 24, wordmarkSize = 16, style }) {
  return (
    <View style={[styles.row, style]}>
      <BrandMark size={markSize} />
      <Wordmark fontSize={wordmarkSize} style={styles.rowWordmark} />
    </View>
  );
}

export default Brand;

const styles = StyleSheet.create({
  mark: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markText: {
    color: COLORS.onPrimary,
    fontFamily: FONT_FAMILY.display,
    includeFontPadding: false,
    lineHeight: undefined,
  },
  wordmark: {
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.display,
    letterSpacing: 2.5,
    includeFontPadding: false,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowWordmark: {
    marginLeft: 8,
    letterSpacing: 2,
  },
});
