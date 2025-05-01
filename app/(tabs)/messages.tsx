import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  useColorScheme,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Avatar from '@/components/Avatar';
import { Search, ChevronRight } from 'lucide-react-native';

// Mock data
const conversations = [
  {
    id: '1',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    lastMessage: 'Thank you for accepting my request!',
    time: '10:30 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    lastMessage: 'What time will you arrive tomorrow?',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    lastMessage: 'The service was great, thank you!',
    time: 'Jun 2',
    unread: 0,
  },
  {
    id: '4',
    name: 'David Thompson',
    avatar: null,
    lastMessage: 'Sorry for canceling the appointment',
    time: 'May 28',
    unread: 0,
  },
  {
    id: '5',
    name: 'Lisa Garcia',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    lastMessage: 'I need a quote for a new project',
    time: 'May 25',
    unread: 0,
  },
];

export default function MessagesScreen() {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = useState('');
  
  const renderConversationItem = (conversation: any) => {
    return (
      <TouchableOpacity 
        key={conversation.id} 
        style={[
          styles.conversationItem,
          { borderBottomColor: 'rgba(0,0,0,0.1)' }
        ]}
      >
        <View style={styles.conversationContent}>
          <Avatar 
            source={conversation.avatar} 
            name={conversation.name}
            size="medium"
          />
          
          <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {conversation.name}
              </Text>
              <Text style={[styles.time, { color: colors.lightText }]}>
                {conversation.time}
              </Text>
            </View>
            
            <View style={styles.messagePreview}>
              <Text 
                style={[
                  styles.previewText, 
                  { color: conversation.unread ? colors.text : colors.lightText },
                  conversation.unread && styles.unreadText
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {conversation.lastMessage}
              </Text>
              
              {conversation.unread > 0 && (
                <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.unreadCount}>{conversation.unread}</Text>
                </View>
              )}
            </View>
          </View>
          
          <ChevronRight size={20} color={colors.lightText} />
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={[
          styles.searchInputContainer,
          { 
            backgroundColor: colorScheme === 'dark' ? colors.card : '#F5F5F5',
            borderColor: 'rgba(0,0,0,0.1)',
          }
        ]}>
          <Search size={20} color={colors.lightText} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search conversations"
            placeholderTextColor={colors.lightText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <ScrollView
        style={styles.conversationsList}
        contentContainerStyle={styles.conversationsContent}
        showsVerticalScrollIndicator={false}
      >
        {conversations.length > 0 ? (
          conversations
            .filter(conversation => 
              conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(conversation => renderConversationItem(conversation))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.lightText }]}>
              No conversations yet
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    height: '100%',
  },
  conversationsList: {
    flex: 1,
  },
  conversationsContent: {
    paddingHorizontal: 24,
  },
  conversationItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    flex: 1,
  },
  unreadText: {
    fontFamily: 'Inter-SemiBold',
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unreadCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});


// hello