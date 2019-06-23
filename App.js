import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './components/login.js';
import Find from './components/find.js';
import Find2 from './components/find2.js';
import Create from './components/create.js';
import Profile from './components/profile.js';

// class App extends React.Component {
//   // render() {
//   //   // return Find;
//   // }
// }

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: { header: null, gesturesEnabled: false }
    },
    Find: {
      screen: Find,
      navigationOptions: { header: null, gesturesEnabled: false }
    },
    Find2: {
      screen: Find2,
      navigationOptions: { header: null, gesturesEnabled: false }
    },
    Create: {
      screen: Create,
      navigationOptions: { header: null }
    },
    Profile: {
      screen: Profile,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: 'Find',
    headerMode: 'screen'
  }
);

AppRegistry.registerComponent('WePlay', () => App);

export default createAppContainer(AppNavigator);
