import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './components/login.js';
import Find from './components/find.js';
import Create from './components/create.js';
import Account from './components/account.js';
import EditAccount from './components/editAccount.js';


class App extends React.Component {
  render() {
    return Account;
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
    Account: {
      screen: Account,
      navigationOptions: { header: null }
    },
    EditAccount: {
      screen: EditAccount,
      navigationOptions: { header: null }
    }
  },
  {
    initialRouteName: 'EditAccount',
    headerMode: 'screen'
  }
);

AppRegistry.registerComponent('WePlay', () => App);

export default createAppContainer(AppNavigator);
