import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  useColorScheme,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Card from '@/components/Card';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import StatusBadge from '@/components/StatusBadge';
import { Star, Calendar, FileCheck, MapPin, DollarSign, ChevronRight, Bell, Lock, CircleHelp as HelpCircle, LogOut, Camera, CreditCard as Edit } from 'lucide-react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const [isAvailable, setIsAvailable] = useState(true);
  
  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => {
            // Perform logout action and navigate to login screen
            router.replace('/(auth)/login');
          },
          style: "destructive"
        }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Avatar 
                source="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                size="large"
                showStatus
                status={isAvailable ? 'online' : 'offline'}
              />
              <TouchableOpacity 
                style={[
                  styles.editAvatarButton,
                  { backgroundColor: colors.primary }
                ]}
              >
                <Camera size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={[styles.profileName, { color: colors.text }]}>
                  John Smith
                </Text>
                <TouchableOpacity>
                  <Edit size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.profileEmail, { color: colors.lightText }]}>
                john.smith@example.com
              </Text>
              <Text style={[styles.profileService, { color: colors.text }]}>
                Plumbing Professional
              </Text>
              
              <StatusBadge 
                status={isAvailable ? 'online' : 'offline'} 
                style={styles.statusBadge}
              />
            </View>
          </View>
          
          <View style={styles.availabilityContainer}>
            <Text style={[styles.availabilityText, { color: colors.text }]}>
              Available for service
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
        
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <Star size={20} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>4.8</Text>
              <Text style={[styles.statLabel, { color: colors.lightText }]}>
                Rating
              </Text>
            </View>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <Calendar size={20} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>15</Text>
              <Text style={[styles.statLabel, { color: colors.lightText }]}>
                Jobs
              </Text>
            </View>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <FileCheck size={20} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>2</Text>
              <Text style={[styles.statLabel, { color: colors.lightText }]}>
                Docs
              </Text>
            </View>
          </Card>
        </View>
        
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MapPin size={16} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.lightText }]}>
              Location:
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              San Francisco, CA
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <DollarSign size={16} color={colors.primary} />
            <Text style={[styles.infoLabel, { color: colors.lightText }]}>
              Hourly Rate:
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              $85/hour
            </Text>
          </View>
        </Card>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        
        <Card style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Edit size={20} color={colors.primary} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Edit Profile
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <FileCheck size={20} color={colors.primary} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Documents & Certifications
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Bell size={20} color={colors.primary} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Notifications
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Lock size={20} color={colors.primary} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Security
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>
        </Card>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
        
        <Card style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <HelpCircle size={20} color={colors.primary} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                Help & Support
              </Text>
            </View>
            <ChevronRight size={20} color={colors.lightText} />
          </TouchableOpacity>
        </Card>
        
        <Button
          title="Log Out"
          type="outline"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {
    marginVertical: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginRight: 8,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 2,
  },
  profileService: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginTop: 4,
  },
  statusBadge: {
    marginTop: 8,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  availabilityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    margin: 4,
    padding: 12,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginTop: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  infoCard: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 8,
    width: 100,
  },
  infoValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  menuCard: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  logoutButton: {
    marginTop: 8,
  },
});