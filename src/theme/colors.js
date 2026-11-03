/**
 * Paleta FitTrack — tema escuro com acento "lime" (usado nas telas RF01/RF02).
 */

export const COLORS = {
  // Acento principal
  primary: '#BEF443',
  primaryPressed: '#A8DC32',
  primarySoft: 'rgba(190, 244, 67, 0.14)',
  onPrimary: '#0B0E0A',

  // Apoio
  secondary: '#0EA5E9',
  accent: '#BEF443',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',

  // Texto
  textPrimary: '#F2F4F3',
  textSecondary: '#8A9398',
  textMuted: '#5C656A',
  textInverse: '#0B0E0A',
  textLink: '#BEF443',

  // Superfícies
  background: '#111416',
  surface: '#1B2023',
  card: '#1B2023',
  input: '#232A2E',
  border: '#2B3236',
  borderLight: '#22282B',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 18,
  pill: 9999,
  full: 9999,
};

export const TYPOGRAPHY = {
  h1: { fontSize: 30, lineHeight: 36, fontWeight: '900' },
  h2: { fontSize: 24, lineHeight: 30, fontWeight: '800' },
  h3: { fontSize: 20, lineHeight: 26, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodySmall: { fontSize: 13, lineHeight: 19, fontWeight: '400' },
  caption: { fontSize: 11, lineHeight: 15, fontWeight: '600' },
  label: { fontSize: 10, lineHeight: 14, fontWeight: '700', letterSpacing: 1.2 },
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const COLORS_MAP = COLORS;
