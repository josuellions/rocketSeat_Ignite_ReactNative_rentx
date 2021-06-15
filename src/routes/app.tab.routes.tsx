import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

import HomeSvg  from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { useTheme } from 'styled-components';
import { AppStackRoutes } from './app.stack.routes';

import { MyCars } from '../screens/MyCars';
import { Platform } from 'react-native';
import { Profile } from '../screens/Profile';


export function AppTabRoutes() {
  const theme = useTheme();

  return(
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveBackgroundColor: theme.colors.backuground_primary,
        showLabel:false,
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.backuground_primary
        }
      }}
    >
      
      <Screen 
        name="Home"
        component={AppStackRoutes}
        options={{
          //gestureEnabled: false, //para previnir usuário retorna para splash IOs
          tabBarIcon: (({ color }) => (
            <HomeSvg width={24} height={24} fill={color}/> //Remover o fill do arquivo SGV para ajustar a cor no code
          ))
        }}
      />
      <Screen 
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => (
            <CarSvg width={24} height={24} fill={color}/>
          ))
        }}
      />
      <Screen 
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (({ color }) => (
            <PeopleSvg width={24} height={24} fill={color}/>
          ))
        }}
      />
    </Navigator>

  )
}
 