import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { AuthSession } from 'expo';
import { FB_APP_ID } from '../config.js';

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
      result: null,
      emptyInputFields: false
    }
  }

  _handlePressAsync = async () => {
    if(!this.state.userName || !this.state.password){
      this.setState({ emptyInputFields: true })
    } else {
      let redirectUrl = AuthSession.getRedirectUrl();
      let result = await AuthSession.startAsync({
        authUrl:
          `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
          `&client_id=${FB_APP_ID}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
      });
      this.setState({ result }, () => {
        this.props.navigation.navigate('Profile')
      });
    }
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text>We Play</Text>
        {this.state.emptyInputFields ? (
          <Text style={{color: 'red'}}>Please enter a Username and Password</Text>
        ) : null}
        <TextInput
          style={{height: 32, fontSize: 30}}
          placeholder="Username"
          onChangeText={(userName) => this.setState({userName})}
          />
        <TextInput
          style={{height: 32, fontSize: 30}}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          />
        <Button title="Sign In With Facebook" onPress={this._handlePressAsync} />
      </View>
    );
  }
}

