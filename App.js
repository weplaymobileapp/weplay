import {  createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './components/login.js';
import Find1 from './components/find.js';
import Find2 from './components/find2.js';
import Find3 from './components/find3.js';
import Create from './components/create.js';
import Account from './components/account.js';
import EditAccount from './components/editAccount.js';

const FindStack = createStackNavigator({
  Find1,
  Find2,
  Find3
})

const AccountStack = createStackNavigator({
  Account,
  EditAccount,
})

const TabNavigator = createBottomTabNavigator({
  Find: FindStack,
  Create: Create,
  Account: AccountStack,
  Login: Login
},
{
  initialRouteName: 'Login',
  headerMode: 'screen'
});

export default createAppContainer(TabNavigator);