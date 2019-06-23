import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

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
      password: ''
    }
  }

  //create a sign up function that just sends a post

  //create a sign in function that authenticates user
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signUp}>Sign Up</Text>
        <TextInput
          style={{height: 32, fontSize: 30}}
          placeholder="User Name"
          onChangeText={(userName) => this.setState({userName})}
          />
        <TextInput
          style={{height: 32, fontSize: 30}}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          />
      </View>
    );
  }
}

