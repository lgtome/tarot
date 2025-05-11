import { Text } from '@/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import background from '../assets/images/background.png';
import cardBack from '../assets/images/card-back.png';
import Button from '../components/Button';
import TarotCard from '../components/TarotCard';
import theme from '../styles/theme';
import type { HomeScreenProps } from '../types/navigation';

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeScreenProps['navigation']>();

  const handleGetStarted = () => {
    // Navigate to reading screen
    navigation.navigate('Reading');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Text h1 style={styles.title}>
          {t('home.title')}
        </Text>

        <View style={styles.cardsContainer}>
          {/* Display three tarot cards in a fan arrangement */}
          <View style={[styles.cardWrapper, styles.leftCard]}>
            <TarotCard source={cardBack} />
          </View>
          <View style={[styles.cardWrapper, styles.centerCard]}>
            <TarotCard source={cardBack} />
          </View>
          <View style={[styles.cardWrapper, styles.rightCard]}>
            <TarotCard source={cardBack} />
          </View>
        </View>

        <Button title={t('home.getStarted')} onPress={handleGetStarted} />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xxl,
  },
  title: {
    fontSize: theme.typography.fontSizes.title,
    fontWeight: 'bold',
    color: theme.colors.gold,
    textAlign: 'center',
  },
  cardsContainer: {
    height: 320,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  cardWrapper: {
    position: 'absolute',
    ...theme.shadows.card,
  },
  leftCard: {
    transform: [{ rotate: '-15deg' }, { translateX: -60 }, { scale: 1.3 }],
    zIndex: 1,
    opacity: 0.8,
  },
  centerCard: {
    zIndex: 3,
    transform: [{ scale: 1.3 }],
  },
  rightCard: {
    transform: [{ rotate: '15deg' }, { translateX: 60 }, { scale: 1.3 }],
    zIndex: 2,
    opacity: 0.8,
  },
});

export default HomeScreen;
