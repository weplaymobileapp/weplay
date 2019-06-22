import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Button, TouchableOpacity } from 'react-native';



export default class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: 'Ping Pong',
      radius: '1'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.find}>Find a Game</Text>
        <View style={styles.twoColumn}>
          <Picker
            selectedValue={this.state.sport}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ sport: itemValue })
            }>
            <Picker.Item label="Ping Pong" value="Ping Pong" />
            <Picker.Item label="Pickle Ball" value="Pickle Ball" />
            <Picker.Item label="Basketball" value="Basketball" />
            <Picker.Item label="Volleyball" value="Volleyball" />
            <Picker.Item label="Hacky Sack" value="Hacky Sack" />
            <Picker.Item label="Laser Tag" value="Laser Tag" />
            <Picker.Item label="Mini Golf" value="Mini Golf" />
          </Picker>
          <Picker
            selectedValue={this.state.radius}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ radius: itemValue })
            }>
            <Picker.Item label="1" value={1} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="20" value={20} />
            <Picker.Item label="30" value={30} />
            <Picker.Item label="40" value={40} />
            <Picker.Item label="50" value={50} />
          </Picker>
        </View>
        <Text style={styles.text}> Searching for {this.state.sport}</Text>
        <Text style={styles.text}> In a {this.state.radius} mile radius</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={{fontSize: 25}}>Search</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    top: 50
    // borderWidth: 5,
    // borderColor: 'black'
    // justifyContent: 'space-between',
  },
  find: {
    fontSize: 50,
    top: 60,
  },
  input: {
    height: 40,
    width: 100,
    fontSize: 28,
    // top: 30,
    margin: 20
  },
  text: {
    fontSize: 20,
    lineHeight: 30
  },
  twoColumn: {
    // flex: 1,
    top: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // borderWidth: 5,
    // borderColor: 'black',
    height: 270
  },
  button: {
    display: 'flex',
    height: 70,
    width: 160,
    borderRadius: 5,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
}
});
//  let pic = { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' };
//<Image source={pic} style={{ width: 193, height: 110 }} />


