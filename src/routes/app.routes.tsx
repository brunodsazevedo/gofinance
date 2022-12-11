import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AppTabRoutes } from './app.tab.routes'
import { NewBank } from '../screens/NewBank';
import { BankCredentials } from '../screens/BankCredentials';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name="Home"
        component={AppTabRoutes}
      />

      <Screen
        name="NewBank"
        component={NewBank}
      />

      <Screen
        name="BankCredentials"
        component={BankCredentials}
      />
    </Navigator>
  );
}
