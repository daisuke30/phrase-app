import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StudyStackParamList } from './types';

// import screens
import FlashcardsScreen from '../screens/study/FlashcardsScreen';
import PhrasesLibraryScreen from '../screens/study/PhrasesLibraryScreen';
import StudyStatsScreen from '../screens/study/StudyStatsScreen';

const Stack = createStackNavigator<StudyStackParamList>();

const StudyNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
      <Stack.Screen name="PhrasesLibrary" component={PhrasesLibraryScreen} />
      <Stack.Screen name="StudyStats" component={StudyStatsScreen} />
    </Stack.Navigator>
  );
};

export default StudyNavigator;
