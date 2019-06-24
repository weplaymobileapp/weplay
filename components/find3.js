import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Button, TouchableOpacity } from 'react-native';

export default class Find3 extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    let { sport, radius, month, day, item} = this.props.navigation.state.params;
    // console.log(sport, radius, month, day, item);
    return (
      <View style={styles.outer}>
        <View style={[styles.body, {flex: .5}]}>
          <Text style={{ fontSize: 40, top: 30 }}>Find an Event</Text>
        </View>
        <View style={[styles.body, {flex: .3, marginBottom: 20}]}>
          <Text style={{ fontSize: 13, top: 20 }}>Searching for {sport} Events on {month}/{day} within {radius} miles</Text>
        </View>
        <View style={[styles.body, styles.columns, { flex: .3 }]}>
          <Button onPress={() => this.props.navigation.goBack()} title="Back"></Button>
          <View></View>
          <View style={{flex: 2}}><Text></Text></View>
          <View></View>
          <View></View>
        </View>
        <View style={[styles.body, styles.rows, { flex: 4.7, alignItems: 'center' }]}>
          <Text style={{fontSize: 25}}>{item.name}</Text>
          <Text>{sport}</Text>
          <Text>{item.time} on {item.date}</Text>
          <Text>In Area code: {item.address}</Text>
          <Text>{item.currentPlayers}/{item.maxPlayers} players</Text>
          <Text>Minimum players: {item.minPlayers}</Text>
          <Text>{item.description}</Text>
          <TouchableOpacity style={styles.button} onPress={() => {
              console.log('Game added');
              this.props.navigation.navigate('Find');
            }}>
              <Text style={{ fontSize: 25 }}>Join Game</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    top: 40,
    borderWidth: 5,
    // justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'yellow'
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rows: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },


  column: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'black',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'black',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 100,
    fontSize: 28,
    top: -10,
    margin: 20
  },
  button: {
    display: 'flex',
    height: 70,
    width: 260,
    borderColor: 'darkgreen',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
    margin: 35
  },
  buttonSmall: {
    display: 'flex',
    height: 50,
    width: 200,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    shadowColor: 'blue',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  }
});
//  let pic = { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' };
//<Image source={pic} style={{ width: 193, height: 110 }} />


