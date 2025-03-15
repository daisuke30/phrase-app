import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateNextReviewDate } from '../utils/srsAlgorithm';

// Key for storing progress data in AsyncStorage
const PROGRESS_STORAGE_KEY = '@phrase_app_progress';

// Interface for phrase progress data
export interface PhraseProgress {
  level: number;
  nextReviewDate: string | null;
  lastReviewDate: string | null;
  totalReviews: number;
}

// Interface for overall progress data
export interface ProgressData {
  [phraseId: string]: PhraseProgress;
}

// Save progress data to AsyncStorage
export const saveProgress = async (progressData: ProgressData): Promise<void> => {
  try {
    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
  } catch (error) {
    console.error('Error saving progress data:', error);
  }
};

// Load progress data from AsyncStorage
export const loadProgress = async (): Promise<ProgressData> => {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading progress data:', error);
    return {};
  }
};

// Update progress for a specific phrase
export const updatePhraseProgress = async (
  phraseId: string,
  isCorrect: boolean,
  progressData: ProgressData
): Promise<ProgressData> => {
  // Get current progress for the phrase or initialize it
  const currentProgress = progressData[phraseId] || {
    level: 0,
    nextReviewDate: null,
    lastReviewDate: null,
    totalReviews: 0,
  };

  // Update progress based on the answer
  const newLevel = isCorrect
    ? Math.min(currentProgress.level + 1, 7) // Max level is 7
    : Math.max(currentProgress.level - 1, 0); // Min level is 0

  // Calculate next review date based on new level
  const nextReviewDate = calculateNextReviewDate(newLevel);

  // Update the progress data
  const updatedProgress = {
    ...progressData,
    [phraseId]: {
      level: newLevel,
      nextReviewDate,
      lastReviewDate: new Date().toISOString(),
      totalReviews: currentProgress.totalReviews + 1,
    },
  };

  // Save the updated progress
  await saveProgress(updatedProgress);

  return updatedProgress;
};

// Get learning statistics
export const getLearningStats = (progressData: ProgressData) => {
  const now = new Date();
  let learned = 0;
  let reviewing = 0;

  Object.values(progressData).forEach(progress => {
    if (progress.level >= 4) {
      learned++;
    } else if (progress.level > 0) {
      reviewing++;
    }
  });

  return {
    totalLearned: learned,
    totalReviewing: reviewing,
    totalPhrases: Object.keys(progressData).length,
  };
};
