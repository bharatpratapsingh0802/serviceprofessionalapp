import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Card from '@/components/Card';
import { Calendar, TrendingUp, ArrowRight, Check, Clock } from 'lucide-react-native';

// Mock data
const totalEarnings = 1250;
const pendingPayout = 380;
const currentWeekEarnings = 240;
const previousWeekEarnings = 180;
const growthPercentage = 33.3;

const transactions = [
  {
    id: '1',
    customerName: 'Emma Wilson',
    serviceName: 'Plumbing Service',
    amount: 85,
    status: 'paid',
    date: '2025-05-10',
  },
  {
    id: '2',
    customerName: 'Marcus Chen',
    serviceName: 'Bathroom Repair',
    amount: 120,
    status: 'pending',
    date: '2025-05-09',
  },
  {
    id: '3',
    customerName: 'Sarah Johnson',
    serviceName: 'Toilet Repair',
    amount: 95,
    status: 'paid',
    date: '2025-05-05',
  },
  {
    id: '4',
    customerName: 'Jason Miller',
    serviceName: 'Sink Installation',
    amount: 150,
    status: 'paid',
    date: '2025-05-02',
  },
];

export default function EarningsScreen() {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const [period, setPeriod] = useState('week');
  
  const getPeriodData = () => {
    switch (period) {
      case 'week':
        return {
          current: currentWeekEarnings,
          previous: previousWeekEarnings,
          growth: growthPercentage,
          label: 'This Week vs Last Week',
        };
      case 'month':
        return {
          current: 950,
          previous: 720,
          growth: 31.9,
          label: 'This Month vs Last Month',
        };
      case 'year':
        return {
          current: 5200,
          previous: 3800,
          growth: 36.8,
          label: 'This Year vs Last Year',
        };
      default:
        return {
          current: currentWeekEarnings,
          previous: previousWeekEarnings,
          growth: growthPercentage,
          label: 'This Week vs Last Week',
        };
    }
  };
  
  const periodData = getPeriodData();
  
  const renderTransactionItem = (transaction: any) => {
    return (
      <View 
        key={transaction.id} 
        style={[
          styles.transactionItem,
          { borderBottomColor: 'rgba(0,0,0,0.1)' }
        ]}
      >
        <View style={styles.transactionDetails}>
          <View>
            <Text style={[styles.customerName, { color: colors.text }]}>
              {transaction.customerName}
            </Text>
            <Text style={[styles.serviceName, { color: colors.lightText }]}>
              {transaction.serviceName}
            </Text>
          </View>
          
          <View style={styles.transactionRight}>
            <Text style={[styles.amount, { color: colors.text }]}>
              ${transaction.amount}
            </Text>
            <View style={styles.statusContainer}>
              {transaction.status === 'paid' ? (
                <Check size={14} color={colors.success} />
              ) : (
                <Clock size={14} color={colors.warning} />
              )}
              <Text 
                style={[
                  styles.status, 
                  { 
                    color: transaction.status === 'paid' 
                      ? colors.success 
                      : colors.warning
                  }
                ]}
              >
                {transaction.status === 'paid' ? 'Paid' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Earnings</Text>
      </View>
      
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCards}>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
              <View style={[
                styles.summaryIcon, 
                { backgroundColor: 'rgba(51, 102, 255, 0.1)' }
              ]}>
                <TrendingUp size={20} color={colors.primary} />
              </View>
            </View>
            <Text style={[styles.summaryLabel, { color: colors.lightText }]}>
              Total Earnings
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              ${totalEarnings}
            </Text>
          </Card>
          
          <Card style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
              <View style={[
                styles.summaryIcon,
                { backgroundColor: 'rgba(255, 149, 0, 0.1)' }
              ]}>
                <Clock size={20} color={colors.warning} />
              </View>
            </View>
            <Text style={[styles.summaryLabel, { color: colors.lightText }]}>
              Pending Payout
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              ${pendingPayout}
            </Text>
          </Card>
        </View>
        
        <Card style={styles.periodCard}>
          <View style={styles.periodHeader}>
            <Text style={[styles.periodTitle, { color: colors.text }]}>
              Earnings Analysis
            </Text>
            <View style={styles.periodTabs}>
              <TouchableOpacity
                style={[
                  styles.periodTab,
                  period === 'week' && [
                    styles.activePeriodTab,
                    { backgroundColor: colors.primary }
                  ]
                ]}
                onPress={() => setPeriod('week')}
              >
                <Text
                  style={[
                    styles.periodTabText,
                    period === 'week' ? styles.activePeriodTabText : { color: colors.lightText }
                  ]}
                >
                  Week
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.periodTab,
                  period === 'month' && [
                    styles.activePeriodTab,
                    { backgroundColor: colors.primary }
                  ]
                ]}
                onPress={() => setPeriod('month')}
              >
                <Text
                  style={[
                    styles.periodTabText,
                    period === 'month' ? styles.activePeriodTabText : { color: colors.lightText }
                  ]}
                >
                  Month
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.periodTab,
                  period === 'year' && [
                    styles.activePeriodTab,
                    { backgroundColor: colors.primary }
                  ]
                ]}
                onPress={() => setPeriod('year')}
              >
                <Text
                  style={[
                    styles.periodTabText,
                    period === 'year' ? styles.activePeriodTabText : { color: colors.lightText }
                  ]}
                >
                  Year
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.periodContent}>
            <View style={styles.periodStats}>
              <View>
                <Text style={[styles.periodLabel, { color: colors.lightText }]}>
                  Current
                </Text>
                <Text style={[styles.periodValue, { color: colors.text }]}>
                  ${periodData.current}
                </Text>
              </View>
              
              <View>
                <Text style={[styles.periodLabel, { color: colors.lightText }]}>
                  Previous
                </Text>
                <Text style={[styles.periodValue, { color: colors.text }]}>
                  ${periodData.previous}
                </Text>
              </View>
              
              <View>
                <Text style={[styles.periodLabel, { color: colors.lightText }]}>
                  Growth
                </Text>
                <Text style={[styles.periodValue, { color: colors.success }]}>
                  +{periodData.growth.toFixed(1)}%
                </Text>
              </View>
            </View>
            
            <Text style={[styles.comparisonLabel, { color: colors.lightText }]}>
              {periodData.label}
            </Text>
          </View>
        </Card>
        
        <View style={styles.transactionsHeader}>
          <Text style={[styles.transactionsTitle, { color: colors.text }]}>
            Recent Transactions
          </Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>
              View All
            </Text>
            <ArrowRight size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        {transactions.map(transaction => renderTransactionItem(transaction))}
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  summaryIconContainer: {
    marginBottom: 8,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
  },
  periodCard: {
    marginBottom: 24,
  },
  periodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  periodTabs: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  periodTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activePeriodTab: {
    backgroundColor: '#3366FF',
  },
  periodTabText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  activePeriodTabText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  periodContent: {
    paddingTop: 8,
  },
  periodStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  periodLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  periodValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  comparisonLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 8,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginRight: 4,
  },
  transactionItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  customerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  serviceName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
});