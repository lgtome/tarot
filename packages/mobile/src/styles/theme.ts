export const colors = {
  background: '#000000',
  backgroundGreen: '#0A1F0A',
  gold: '#F9E79F',
  cardGreen: '#0A2E0A',
  text: '#F9E79F',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.7)',
  cardBorder: '#F9E79F',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontSizes: {
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 22,
    xxlarge: 28,
    title: 64,
  },
  fontFamilies: {
    title: 'GideonRoman',
    body: 'GideonRoman',
  },
};

export const shadows = {
  card: {
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
};

export default {
  colors,
  spacing,
  typography,
  shadows,
};
