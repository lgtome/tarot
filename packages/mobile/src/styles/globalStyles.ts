import { StyleSheet } from 'react-native';

export const fontFamily = {
  default: 'GideonRoman',
};

export const typography = {
  fontFamily: fontFamily.default,
  h1: {
    fontFamily: fontFamily.default,
    fontSize: 32,
  },
  h2: {
    fontFamily: fontFamily.default,
    fontSize: 24,
  },
  h3: {
    fontFamily: fontFamily.default,
    fontSize: 20,
  },
  body: {
    fontFamily: fontFamily.default,
    fontSize: 16,
  },
  caption: {
    fontFamily: fontFamily.default,
    fontSize: 14,
  },
  small: {
    fontFamily: fontFamily.default,
    fontSize: 12,
  },
};

export const globalStyles = StyleSheet.create({
  text: {
    fontFamily: fontFamily.default,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
