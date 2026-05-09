import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@constants/theme';
import { Button } from '@components/Button';

export default function SplashScreen() {
  // TODO: Splash screen con redirect a onboarding si es nuevo usuario
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🎓 Kōdo</Text>
        <Text style={styles.title}>Learn Anything, Anytime</Text>
        <Text style={styles.subtitle}>
          Personalized learning paths powered by AI
        </Text>
        <Button label="Get Started" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});
