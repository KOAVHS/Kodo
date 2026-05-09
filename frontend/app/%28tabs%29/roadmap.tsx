import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@constants/theme';
import { Card } from '@components/Card';

export default function RoadmapScreen() {
  // TODO: Mostrar roadmap activo con sus pasos
  const steps = [
    { order: 1, title: 'Variables & Data Types', completed: true },
    { order: 2, title: 'Control Flow', completed: true },
    { order: 3, title: 'Functions', completed: false },
    { order: 4, title: 'OOP Basics', completed: false },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Roadmap</Text>
      
      {steps.map((step) => (
        <Card
          key={step.order}
          title={`${step.order}. ${step.title}`}
          description={step.completed ? 'Completed ✓' : 'In Progress'}
        />
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
});
