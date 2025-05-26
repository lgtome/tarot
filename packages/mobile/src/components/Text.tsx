import React from 'react'
import { Text as RNText, StyleSheet, TextProps } from 'react-native'
import { fontFamily } from '../styles/globalStyles'

interface CustomTextProps extends TextProps {
  style?: any
  h1?: boolean
  h2?: boolean
  h3?: boolean
  body?: boolean
  caption?: boolean
  small?: boolean
  center?: boolean
  color?: string
}

const Text: React.FC<CustomTextProps> = ({
  style,
  children,
  h1,
  h2,
  h3,
  body,
  caption,
  small,
  center,
  color,
  ...props
}) => {
  return (
    <RNText
      style={[
        styles.default,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        body && styles.body,
        caption && styles.caption,
        small && styles.small,
        center && styles.center,
        color && { color },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  default: {
    fontFamily: fontFamily.default,
    fontSize: 16,
    color: '#fff',
  },
  h1: {
    fontFamily: fontFamily.default,
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontFamily: fontFamily.default,
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontFamily: fontFamily.default,
    fontSize: 20,
    fontWeight: 'bold',
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
  center: {
    textAlign: 'center',
  },
})

export default Text
