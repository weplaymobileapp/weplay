import React from 'react';
import { StyleSheet, Text, TextInput, View, Picker } from 'react-native';

export default function Find() {

  return (
    <View style={styles.container}>
      <Text style={styles.find}>Find a Game</Text>
      <TextInput style={styles.input} placeholder="Type here to translate!">
      
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  find: {
    fontSize: 50,
    top: 50,
  },
  input: {
    height: 40,
    fontSize: 28,
    top: 70
  }
});
//  let pic = { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' };
//<Image source={pic} style={{ width: 193, height: 110 }} />

