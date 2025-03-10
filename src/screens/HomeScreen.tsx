import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HomeScreen = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { userProgress } = useSelector((state: RootState) => state.progress);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Phrase App</Text>
      <Text style={styles.subtitle}>Learn Russian with simple flashcards</Text>

      {currentUser && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          <Text>Total Phrases: {userProgress?.stats.totalLearned || 0} / 500</Text>
          <Text>Current Streak: {userProgress?.stats.streakDays || 0} days</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1565C0',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  statsContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

export default HomeScreen;
