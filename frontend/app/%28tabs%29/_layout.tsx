import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '@constants/theme';

// TODO: Implementar navegación de tabs
// Este será el layout para las tabs principales (dashboard, roadmap, stats, goals)

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Text>Tabs Navigation - To be implemented</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
