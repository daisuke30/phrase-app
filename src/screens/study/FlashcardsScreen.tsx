import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import FlashcardComponent from '../../components/flashcard/FlashcardComponent';
import { updatePhraseProgress } from '../../store/slices/progressSlice';

// Sample phrases data for testing
const samplePhrases = [
  {
    id: '1',
    english: 'Hello, how are you?',
    russian: 'Привет, как дела?',
    pronunciation: 'Privet, kak dela?',
    meaning: 'Greeting and asking how someone is doing',
    example: 'A: Привет, как дела? B: Хорошо, спасибо! (Hello, how are you? Good, thanks!)',
    audioPath: '',
  },
  {
    id: '2',
    english: 'My name is...',
    russian: 'Меня зовут...',
    pronunciation: 'Menya zovut...',
    meaning: 'Introducing yourself by name',
    example: 'Меня зовут Иван. А как вас зовут? (My name is Ivan. And what is your name?)',
    audioPath: '',
  },
  {
    id: '3',
    english: 'I don\'t understand',
    russian: 'Я не понимаю',
    pronunciation: 'Ya ne ponimayu',
    meaning: 'Expressing that you don\'t understand something',
    example: 'Извините, я не понимаю. Вы можете говорить медленнее? (Sorry, I don\'t understand. Can you speak slower?)',
    audioPath: '',
  },
  {
    id: '4',
    english: 'Where is the restroom?',
    russian: 'Где туалет?',
    pronunciation: 'Gde tualet?',
    meaning: 'Asking for the location of a restroom',
    example: 'Извините, где туалет? (Excuse me, where is the restroom?)',
    audioPath: '',
  },
  {
    id: '5',
    english: 'How much does it cost?',
    russian: 'Сколько это стоит?',
    pronunciation: 'Skol\'ko eto stoit?',
    meaning: 'Asking about the price of something',
    example: 'Сколько стоит эта книга? (How much does this book cost?)',
    audioPath: '',
  },
];

const FlashcardsScreen = () => {
  const dispatch = useDispatch();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [remainingPhrases, setRemainingPhrases] = useState(samplePhrases);

  // Handle swipe left (need review)
  const handleSwipeLeft = (phrase) => {
    console.log('Need review:', phrase.id);
    
    // In a real app, we would update the phrase progress in Redux and Firebase
    dispatch(updatePhraseProgress({
      phraseId: phrase.id,
      progress: {
        level: 0, // Reset level for phrases that need review
        nextReviewDate: new Date().toISOString(),
        totalReviews: 1,
        lastReviewDate: new Date().toISOString(),
      }
    }));
  };

  // Handle swipe right (learned)
  const handleSwipeRight = (phrase) => {
    console.log('Learned:', phrase.id);
    
    // In a real app, we would update the phrase progress in Redux and Firebase
    dispatch(updatePhraseProgress({
      phraseId: phrase.id,
      progress: {
        level: 1, // Increase level for learned phrases
        nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Review in 24 hours
        totalReviews: 1,
        lastReviewDate: new Date().toISOString(),
      }
    }));
  };

  // Move to next card
  const handleNextCard = () => {
    if (currentPhraseIndex < remainingPhrases.length - 1) {
      setCurrentPhraseIndex(prevIndex => prevIndex + 1);
    } else {
      // All cards reviewed
      setIsStudying(false);
      setCurrentPhraseIndex(0);
      // In a real app, we would show completion stats here
    }
  };

  // Start the study session
  const startStudySession = () => {
    setIsStudying(true);
    setCurrentPhraseIndex(0);
    setRemainingPhrases(samplePhrases); // In a real app, we would filter phrases due for review
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isStudying ? (
        <View style={styles.startScreen}>
          <Text style={styles.title}>Flashcards</Text>
          <Text style={styles.subtitle}>Review your Russian phrases</Text>
          
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Today's Session</Text>
            <Text style={styles.statsText}>New phrases: {samplePhrases.length}</Text>
            <Text style={styles.statsText}>To review: 0</Text>
          </View>
          
          <Button 
            mode="contained" 
            style={styles.button}
            onPress={startStudySession}
          >
            Start Learning
          </Button>
        </View>
      ) : (
        <FlashcardComponent 
          phrase={remainingPhrases[currentPhraseIndex]}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onNextCard={handleNextCard}
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
  startScreen: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 30,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statsText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  button: {
    marginTop: 20,
    width: '80%',
    paddingVertical: 8,
  },
});

export default FlashcardsScreen;
