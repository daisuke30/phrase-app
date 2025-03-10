import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Switch, Divider, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateUserSettings } from '../../store/slices/userSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const settings = currentUser?.settings || {
    notifications: false,
    dailyGoal: 20,
    targetLanguage: 'russian',
    interfaceLanguage: 'english',
  };

  const toggleNotifications = () => {
    dispatch(updateUserSettings({ notifications: !settings.notifications }));
  };

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>General Settings</List.Subheader>

        <List.Item
          title="Notifications"
          description="Receive daily reminders"
          left={props => <List.Icon {...props} icon="bell" />}
          right={() => (
            <Switch value={settings.notifications} onValueChange={toggleNotifications} />
          )}
        />

        <Divider />

        <List.Item
          title="Daily Goal"
          description={`${settings.dailyGoal} phrases per day`}
          left={props => <List.Icon {...props} icon="flag" />}
          onPress={() => {
            /* Open daily goal selector */
          }}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Language Settings</List.Subheader>

        <List.Item
          title="Target Language"
          description="Russian"
          left={props => <List.Icon {...props} icon="translate" />}
          onPress={() => {
            /* Open language selector */
          }}
        />

        <Divider />

        <List.Item
          title="Interface Language"
          description="English"
          left={props => <List.Icon {...props} icon="text" />}
          onPress={() => {
            /* Open interface language selector */
          }}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Account</List.Subheader>

        <List.Item
          title="Sign Out"
          left={props => <List.Icon {...props} icon="logout" color="#B00020" />}
          onPress={() => {
            /* Sign out logic */
          }}
        />
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
});

export default SettingsScreen;
