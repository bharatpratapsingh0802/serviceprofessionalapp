import React from 'react';
import { 
  StyleSheet, 
  View, 
  ViewStyle, 
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Colors from '@/constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  elevation?: 'none' | 'small' | 'medium' | 'large';
}

export default function Card({
  children,
  style,
  onPress,
  disabled = false,
  elevation = 'medium',
}: CardProps) {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  const getElevationStyle = (): ViewStyle => {
    if (colorScheme === 'dark') {
      // Simplified shadows for dark mode
      return {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      };
    }

    switch (elevation) {
      case 'none':
        return {
          backgroundColor: colors.card,
        };
      case 'small':
        return {
          backgroundColor: colors.card,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.12,
          shadowRadius: 2,
          elevation: 2,
        };
      case 'large':
        return {
          backgroundColor: colors.card,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        };
      case 'medium':
      default:
        return {
          backgroundColor: colors.card,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 8,
          elevation: 4,
        };
    }
  };

  const CardComponent = onPress ? TouchableOpacity : View;
  const cardProps = onPress ? {
    onPress,
    disabled,
    activeOpacity: 0.8,
  } : {};

  return (
    <CardComponent
      style={[
        styles.card,
        getElevationStyle(),
        disabled && styles.disabled,
        style,
      ]}
      {...cardProps}
    >
      {children}
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  disabled: {
    opacity: 0.7,
  },
});