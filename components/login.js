import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage, ImageBackground } from 'react-native';
import { AuthSession } from 'expo';
import { FB_APP_ID } from '../config.js';
import { Button } from 'react-native-elements';
import Axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    var responseJSON = JSON.stringify(await response.json());
    var obj = JSON.parse(responseJSON)
    Axios.get('http://localhost:3000/weplay/profile', {
      params: {
        facebookID: obj.id,
        name: obj.name
      }
    })

      .then(({ data }) => {
        const userData = JSON.stringify(data[0]);
        this.saveItem('userData', userData);
        this.setState({ isSignedIn: true }, () => {
          this.props.navigation.navigate('Account', { isSignedIn: this.state.isSignedIn })
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
    console.log('test');
    this.callGraph(result.params.access_token);
  }
  render() {
    return (
      <ImageBackground source={require('../images/background/background.jpg')} style={{ height: '100%', width: '100%' }}>
        <View style={styles.container}>
          <Text style={{ fontSize: 50, fontStyle: 'italic' }}>WePlay</Text>
          {this.state.isSignedIn ?
            (<View style={{ marginTop: 20 }}>
              <Button title="Sign Out" onPress={this.signOut}></Button>
            </View>) :
            (<View style={{ marginTop: 20 }}>
              <Button
                titleStyle={{ color: 'white' }}
                buttonStyle={{ backgroundColor: 'rgba(66, 164, 245,.9)', width: 200,  borderRadius: 50 }}
                containerStyle={{ shadowColor: 'black', shadowRadius: 3, shadowOpacity: .7, shadowOffset: { width: 4, height: 4 }}}
                title="Sign In With Facebook" onPress={this._handlePressAsync} />
            </View>)
          }
        </View>
      </ImageBackground>
    );
  }
}

