import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@constants/theme';
import { Card } from '@components/Card';

export default function StatsScreen() {
  // TODO: Mostrar estadísticas detalladas
  const stats = {
    totalMinutes: 1200,
    streakDays: 7,
    completedSteps: 15,
    weeklyBreakdown: {
      monday: 120,
      tuesday: 90,
      wednesday: 150,
      thursday: 100,
      friday: 80,
      saturday: 200,
      sunday: 60,
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Stats</Text>
      
      <Card title="Total Study Time" description={`${stats.totalMinutes} minutes`} />
      <Card title="Current Streak" description={`${stats.streakDays} days`} />
      <Card title="Steps Completed" description={`${stats.completedSteps} steps`} />
      
      <Text style={styles.weeklyTitle}>Weekly Breakdown</Text>
      {Object.entries(stats.weeklyBreakdown).map(([day, minutes]) => (
        <Card key={day} title={day.toUpperCase()} description={`${minutes} min`} />
      ))}
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
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  weeklyTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
});
