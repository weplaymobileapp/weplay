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
      <View style={styles.outer}>
        <View style={styles.body1}>
          <Text style={{ fontSize: 50, top: 40 }}>Find an Event</Text>
        </View>
        <View style={[styles.body2, styles.columns]}>
          <View style={styles.column}>
            <Text style={{ top: 20, fontSize: 20 }}>Sport</Text>
            <Picker selectedValue={this.state.sport} style={styles.input} onValueChange={(itemValue, itemIndex) =>
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
          </View>
          <View style={styles.column}>
            <Text style={{ top: 20, fontSize: 20 }}>Radius (Miles)</Text>
            <Picker selectedValue={this.state.radius} style={styles.input} onValueChange={(itemValue, itemIndex) =>
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
        </View>
        <View style={[styles.body3, styles.rows]}>
          <View style={[styles.row, {flex: 2}]}>
            <Text style={{ top: 10, fontSize: 15 }}>Look for {this.state.sport} events in a {this.state.radius} mile radius</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={{ fontSize: 25 }}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.row,{flex: 3}]}>
            <Text>Or</Text>
            <TouchableOpacity style={styles.buttonSmall}>
              <Text style={{ fontSize: 25 }}>Create an Event</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Logged in as: Billy Bob Joe</Text>
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
    // borderWidth: 5,
    // borderColor: 'black'
    // justifyContent: 'space-between',
  },
  body1: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center'
  },
  body2: {
    flex: 2,
    // borderWidth: 2,
    // borderColor: 'blue'
  },
  body3: {
    flex: 3,
    // borderWidth: 2,
    // borderColor: 'green',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'yellow'
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
    // top: 30,
    margin: 20
  },
  button: {
    display: 'flex',
    height: 70,
    width: 260,
    borderColor: 'darkgreen',
    borderWidth: 2,
    borderRadius: 5,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
    margin: 15
  },
  buttonSmall: {
    display: 'flex',
    height: 50,
    width: 200,
    borderRadius: 5,
    top: 20,
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


