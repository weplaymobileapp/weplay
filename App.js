import {  createBottomTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './components/login.js';
import Logout from './components/logout.js';
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
}, {
  headerMode: 'none'
})

const AccountStack = createStackNavigator({
  Account,
  EditAccount,
}, {
  headerMode: 'none'
})


const TabNavigator = createBottomTabNavigator({
  Find: FindStack,
  Create: Create,
  Account: AccountStack,
  Logout: Logout
},
{

  initialRouteName: 'Find',
  headerMode: 'screen',
  tabBarOptions: {
    activeTintColor: 'orange',
    inactiveTintColor: 'black',
    labelStyle: {
      fontSize: 15,
      top: 10,
      fontWeight: 200,
    },
    style: {
      backgroundColor: 'white',
      height: 30
    },
  },
}
);

const AuthStack = createSwitchNavigator({
  Login: Login,
  Tab: TabNavigator
},
{
  initialRouteName: 'Login'
})

export default createAppContainer(
  AuthStack
);