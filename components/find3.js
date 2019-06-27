import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Button, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

const months = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }

export default class Find3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      members: [],
      owner: ''
    }
    let { item } = this.props.navigation.state.params;
    let newMembers = [];
    axios.get('http://localhost:3000/weplay/members', { params: { id: item.owner } })
      .then(profile => {
        this.setState({ owner: profile.data.name })
      })
    for (var i = 0; i < item.members.length; i++) {
      //fill members from item ids
      console.log('Currently on: ', item.members[i]);
      axios.get('http://localhost:3000/weplay/members', { params: { id: item.members[i] } })
        .then(profile => {
          newMembers.push(profile.data.name);
          if (newMembers.length === item.members.length) {
            this.setState({ members: newMembers });
            console.log('MEMBERS UPDATED')
          }
        })
    }
  }
  render() {
    let { sport, radius, month, day, item, zip } = this.props.navigation.state.params;
    // console.log(sport, radius, month, day, item);


    return (
      <View style={styles.outer}>
        <View style={[styles.body, { flex: .5 }]}>
          <Text style={{ fontSize: 40, top: 30 }}>Find an Event</Text>
        </View>
        <View style={[styles.body, { flex: .3, marginBottom: 20 }]}>
          <Text style={{ fontSize: 13, top: 30 }}>Searching for {sport} Events on {month}/{day} in zip code {zip}</Text>
        </View>
        {/* <View style={[styles.body, styles.columns, { flex: .3 }]}>
          <Button onPress={() => this.props.navigation.goBack()} title="Back"></Button>
          <View></View>
          <View style={{flex: 2}}><Text></Text></View>
          <View></View>
          <View></View>
        </View> */}
        <View style={[styles.body, styles.rows, { flex: 4.7, alignItems: 'center' }]}>
          <Text style={{ fontSize: 25 }}>{item.name}</Text>
          <Text>{sport}</Text>
          <Text>{item.time} on {months[JSON.parse(item.month)]} {item.day}</Text>
          {/* <Text>In Area code: {item.zip}</Text> */}
          <Text>{item.street}</Text>
          <Text>{item.city}, {item.state} {item.zip}</Text>

          {item.maxPlayersEnabled ? <Button title={item.currentPlayers + '/' + item.maxPlayers + ' players'} onPress={() => {
            this.setState({ modalVisible: !this.state.modalVisible })
          }}></Button> : <Button title={'Current Players: ' + item.currentPlayers} onPress={() => {
            this.setState({ modalVisible: !this.state.modalVisible })
          }}></Button>}

          {item.minPlayersEnabled ? <Text>Minimum players: {item.minPlayers}</Text> : null}
          {item.evenOnly ? <Text>Even Number Players Only</Text> : null}
          <Text style={{ margin: 20 }}>{item.details}</Text>

          <TouchableOpacity style={styles.button} onPress={() => {
            console.log('Game added');
            //POST REQUEST TO PROFILE DB 
            this.props.navigation.navigate('Account');
          }}>
            <Text style={{ fontSize: 25 }}>Join Game</Text>
          </TouchableOpacity>


        </View>
        <View style={styles.footer}>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{ marginTop: 22, top: 20 }}>
              <Button title='Return' style={{ left: 0 }}
                onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}>
              </Button>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ top: 30, fontSize: 30 }}>Current Players: </Text>
                <View style={{ top: 50 }}>
                  {this.state.members.map((item, index) => {
                    return (
                      <Text key={index}>{item}</Text>
                    )
                  })}
                </View>
                <View style={{ top: 200, alignItems: 'center' }}>
                  <Text style={{ fontSize: 20 }}>Event Created By: </Text>
                  <Text>{this.state.owner}</Text>
                </View>
              </View>

            </View>
          </Modal>

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


