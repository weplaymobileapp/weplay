import React from 'react';
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

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.signUp}>Sign Up</Text>
      <TextInput
        style={{height: 32, fontSize: 30}}
        placeholder="User Name"/>
      <TextInput
        style={{height: 32, fontSize: 30}}
        placeholder="Password"
        secureTextEntry={true}/>
    </View>
  );
}

