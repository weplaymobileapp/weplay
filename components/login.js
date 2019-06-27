import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import { FB_APP_ID } from '../config.js';
import { Button } from 'react-native-elements';
import Axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUp: {
    fontSize: 30
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isSignedIn: false
    }
    this._handlePressAsync = this._handlePressAsync.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.callGraph = this.callGraph.bind(this);
    //this.signOut = this.signOut.bind(this);
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  callGraph = async (token) => {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
    );
    //console.log(response);
    var responseJSON = JSON.stringify(await response.json());
    var obj = JSON.parse(responseJSON)
    Axios.get('http://localhost:3000/weplay/profile', {
      params: {
        facebookID: obj.id,
        name: obj.name
      }
    })
    .then(({ data }) => {
      data = JSON.stringify(data[0]);
      this.saveItem('userData', data);
      this.setState({ isSignedIn: true }, () => {
        this.props.navigation.navigate('Account', {userData: data, isSignedIn: this.state.isSignedIn})
      }) 
    })
    .catch(err => console.log(err, 'error in get'))
  };

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    this.callGraph(result.params.access_token);
  }

  // signOut = async () => {
  //   var iParams = token;
  //   fetch(
  //     `https://graph.facebook.com/User_id/permissions`,{
  //     method : 'DELETE',
  //     body: iParams
  //   })
  // }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 50, fontStyle: 'italic'}}>WePlay</Text>
        {this.state.isSignedIn ? 
        (<View style={{marginTop: 20}}>
          <Button title="Sign Out" onPress={this.signOut}></Button>
        </View>) :
        (<View style={{marginTop: 20}}>
          <Button title="Sign In With Facebook" onPress={this._handlePressAsync} />
        </View>)
        }
      </View>
    );
  }
}

