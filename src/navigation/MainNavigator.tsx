import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
// Expo icons are included in the expo package
import { MaterialIcons } from '@expo/vector-icons';

// Import screens (still placeholders)
import HomeScreen from '../screens/HomeScreen';
import StudyNavigator from './StudyNavigator';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Study') {
            iconName = 'school';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else {
            iconName = 'help';
          }

          return <MaterialIcons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Study" component={StudyNavigator} />
      <Tab.Screen name="Settings" component={SettingsSimeen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
