import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  const backgroundColor = variant === 'primary' ? colors.primary : colors.secondary;

  return (
    <View
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.border : backgroundColor },
      ]}
    >
      <Text
        style={styles.text}
        onPress={onPress}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    ...typography.body,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
