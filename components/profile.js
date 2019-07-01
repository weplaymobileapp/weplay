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

_handleLogoutAsync = async = () => {
  
}

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.signUp}>This is the Profile Page</Text>
    </View>
  );
}

