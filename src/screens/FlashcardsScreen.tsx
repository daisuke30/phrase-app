import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import FlashcardComponent from '../components/flashcard/FlashcardComponent';
import {
  loadProgress,
  updatePhraseProgress,
  PhraseProgress,
  ProgressData,
} from '../services/progressService';
import { getPhrasesToReview } from '../utils/srsAlgorithm';

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
    english: "I don't understand",
    russian: 'Я не понимаю',
    pronunciation: 'Ya ne ponimayu',
    meaning: "Expressing that you don't understand something",
    example: 'Извините, я не понимаю. Вы можете говорить медленнее?',
  },
  {
    id: '4',
    english: 'Where is the restroom?',
    russian: 'Где туалет?',
    pronunciation: 'Gde tualet?',
    meaning: 'Asking for the location of a restroom',
    example: 'Извините, где туалет?',
  },
  {
    id: '5',
    english: 'How much does it cost?',
    russian: 'Сколько это стоит?',
    pronunciation: "Skol'ko eto stoit?",
    meaning: 'Asking about the price of something',
    example: 'Сколько стоит эта книга?',
  },
];

const FlashcardsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progressData, setProgressData] = useState<ProgressData>({});
  const [phrasesToReview, setPhrasesToReview] = useState(samplePhrases);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStudying, setIsStudying] = useState(false);

  // Load progress data on component mount
  useEffect(() => {
    const loadUserProgress = async () => {
      setIsLoading(true);
      const progress = await loadProgress();
      setProgressData(progress);

      // Get phrases that need to be reviewed
      const reviewPhrases = getPhrasesToReview(samplePhrases, progress);
      setPhrasesToReview(reviewPhrases);

      setIsLoading(false);
    };

    loadUserProgress();
  }, []);

  // Handle phrase learned
  const handleLearn = async (phraseId: string) => {
    const updatedProgress = await updatePhraseProgress(
      phraseId,
      true, // Correct/Learned
      progressData
    );
    setProgressData(updatedProgress);
    goToNextCard();
  };

  // Handle phrase needs review
  const handleReview = async (phraseId: string) => {
    const updatedProgress = await updatePhraseProgress(
      phraseId,
      false, // Incorrect/Needs review
      progressData
    );
    setProgressData(updatedProgress);
    goToNextCard();
  };

  // Go to next card or end session if all cards are reviewed
  const goToNextCard = () => {
    if (currentIndex < phrasesToReview.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of deck
      setIsStudying(false);
      setCurrentIndex(0);
      // Refresh the phrases to review
      setPhrasesToReview(getPhrasesToReview(samplePhrases, progressData));
    }
  };

  // Start study session
  const startStudy = () => {
    // Refresh the phrases to review before starting
    const refreshedPhrases = getPhrasesToReview(samplePhrases, progressData);
    setPhrasesToReview(refreshedPhrases);
    setIsStudying(true);
    setCurrentIndex(0);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1565C0" />
        <Text style={styles.loadingText}>Loading phrases...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isStudying ? (
        // Start screen
        <View style={styles.startContainer}>
          <Text style={styles.title}>Russian Flashcards</Text>
          <Text style={styles.subtitle}>Learn essential Russian phrases</Text>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Today's Session</Text>
            <Text style={styles.statsText}>Phrases to review: {phrasesToReview.length}</Text>
            <Text style={styles.statsText}>Total phrases: {samplePhrases.length}</Text>
          </View>

          {phrasesToReview.length > 0 ? (
            <TouchableOpacity style={styles.startButton} onPress={startStudy}>
              <Text style={styles.startButtonText}>Start Learning</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.completedContainer}>
              <Text style={styles.completedText}>All caught up!</Text>
              <Text style={styles.completedSubtext}>No phrases to review at the moment.</Text>
            </View>
          )}
        </View>
      ) : (
        // Flashcard study mode
        phrasesToReview.length > 0 && (
          <FlashcardComponent
            phrase={phrasesToReview[currentIndex]}
            onLearn={handleLearn}
            onReview={handleReview}
          />
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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
    marginBottom: 5,
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
  completedContainer: {
    alignItems: 'center',
    padding: 20,
  },
  completedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  completedSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default FlashcardsScreen;
