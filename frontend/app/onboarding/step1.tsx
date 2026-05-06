import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@constants/theme';
import { Button } from '@components/Button';

export default function Step1() {
  // TODO: First onboarding step - ¿Qué quieres aprender?
  const subjects = ['Python', 'JavaScript', 'React Native', 'Data Science', 'Web Design'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>What do you want to learn?</Text>
      <View style={styles.subjectsGrid}>
        {subjects.map((subject) => (
          <Button key={subject} label={subject} onPress={() => {}} />
        ))}
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
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  subjectsGrid: {
    flex: 1,
    gap: spacing.md,
  },
});
