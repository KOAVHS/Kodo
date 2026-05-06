import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@constants/theme';
import { Card } from '@components/Card';
import { Button } from '@components/Button';

export default function GoalsScreen() {
  // TODO: Mostrar y gestionar metas semanales
  const goals = [
    {
      id: 1,
      title: 'Study 5 hours',
      progress: 3.5,
      target: 5,
      daysLeft: 3,
    },
    {
      id: 2,
      title: 'Complete 3 steps',
      progress: 1,
      target: 3,
      daysLeft: 3,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weekly Goals</Text>
      
      {goals.map((goal) => (
        <Card key={goal.id} title={goal.title}>
          <Text style={styles.goalText}>
            {goal.progress} / {goal.target} • {goal.daysLeft} days left
          </Text>
        </Card>
      ))}
      
      <Button label="Add New Goal" onPress={() => {}} />
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
  goalText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
});
