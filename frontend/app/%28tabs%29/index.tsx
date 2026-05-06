import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@constants/theme';
import { Card } from '@components/Card';
import { ProgressBar } from '@components/ProgressBar';

export default function DashboardScreen() {
  // TODO: Dashboard principal
  const stats = {
    streak: 7,
    totalMinutes: 1200,
    currentRoadmap: 'Python Fundamentals',
    progress: 0.45,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back! 👋</Text>
      
      <Card title="Current Streak" description={`${stats.streak} days`} />
      
      <Card title={stats.currentRoadmap}>
        <ProgressBar progress={stats.progress} />
        <Text style={styles.progressText}>{Math.round(stats.progress * 100)}% Complete</Text>
      </Card>
      
      <Card title="Total Study Time" description={`${stats.totalMinutes} minutes`} />
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
  progressText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
});
