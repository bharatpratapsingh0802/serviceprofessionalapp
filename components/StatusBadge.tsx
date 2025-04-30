import React from 'react';
import { StyleSheet, Text, View, ViewStyle, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

type StatusType = 'pending' | 'accepted' | 'rejected' | 'completed' | 'canceled' | 'online' | 'offline';

interface StatusBadgeProps {
  status: StatusType;
  style?: ViewStyle;
}

export default function StatusBadge({ status, style }: StatusBadgeProps) {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return { bg: '#FEF3C7', text: '#D97706' }; // Amber
      case 'accepted':
      case 'online':
      case 'completed':
        return { bg: '#D1FAE5', text: '#059669' }; // Green
      case 'rejected':
      case 'canceled':
        return { bg: '#FEE2E2', text: '#DC2626' }; // Red
      case 'offline':
        return { bg: '#E5E7EB', text: '#6B7280' }; // Gray
      default:
        return { bg: '#E5E7EB', text: '#6B7280' }; // Gray
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      case 'completed':
        return 'Completed';
      case 'canceled':
        return 'Canceled';
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      default:
        return '';
    }
  };

  const { bg, text } = getStatusColor();

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.text, { color: text }]}>{getStatusText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});