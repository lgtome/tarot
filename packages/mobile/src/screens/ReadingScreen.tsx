import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components';
import Button from '../components/Button';
import TarotCard from '../components/TarotCard';
import useCards from '../hooks/useCards';
import theme from '../styles/theme';

const ReadingScreen: React.FC = () => {
  const { t } = useTranslation();
  const [showCards, setShowCards] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);
  const { shuffleDeck, drawCards, drawnCards } = useCards();

  const handleDraw = () => {
    shuffleDeck();
    drawCards(3);
    setShowCards(true);
  };

  const handleComplete = () => {
    setReadingComplete(true);
  };

  return (
    <ImageBackground source={require('../assets/images/background.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Text h2 style={styles.title}>
          {t('cards.daily')}
        </Text>

        {!showCards ? (
          <View style={styles.instructionContainer}>
            <Text body style={styles.instructionText}>
              {t('cards.description')}
            </Text>
            <Button title={t('cards.draw')} onPress={handleDraw} />
          </View>
        ) : !readingComplete ? (
          <View style={styles.readingContainer}>
            <View style={styles.cards}>
              <View style={styles.cardSection}>
                <Text body style={styles.cardLabel}>
                  {t('cards.past')}
                </Text>
                <TarotCard source={require('../assets/images/card-back.png')} size="small" />
              </View>

              <View style={styles.cardSection}>
                <Text body style={styles.cardLabel}>
                  {t('cards.present')}
                </Text>
                <TarotCard source={require('../assets/images/card-back.png')} size="small" />
              </View>

              <View style={styles.cardSection}>
                <Text body style={styles.cardLabel}>
                  {t('cards.future')}
                </Text>
                <TarotCard source={require('../assets/images/card-back.png')} size="small" />
              </View>
            </View>

            <Button title={t('cards.fullReading')} onPress={handleComplete} />
          </View>
        ) : (
          <ScrollView style={styles.readingResult}>
            <View style={styles.meaningSection}>
              <Text h3 style={styles.meaningTitle}>
                {t('cards.past')}
              </Text>
              <TarotCard source={require('../assets/images/card-back.png')} size="small" />
              <Text body style={styles.meaningText}>
                The card represents your past influences that are still affecting your current
                situation.
              </Text>
            </View>

            <View style={styles.meaningSection}>
              <Text h3 style={styles.meaningTitle}>
                {t('cards.present')}
              </Text>
              <TarotCard source={require('../assets/images/card-back.png')} size="small" />
              <Text body style={styles.meaningText}>
                This card reveals the current energies and challenges in your situation.
              </Text>
            </View>

            <View style={styles.meaningSection}>
              <Text h3 style={styles.meaningTitle}>
                {t('cards.future')}
              </Text>
              <TarotCard source={require('../assets/images/card-back.png')} size="small" />
              <Text body style={styles.meaningText}>
                This card offers insight into potential outcomes if you continue on your current
                path.
              </Text>
            </View>
          </ScrollView>
        )}
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
    padding: theme.spacing.md,
  },
  title: {
    color: theme.colors.gold,
    marginVertical: theme.spacing.md,
  },
  instructionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '80%',
  },
  instructionText: {
    color: theme.colors.gold,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 26,
  },
  readingContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing.md,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: theme.spacing.xl,
  },
  cardSection: {
    alignItems: 'center',
  },
  cardLabel: {
    color: theme.colors.gold,
    marginBottom: theme.spacing.sm,
  },
  readingResult: {
    flex: 1,
    width: '100%',
  },
  meaningSection: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.overlay,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.gold,
    alignItems: 'center',
  },
  meaningTitle: {
    color: theme.colors.gold,
    marginBottom: theme.spacing.md,
  },
  meaningText: {
    color: theme.colors.gold,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    lineHeight: 22,
  },
});

export default ReadingScreen;
