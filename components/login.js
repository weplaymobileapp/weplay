import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

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
        <Text>We Play</Text>
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
        <Button
          title={'Login'}
          onPress={() => this.props.navigation.navigate('Profile')}
          buttonStyle={{
            backgroundColor: '#000',
            borderWidth: 1,
            borderColor: '#d3d3d3',
            borderRadius: 10,
            width: 300,
            marginTop: 20
          }}
          titleStyle={{ fontWeight: '500', color: '#7ed957' }}
        />
        <Button
          title={'Sign Up'}
          onPress={() => this.props.navigation.navigate('Profile')}
          buttonStyle={{
            backgroundColor: '#000',
            borderWidth: 1,
            borderColor: '#d3d3d3',
            borderRadius: 10,
            width: 300,
            marginTop: 20
          }}
          titleStyle={{ fontWeight: '500', color: '#7ed957' }}
        />
      </View>
    );
  }
}

