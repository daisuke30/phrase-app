import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PhrasesLibraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phrases Library</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
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
});

export default PhrasesLibraryScreen;
