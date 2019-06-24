import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './components/login.js';
import Find from './components/find.js';
import Create from './components/create.js';
import Profile from './components/profile.js';

class App extends React.Component {
  render() {
    // return Login;
    return Create;
  }
}

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
    // initialRouteName: 'Login',
    initialRouteName: 'Create',
    headerMode: 'screen'
  }
);

AppRegistry.registerComponent('WePlay', () => App);

export default createAppContainer(AppNavigator);
