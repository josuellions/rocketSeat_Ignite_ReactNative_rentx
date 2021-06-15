import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { FirstStep } from '../screens/SignUp/FirstStep';
import { SecondStep } from '../screens/SignUp/SecondStep';
import { Confirmation } from '../screens/Confirmation';

export function AuthRoutes() {
  return(
    <Navigator headerMode="none" initialRouteName="Splash">
      <Screen 
        name="Splash"
        component={Splash}
      />
      <Screen 
        name="SignIn"
        component={SignIn}
      />
      <Screen 
        name="SignUpFirstStep"
        component={FirstStep}
      />
      <Screen 
        name="SignUpSecondStep"
        component={SecondStep}
      />
      <Screen 
        name="Confirmation"
        component={Confirmation}
      />
    </Navigator>
  )
}
 