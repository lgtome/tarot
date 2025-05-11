import React from 'react';
import { Text, View } from 'react-native';

// Examples of using the path aliases
// Import from src/components directory using the @ alias
import Button from '@/components/Button';

// Import from src/styles directory using the @ alias
import { theme } from '@/styles/theme';

// Import from src/hooks directory using the @ alias
import { useCards } from '@/hooks/useCards';

// Example component
const PathAliasExample: React.FC = () => {
  const { shuffleCards, drawCard } = useCards();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>This component demonstrates path aliases</Text>
      <Button label="Draw Card" onPress={() => drawCard()} />
    </View>
  );
};

export default PathAliasExample;
