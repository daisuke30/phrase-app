import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadProgress } from '../services/progressService';
import { getLearningStats } from '../services/progressService';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState({
    totalLearned: 0,
    totalReviewing: 0,
    totalPhrases: 0,
  });

  // Load progress data to display stats
  useEffect(() => {
    const loadStats = async () => {
      const progress = await loadProgress();
      const learningStats = getLearningStats(progress);
      setStats(learningStats);
    };

    loadStats();

    // Set up a listener for when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadStats();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Phrase App</Text>
        <Text style={styles.subtitle}>Learn Russian with ease</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Your Progress</Text>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalLearned}</Text>
            <Text style={styles.statLabel}>Learned</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalReviewing}</Text>
            <Text style={styles.statLabel}>Reviewing</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalPhrases}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Study' as never)}
      >
        <Text style={styles.startButtonText}>Start Learning</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  startButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
