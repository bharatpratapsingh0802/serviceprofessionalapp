import React from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  ViewStyle,
  Text,
  useColorScheme,
} from 'react-native';
import Colors from '@/constants/Colors';

interface AvatarProps {
  source?: string | null;
  size?: 'small' | 'medium' | 'large' | number;
  name?: string;
  style?: ViewStyle;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export default function Avatar({
  source,
  size = 'medium',
  name,
  style,
  showStatus = false,
  status = 'offline',
}: AvatarProps) {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  
  const getSize = (): number => {
    if (typeof size === 'number') return size;
    
    switch (size) {
      case 'small': return 36;
      case 'large': return 80;
      case 'medium':
      default: return 56;
    }
  };
  
  const getInitials = (): string => {
    if (!name) return '';
    
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (
      nameParts[0].charAt(0).toUpperCase() + 
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };
  
  const getStatusColor = (): string => {
    switch (status) {
      case 'online': return colors.success;
      case 'away': return colors.warning;
      case 'busy': return colors.error;
      case 'offline':
      default: return colors.lightText;
    }
  };
  
  const avatarSize = getSize();
  const hasSource = !!source;
  const fontSize = avatarSize / 2.5;

  return (
    <View style={[style, { width: avatarSize, height: avatarSize }]}>
      <View
        style={[
          styles.avatar,
          { 
            width: avatarSize, 
            height: avatarSize,
            backgroundColor: hasSource ? 'transparent' : colors.secondary,
          },
        ]}
      >
        {hasSource ? (
          <Image
            source={{ uri: source }}
            style={styles.image}
          />
        ) : (
          <Image
            source={require('@/assets/avatar.png')}
            style={styles.image}
          />
        )}
      </View>
      
      {showStatus && (
        <View
          style={[
            styles.statusIndicator,
            { 
              backgroundColor: getStatusColor(),
              width: avatarSize / 4,
              height: avatarSize / 4,
              borderWidth: avatarSize / 20,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 999,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 999,
    borderColor: '#FFFFFF',
  },
});
