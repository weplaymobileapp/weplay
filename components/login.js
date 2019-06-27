import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage, Input } from 'react-native';
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
      userName: '',
      password: '',
      isSignedIn: false
    }
    this._handlePressAsync = this._handlePressAsync.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.callGraph = this.callGraph.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
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
      var dataStr = JSON.stringify(data[0]);
      this.saveItem('userData', dataStr);
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

  handleSignIn(){
    Axios.get('http://localhost:3000/weplay/profile', {
      params: {
        facebookID: this.state.password,
        name: this.state.userName
      }
    })
    .then(({ data }) => {
      var dataStr = JSON.stringify(data[0]);
      this.saveItem('userData', dataStr);
      this.setState({ isSignedIn: true }, () => {
        this.props.navigation.navigate('Account', {userData: data, isSignedIn: this.state.isSignedIn})
      })  
    })
    .catch(err => console.log(err, 'error in get'))
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 50, fontStyle: 'italic'}}>WePlay</Text>
        <TextInput placeholder="Username"
          style={{fontSize: 40}}
          onChangeText={(userName) => this.setState({ userName })}
          inputContainerStyle={{
            //width: 300,
            marginBottom: 10,
            left: 45,
            bottom: 0,
            fontSize: 40
          }}/>
        <TextInput placeholder="Password"
          style={{fontSize: 40}}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          inputContainerStyle={{
            //width: 300,
            lineHeight: 40,
            marginBottom: 10,
            left: 45,
            bottom: 0,
            fontSize: 40
          }}/>
        <View style={{marginTop: 20}}>
          <Button title="Sign In" onPress={this.handleSignIn} />
        </View>
        <View style={{marginTop: 20}}>
          <Button title="Sign In With Facebook" onPress={this._handlePressAsync} />
        </View>
      </View>
    );
  }
}

