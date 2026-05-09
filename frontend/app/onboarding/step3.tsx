import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '@constants/theme';
import { Button } from '@components/Button';

export default function Step3() {
  // TODO: Third onboarding step - Generando roadmap
  const [isGenerating, setIsGenerating] = React.useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isGenerating ? (
        <>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.generating}>Generating your personalized roadmap...</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Your Roadmap is Ready! 🎉</Text>
          <Text style={styles.subtitle}>Get started with your learning journey</Text>
          <Button label="Start Learning" onPress={() => {}} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generating: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
});
