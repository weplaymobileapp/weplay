import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage, Button } from 'react-native';


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

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasToken: false,
      isLoaded: false
    }
    this.refreshToken = this.refreshToken.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }

  componentDidMount() {
    // AsyncStorage.getItem('id_token').then((token) => {
    //   this.setState({ hasToken: token !== null },
    //     () => console.log(token, this.state.isLoaded))
    // });
    AsyncStorage.getItem('id_token', (err, token) => {
      if(err){
        console.log('error getting token', err)
      } else {
        this.setState({ hasToken: token !== null }, () => {
          console.log(token)
        })
      }
    })
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      this.setState({ hasToken: false });
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  refreshToken(){
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true },
        () => console.log(token, this.state.isLoaded))
    });
  }

  render(){
    return (
      <View style={styles.container}>
        {this.state.hasToken ? 
        (<Text>User is logged in</Text>) :
        (<Text>User is not logged in</Text>)}
      <Button title="Logout" onPress={this.userLogout}></Button>
      <Button title="refresh" onPress={this.refreshToken}></Button>
      </View>
    );
  }
}

