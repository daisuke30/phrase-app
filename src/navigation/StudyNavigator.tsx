import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StudyStackParamList } from './types';
import FlashcardsScreen from '../screens/FlashcardsScreen';

const Stack = createStackNavigator<StudyStackParamList>();

const StudyNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Flashcards" 
        component={FlashcardsScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StudyNavigator;
