import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import FlashcardComponent from '../components/flashcard/FlashcardComponent';

// Sample phrases data
const samplePhrases = [
  {
    id: '1',
    english: 'Hello, how are you?',
    russian: 'Привет, как дела?',
    pronunciation: 'Privet, kak dela?',
    meaning: 'Greeting and asking how someone is doing',
    example: 'A: Привет, как дела? B: Хорошо, спасибо!',
  },
  {
    id: '2',
    english: 'My name is...',
    russian: 'Меня зовут...',
    pronunciation: 'Menya zovut...',
    meaning: 'Introducing yourself by name',
    example: 'Меня зовут Иван. А как вас зовут?',
  },
  {
    id: '3',
    english: 'I don\'t understand',
    russian: 'Я не понимаю',
    pronunciation: 'Ya ne ponimayu',
    meaning: 'Expressing that you don\'t understand something',
    example: 'Извините, я не понимаю. Вы можете говорить медленнее?',
  },
];

const FlashcardsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  
  // Handle phrase learned
  const handleLearn = (phraseId: string) => {
    console.log('Learned:', phraseId);
    goToNextCard();
  };
  
  // Handle phrase needs review
  const handleReview = (phraseId: string) => {
    console.log('Needs review:', phraseId);
    goToNextCard();
  };
  
  // Go to next card or end session if all cards are reviewed
  const goToNextCard = () => {
    if (currentIndex < samplePhrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of deck
      setIsStudying(false);
      setCurrentIndex(0);
    }
  };
  
  // Start study session
  const startStudy = () => {
    setIsStudying(true);
    setCurrentIndex(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isStudying ? (
        // Start screen
        <View style={styles.startContainer}>
          <Text style={styles.title}>Russian Flashcards</Text>
          <Text style={styles.subtitle}>Learn essential Russian phrases</Text>
          
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Today's Session</Text>
            <Text style={styles.statsText}>Total phrases: {samplePhrases.length}</Text>
          </View>
          
          <TouchableOpacity style={styles.startButton} onPress={startStudy}>
            <Text style={styles.startButtonText}>Start Learning</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Flashcard study mode
        <FlashcardComponent 
          phrase={samplePhrases[currentIndex]}
          onLearn={handleLearn}
          onReview={handleReview}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  startContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    width: '100%',
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
    marginBottom: 10,
  },
  statsText: {
    fontSize: 16,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FlashcardsScreen;
