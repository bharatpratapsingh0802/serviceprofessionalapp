import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Card from '@/components/Card';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import { Calendar, MapPin, Clock, DollarSign } from 'lucide-react-native';

// Mock data
const bookingRequests = [
  {
    id: '1',
    customerName: 'Emma Wilson',
    customerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    serviceName: 'Plumbing Service',
    status: 'pending',
    date: '2025-05-10',
    time: '10:00 AM',
    location: '123 Main St, Anytown',
    price: 85,
    description: 'Leaking kitchen sink needs repair',
  },
  {
    id: '2',
    customerName: 'Marcus Chen',
    customerAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    serviceName: 'Plumbing Service',
    status: 'pending',
    date: '2025-05-12',
    time: '2:30 PM',
    location: '456 Oak Ave, Anytown',
    price: 120,
    description: 'Bathroom shower installation',
  },
];

const historyBookings = [
  {
    id: '3',
    customerName: 'Sarah Johnson',
    customerAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    serviceName: 'Plumbing Service',
    status: 'completed',
    date: '2025-05-05',
    time: '1:00 PM',
    location: '789 Pine St, Anytown',
    price: 95,
    description: 'Fixed clogged toilet',
  },
  {
    id: '4',
    customerName: 'David Thompson',
    customerAvatar: null,
    serviceName: 'Plumbing Service',
    status: 'canceled',
    date: '2025-05-03',
    time: '9:00 AM',
    location: '321 Elm St, Anytown',
    price: 75,
    description: 'Sink installation - canceled by customer',
  },
];

export default function BookingsScreen() {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const [activeTab, setActiveTab] = useState('requests');
  
  const renderBookingItem = (booking: any, showActions = false) => {
    return (
      <Card key={booking.id} style={styles.bookingCard}>
        <View style={styles.bookingHeader}>
          <View style={styles.customerInfo}>
            <Avatar source={booking.customerAvatar} name={booking.customerName} size="small" />
            <View style={styles.customerNameContainer}>
              <Text style={[styles.customerName, { color: colors.text }]}>
                {booking.customerName}
              </Text>
              <Text style={[styles.serviceName, { color: colors.lightText }]}>
                {booking.serviceName}
              </Text>
            </View>
          </View>
          <StatusBadge status={booking.status} />
        </View>
        
        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Calendar size={16} color={colors.lightText} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {booking.date}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Clock size={16} color={colors.lightText} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {booking.time}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <MapPin size={16} color={colors.lightText} />
            <Text style={[styles.detailText, { color: colors.text }]}>
              {booking.location}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <DollarSign size={16} color={colors.lightText} />
            <Text style={[styles.detailText, { color: colors.primary }]}>
              ${booking.price}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.description, { color: colors.text }]}>
          {booking.description}
        </Text>
        
        {showActions && (
          <View style={styles.actions}>
            <Button
              title="Accept"
              type="primary"
              size="small"
              onPress={() => {}}
              style={styles.actionButton}
            />
            <Button
              title="Decline"
              type="outline"
              size="small"
              onPress={() => {}}
              style={styles.actionButton}
            />
          </View>
        )}
      </Card>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Bookings</Text>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'requests' && [
              styles.activeTab,
              { borderBottomColor: colors.primary }
            ]
          ]}
          onPress={() => setActiveTab('requests')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'requests' ? { color: colors.primary } : { color: colors.lightText }
            ]}
          >
            Requests
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'history' && [
              styles.activeTab,
              { borderBottomColor: colors.primary }
            ]
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' ? { color: colors.primary } : { color: colors.lightText }
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'requests' ? (
          <>
            {bookingRequests.length > 0 ? (
              bookingRequests.map(booking => renderBookingItem(booking, true))
            ) : (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyText, { color: colors.lightText }]}>
                  No booking requests at the moment
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            {historyBookings.length > 0 ? (
              historyBookings.map(booking => renderBookingItem(booking))
            ) : (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyText, { color: colors.lightText }]}>
                  No booking history yet
                </Text>
              </View>
            )}
          </>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  bookingCard: {
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerNameContainer: {
    marginLeft: 12,
  },
  customerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 2,
  },
  serviceName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
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