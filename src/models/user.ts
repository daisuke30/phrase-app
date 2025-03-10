export interface User {
  id: string;
  email: string;
  displayName?: string;
  settings: {
    targetLanguage: string;
    interfaceLanguage: string;
    dailyGoal: number;
    notifications: boolean;
  };
  createdAt: string;
  lastLoginAt: string;
}
