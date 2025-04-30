import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  useColorScheme,
  Switch,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Card from '@/components/Card';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import { Bell, Star, Wallet, ChartBar as BarChart, CalendarClock, User } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data
const notifications = 3;
const pendingRequests = 2;
const completedJobs = 15;
const rating = 4.8;
const totalEarnings = 1250;
const weeklyEarnings = 380;

export default function HomeScreen() {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const [isAvailable, setIsAvailable] = useState(true);
  
  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.welcome, { color: colors.text }]}>Welcome back,</Text>
            <Text style={[styles.name, { color: colors.text }]}>John Smith</Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={[
                styles.notificationButton, 
                { backgroundColor: colorScheme === 'dark' ? colors.card : '#F5F5F5' }
              ]}
            >
              <Bell size={20} color={colors.text} />
              {notifications > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>{notifications}</Text>
                </View>
              )}
            </TouchableOpacity>
            <Avatar source="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" size="small" />
          </View>
        </View>
        
        <Card style={styles.availabilityCard}>
          <View style={styles.availabilityContent}>
            <View>
              <Text style={[
                styles.availabilityLabel, 
                { color: colors.text }
              ]}>
                Your Status
              </Text>
              
              <StatusBadge 
                status={isAvailable ? 'online' : 'offline'} 
                style={styles.statusBadge}
              />
            </View>
            
            <View style={styles.switchContainer}>
              <Text style={[
                styles.switchLabel, 
                { color: colors.lightText }
              ]}>
                {isAvailable ? 'Available for work' : 'Unavailable'}
              </Text>
              <Switch
                value={isAvailable}
                onValueChange={toggleAvailability}
                trackColor={{ 
                  false: '#767577', 
                  true: 'rgba(51, 102, 255, 0.4)'
                }}
                thumbColor={isAvailable ? colors.primary : '#f4f3f4'}
              />
            </View>
          </View>
        </Card>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Dashboard
        </Text>
        
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={[styles.iconWrapper, { backgroundColor: 'rgba(255, 149, 0, 0.12)' }]}>
              <CalendarClock size={20} color="#FF9500" />
            </View>
            <Text style={styles.statValue}>{pendingRequests}</Text>
            <Text style={[styles.statLabel, { color: colors.lightText }]}>
              Pending Requests
            </Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={[styles.iconWrapper, { backgroundColor: 'rgba(0, 194, 203, 0.12)' }]}>
              <User size={20} color="#00C2CB" />
            </View>
            <Text style={styles.statValue}>{completedJobs}</Text>
            <Text style={[styles.statLabel, { color: colors.lightText }]}>
              Completed Jobs
            </Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={[styles.iconWrapper, { backgroundColor: 'rgba(52, 199, 89, 0.12)' }]}>
              <Star size={20} color="#34C759" />
            </View>
            <Text style={styles.statValue}>{rating}</Text>
            <Text style={[styles.statLabel, { color: colors.lightText }]}>
              Rating
            </Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={[styles.iconWrapper, { backgroundColor: 'rgba(51, 102, 255, 0.12)' }]}>
              <Wallet size={20} color="#3366FF" />
            </View>
            <Text style={styles.statValue}>${totalEarnings}</Text>
            <Text style={[styles.statLabel, { color: colors.lightText }]}>
              Total Earnings
            </Text>
          </Card>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Weekly Summary
        </Text>
        
        <Card style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={[styles.summaryTitle, { color: colors.text }]}>
                This Week's Earnings
              </Text>
              <Text style={[styles.summaryValue, { color: colors.primary }]}>
                ${weeklyEarnings}
              </Text>
            </View>
            <BarChart size={24} color={colors.primary} />
          </View>
          
          <View style={styles.summaryStats}>
            <View style={styles.summaryStatItem}>
              <Text style={[styles.statCount, { color: colors.text }]}>3</Text>
              <Text style={[styles.statDesc, { color: colors.lightText }]}>
                Completed
              </Text>
            </View>
            <View style={styles.summaryStatItem}>
              <Text style={[styles.statCount, { color: colors.text }]}>2</Text>
              <Text style={[styles.statDesc, { color: colors.lightText }]}>
                Pending
              </Text>
            </View>
            <View style={styles.summaryStatItem}>
              <Text style={[styles.statCount, { color: colors.text }]}>0</Text>
              <Text style={[styles.statDesc, { color: colors.lightText }]}>
                Cancelled
              </Text>
            </View>
          </View>
        </Card>
        
        <View style={styles.spacer} />
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
  welcome: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  availabilityCard: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
  availabilityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  statusBadge: {
    marginVertical: 4,
  },
  switchContainer: {
    alignItems: 'flex-end',
  },
  switchLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
  },
  statCard: {
    width: (width - 64) / 2,
    margin: 8,
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  summaryCard: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 4,
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 16,
  },
  summaryStatItem: {
    alignItems: 'center',
  },
  statCount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginBottom: 4,
  },
  statDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  spacer: {
    height: 20,
  },
});