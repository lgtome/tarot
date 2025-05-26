import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'

interface TarotCardProps {
  source: ImageSourcePropType
  size?: 'small' | 'medium' | 'large'
  style?: object
}

const TarotCard: React.FC<TarotCardProps> = ({ source, size = 'medium', style }) => {
  const styles = StyleSheet.create({
    card: {
      borderRadius: 10,
      overflow: 'hidden',
      ...getCardSize(size),
      ...style,
    },
    cardImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  })

  return (
    <View style={styles.card}>
      <Image source={source} style={styles.cardImage} />
    </View>
  )
}

const getCardSize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return { width: 80, height: 140 }
    case 'large':
      return { width: 180, height: 320 }
    case 'medium':
    default:
      return { width: 120, height: 210 }
  }
}

export default TarotCard
