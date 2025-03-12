import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const SettingsScreen = () => {
  const [dailyGoal, setDailyGoal] = useState(20);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // Toggle settings
  const toggleNotifications = () => setNotifications(previousState => !previousState);
  const toggleDarkMode = () => setDarkMode(previousState => !previousState);
  
  // Adjust daily goal
  const adjustDailyGoal = (amount: number) => {
    const newValue = Math.max(5, Math.min(50, dailyGoal + amount));
    setDailyGoal(newValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Study Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Daily Goal</Text>
            <View style={styles.goalAdjuster}>
              <TouchableOpacity 
                style={styles.goalButton} 
                onPress={() => adjustDailyGoal(-5)}
              >
                <Text style={styles.goalButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.goalValue}>{dailyGoal} cards</Text>
              <TouchableOpacity 
                style={styles.goalButton} 
                onPress={() => adjustDailyGoal(5)}
              >
                <Text style={styles.goalButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={toggleNotifications}
              ios_backgroundColor="#ccc"
            />
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              ios_backgroundColor="#ccc"
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>
        
        <View style={styles.aboutContainer}>
          <Text style={styles.versionText}>Phrase App v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    marginTop: 20,
    marginBottom: 30,
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#444',
  },
  goalAdjuster: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalButton: {
    width: 30,
    height: 30,
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  goalValue: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#444',
    minWidth: 70,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aboutContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  versionText: {
    color: '#888',
    fontSize: 14,
  },
});

export default SettingsScreen;
