import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../api/firebase';

// Import navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // For development: Always set to authenticated
    setIsAuthenticated(true);

    // For production: Use Firebase auth
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   setIsAuthenticated(!!user);
    // });
    // return () => unsubscribe();
  }, []);

  // During initial loading
  if (isAuthenticated === null) {
    return null; // Or show a LoadingScreen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
