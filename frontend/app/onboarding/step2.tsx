import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@constants/theme';
import { Button } from '@components/Button';

export default function Step2() {
  // TODO: Second onboarding step - Tiempo y nivel
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>How much time can you dedicate?</Text>
      <View style={styles.options}>
        <Button label="15 mins/day" onPress={() => {}} />
        <Button label="30 mins/day" onPress={() => {}} />
        <Button label="1 hour/day" onPress={() => {}} />
        <Button label="2+ hours/day" onPress={() => {}} />
      </View>
      
      <Text style={styles.title}>What's your experience level?</Text>
      <View style={styles.options}>
        <Button label="Beginner" onPress={() => {}} />
        <Button label="Intermediate" onPress={() => {}} />
        <Button label="Advanced" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
  },
  options: {
    gap: spacing.md,
  },
});
