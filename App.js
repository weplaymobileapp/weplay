import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Find from './components/find.js'

export default function App() {
  return (
    <View style={styles.container}>
      <Find />
    </View>
  );
}

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

