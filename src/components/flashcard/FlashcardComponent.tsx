import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

// Define props interface for the component
interface PhraseProps {
  id: string;
  english: string;
  russian: string;
  pronunciation: string;
  meaning: string;
  example: string;
}

interface FlashcardProps {
  phrase: PhraseProps;
  onLearn: (phraseId: string) => void;
  onReview: (phraseId: string) => void;
}

const { width, height } = Dimensions.get('window');

const FlashcardComponent: React.FC<FlashcardProps> = ({
  phrase,
  onLearn,
  onReview,
}) => {
  // State to track if card is flipped
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Handle card tap to flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <View style={styles.container}>
      {/* Flashcard */}
      <TouchableWithoutFeedback onPress={handleFlip}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            {!isFlipped ? (
              // Front side: English phrase
              <View style={styles.cardFace}>
                <Text style={styles.englishText}>{phrase.english}</Text>
                <Text style={styles.instructionText}>Tap to see translation</Text>
              </View>
            ) : (
              // Back side: Russian phrase and details
              <View style={styles.cardFace}>
                <Text style={styles.russianText}>{phrase.russian}</Text>
                <Text style={styles.pronunciationText}>{phrase.pronunciation}</Text>
                <Text style={styles.meaningText}>{phrase.meaning}</Text>
                
                <View style={styles.exampleContainer}>
                  <Text style={styles.exampleTitle}>Example:</Text>
                  <Text style={styles.exampleText}>{phrase.example}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Control buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.reviewButton]}
          onPress={() => onReview(phrase.id)}
        >
          <Text style={styles.buttonText}>Need Review</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.learnButton]}
          onPress={() => onLearn(phrase.id)}
        >
          <Text style={styles.buttonText}>Learned</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: width - 40,
    height: height * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardFace: {
    width: '100%',
    alignItems: 'center',
  },
  englishText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  russianText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1565C0',
  },
  pronunciationText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  meaningText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  exampleContainer: {
    width: '100%',
    marginTop: 10,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  exampleText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButton: {
    backgroundColor: '#FF6B6B',
  },
  learnButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FlashcardComponent;
