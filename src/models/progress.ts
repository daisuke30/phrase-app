export interface PhraseProgress {
  level: number;
  nextReviewDate: string | null;
  totalReviews: number;
  lastReviewDate: string | null;
  notes?: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  languageId: string;
  phraseProgress: {
    [phraseId: string]: PhraseProgress;
  };
  stats: {
    totalLearned: number;
    totalReviewing: number;
    streakDays: number;
    lastStudyDate: string | null;
  };
  createdAt: string;
  updatedAt: string;
}
