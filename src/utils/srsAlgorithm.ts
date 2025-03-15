// SRS (Spaced Repetition System) algorithm for optimizing review timing

// Define the intervals for each level (in hours)
// As the level increases, the review interval gets longer
export const SRS_INTERVALS = [
  4, // Level 0: 4 hours
  8, // Level 1: 8 hours
  24, // Level 2: 1 day
  72, // Level 3: 3 days
  168, // Level 4: 1 week
  336, // Level 5: 2 weeks
  730, // Level 6: 1 month
  2190, // Level 7: 3 months
];

// Calculate the next review date based on the current level
export const calculateNextReviewDate = (level: number): string => {
  // Get the interval for the current level (in hours)
  const intervalHours =
    level < SRS_INTERVALS.length ? SRS_INTERVALS[level] : SRS_INTERVALS[SRS_INTERVALS.length - 1];

  // Calculate the next review date
  const now = new Date();
  const nextReviewDate = new Date(now.getTime() + intervalHours * 60 * 60 * 1000);

  return nextReviewDate.toISOString();
};

// Determine if a phrase is due for review
export const isDueForReview = (nextReviewDate: string | null): boolean => {
  if (!nextReviewDate) return true; // New phrases are always due for review

  const now = new Date();
  const reviewDate = new Date(nextReviewDate);

  return now >= reviewDate;
};

// Get phrases that are due for review from a list of phrases with progress
export const getPhrasesToReview = (phrases: any[], progressData: Record<string, any>): any[] => {
  return phrases.filter(phrase => {
    const progress = progressData[phrase.id];
    // Include the phrase if there's no progress yet or if it's due for review
    return !progress || isDueForReview(progress.nextReviewDate);
  });
};
