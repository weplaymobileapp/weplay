import React from 'react';
import { Text, View, AppRegistry } from 'react-native';
import {  createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Login from './components/login.js';
import Find1 from './components/find.js';
import Find2 from './components/find2.js';
import Find3 from './components/find3.js';
import Create from './components/create.js';
import Profile from './components/profile.js';

const FindStack = createStackNavigator({
  Find1: Find1,
  Find2: Find2,
  Find3: Find3
})

const TabNavigator = createBottomTabNavigator({
  Find: FindStack,
  Create: Create,
  Profile: Profile,
  Login: Login
},
{
  initialRouteName: 'Login',
  headerMode: 'screen'
});

export default createAppContainer(TabNavigator);