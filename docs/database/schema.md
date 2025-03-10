# Phrase App Database Design

## Collection Structure

### users

| Field Name                 | Type      | Description                 |
| -------------------------- | --------- | --------------------------- |
| id                         | string    | User ID (Firebase Auth UID) |
| email                      | string    | Email address               |
| displayName                | string    | Display name (optional)     |
| settings                   | object    | User settings               |
| settings.targetLanguage    | string    | Learning target language    |
| settings.interfaceLanguage | string    | UI language                 |
| settings.dailyGoal         | number    | Daily target card count     |
| settings.notifications     | boolean   | Notification settings       |
| createdAt                  | timestamp | Account creation date       |
| lastLoginAt                | timestamp | Last login date             |

### languages

| Field Name  | Type    | Description                            |
| ----------- | ------- | -------------------------------------- |
| id          | string  | Language ID (e.g., "russian")          |
| nativeName  | string  | Native language name (e.g., "Русский") |
| englishName | string  | English name (e.g., "Russian")         |
| description | string  | Description text                       |
| isActive    | boolean | Availability flag                      |
| order       | number  | Display order                          |
| phraseCount | number  | Number of phrases                      |

### phrases

| Field Name     | Type      | Description                                |
| -------------- | --------- | ------------------------------------------ |
| id             | string    | Phrase ID                                  |
| languageId     | string    | Language ID                                |
| english        | string    | English expression                         |
| targetLanguage | string    | Target language expression (e.g., Russian) |
| pronunciation  | string    | Pronunciation guide                        |
| meaning        | string    | Meaning/explanation                        |
| example        | string    | Usage example                              |
| category       | string    | Category (e.g., "greetings")               |
| difficulty     | number    | Difficulty level (1-5)                     |
| audioPath      | string    | Audio file path                            |
| createdAt      | timestamp | Creation date                              |
| updatedAt      | timestamp | Last update date                           |

### userProgress

| Field Name                              | Type      | Description                             |
| --------------------------------------- | --------- | --------------------------------------- |
| id                                      | string    | Progress ID (e.g., "userId_languageId") |
| userId                                  | string    | User ID                                 |
| languageId                              | string    | Language ID                             |
| phraseProgress                          | object    | Progress by phrase                      |
| phraseProgress[phraseId].level          | number    | SRS level (0-7)                         |
| phraseProgress[phraseId].nextReviewDate | timestamp | Next review date                        |
| phraseProgress[phraseId].totalReviews   | number    | Number of reviews                       |
| phraseProgress[phraseId].lastReviewDate | timestamp | Last review date                        |
| phraseProgress[phraseId].notes          | string    | User notes (optional)                   |
| stats                                   | object    | Learning statistics                     |
| stats.totalLearned                      | number    | Number of mastered phrases              |
| stats.totalReviewing                    | number    | Number of phrases under review          |
| stats.streakDays                        | number    | Consecutive learning days               |
| stats.lastStudyDate                     | timestamp | Last study date                         |
| createdAt                               | timestamp | Creation date                           |
| updatedAt                               | timestamp | Last update date                        |
