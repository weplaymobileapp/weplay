import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, TouchableOpacity, Modal, AsyncStorage, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import { Input, Button } from 'react-native-elements';

const months = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }

const pictures = {
  'Basketball': require('../images/background/basketball.jpg'),
  'Football': require('../images/background/football.jpg'),
  'Baseball': require('../images/background/baseball.jpg'),
  'Soccer': require('../images/background/soccer.jpg'),
  'Hockey': require('../images/background/hockey.jpg'),
  'Tennis': require('../images/background/tennis.jpeg'),
  'Water Polo': require('../images/background/waterpolo.jpg'),
  'Volleyball': require('../images/background/volleyball.jpg'),
  'Ultimate Frisbee': require('../images/background/ultimatefrisbee.jpg'),
  'Softball': require('../images/background/softball.jpg'),
  'Dodgeball': require('../images/background/dodgeball.jpg'),
  'Lacrosse': require('../images/background/lacrosse.jpg'),
  'Ping Pong': require('../images/background/pingpong.jpg'),
  'Pickle Ball': require('../images/background/pickleball.jpeg'),
  'Hacky Sack': require('../images/background/hackysack.jpg'),
  'Laser Tag': require('../images/background/lasertag.jpg'),
  'Golf': require('../images/background/golf.jpg'),
  'Mini Golf': require('../images/background/minigolf.jpg'),
  'Rugby': require('../images/background/rugby.jpg'),
  'Badminton': require('../images/background/badminton.jpg')
}

export default class Find3 extends Component {
  constructor(props) {
    super(props);
    let { item } = this.props.navigation.state.params;
    this.state = {
      modalVisible: false,
      members: [],
      owner: 0,
      profile: {},
      event: item,
      profileID: 0
    }
    let newMembers = [];
    axios.get('http://localhost:3000/weplay/members', { params: { id: item.owner } })
      .then(profile => {
        this.setState({ owner: profile.data.name })
      })
    for (var i = 0; i < item.members.length; i++) {
      axios.get('http://localhost:3000/weplay/members', { params: { id: item.members[i] } })
        .then(profile => {
          newMembers.push(profile.data.name);
          if (newMembers.length === item.members.length) {
            this.setState({ members: newMembers });
          }
        })
    }
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    console.log('Refreshing Data ================================= Events Before: ', this.state.profile.events)
    let refreshedMembers = this.state.members;
    if(!refreshedMembers.includes(this.state.profile.id)) {
      refreshedMembers.push(this.state.profile.id);
    }
    axios.get('http://localhost:3000/weplay/members', {params: {id: this.state.profile.id}})
    .then(item => {
      this.setState({ profile: item.data }, () => {
        console.log('Events After: ', this.state.profile.events);
      })
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('userData')
      .then(data => {
        this.setState({ profile: JSON.parse(data) }, () => {
        })
      })
      .catch(err => console.log('error getting data from async storage'))
  }

  render() {
    let { sport, radius, month, day, item, zip } = this.props.navigation.state.params;
    console.log(this.state.profile);
    // console.log(sport, radius, month, day, item);


    return (

      <ImageBackground source={pictures[item.sport]} style={styles.backgroundImage}>
        <View style={styles.outer}>
          <View style={{ alignItems: 'left', marginLeft: 30 }}>
            <Button title='Back' type='clear' onPress={() => {
              this.props.navigation.goBack()
            }}></Button>
          </View>
          <View style={[styles.body, { flex: .5 }]}>
            <Text style={{ fontSize: 40, top: 30, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Find an Event</Text>
          </View>
          <View style={[styles.body, { flex: .3, marginBottom: 20 }]}>
            <Text style={{ fontSize: 13, top: 30, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Searching for {sport} Events on {month}/{day} in area code {zip}</Text>
          </View>

          <View style={[styles.body, styles.rows, { flex: 4.7, alignItems: 'center' }]}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.name}</Text>
            <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.sport}</Text>
            <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.time} on {months[JSON.parse(item.month)]} {item.day}</Text>
            {/* <Text>In Area code: {item.zip}</Text> */}
            <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.street}</Text>
            <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.city}, {item.state} {item.zip}</Text>

            {item.maxPlayersEnabled ? <Button style={{ borderRadius: 5, backgroundColor: 'rgba(0, 0, 0, .7)' }} type='outline' title={item.currentPlayers + '/' + item.maxPlayers + ' players'} onPress={() => {
              console.log('owner: ', this.state.owner)
              this.setState({ modalVisible: !this.state.modalVisible })
            }}></Button> : <Button style={{ borderRadius: 5, backgroundColor: 'rgba(0, 0, 0, .7)' }} type='outline' title={'Current Players: ' + item.currentPlayers} onPress={() => {
              console.log('owner: ', this.state.owner)
              this.setState({ modalVisible: !this.state.modalVisible })
            }}></Button>}

            {item.minPlayersEnabled ? <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Minimum players: {item.minPlayers}</Text> : null}
            {item.evenOnly ? <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Even Number Players Only</Text> : null}
            <Text style={{ margin: 20, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.details}</Text>

            <Button
              title="Join Game"
              titleStyle={{ color: 'white' }}
              buttonStyle={{ backgroundColor: 'rgba(66, 164, 245,.9)', width: 200,  borderRadius: 50 }}
              containerStyle={{ shadowColor: 'black', shadowRadius: 3, shadowOpacity: .7, shadowOffset: { width: 4, height: 4 }}}
              onPress={() => {
                let id = this.state.profile.id;
                let newEvents = this.state.profile.events;
                let newEventID = this.state.event.id;
                let newMembers = this.state.event.members;
                let allPlayers = this.state.event.currentPlayers;
                if (!newMembers.includes(id) && this.state.event.currentPlayers !== this.state.event.maxPlayers) {
                  newMembers.push(id);
                  Alert.alert('Event Added!');
                } else if(this.state.event.currentPlayers === this.state.event.maxPlayers){
                  Alert.alert('This event is full');
                } else {
                  Alert.alert('You are already a part of this event');
                }
                if (!newEvents.includes(newEventID)) {
                  newEvents.push(newEventID);
                  allPlayers++;
                }
                console.log('NEW MEMBERS: ', newMembers);
                axios.put('http://localhost:3000/weplay/joingame', { events: newEvents }, { params: { id } })
                  .then(something => {
                    // AsyncStorage.setItem('@userData:events', newEvents)
                    console.log('Updated Profile');
                    axios.put('http://localhost:3000/weplay/joingame', { members: newMembers, currentPlayers: allPlayers }, { params: { id: newEventID } })
                    .then(something => {
                      console.log('Updated Event');
                      //UPDATE THE PROFILE AND EVENT
                      this.refresh();
                      this.props.navigation.navigate('Find1');
                    })
                  })
              }}>

            </Button>


          </View>
          <View style={styles.footer}>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <ImageBackground source={pictures[item.sport]} style={styles.backgroundImage}>
                <View style={{ marginTop: 22, top: 20 }}>
                  <Button title='Return' style={{ left: 0 }}
                    onPress={() => {
                      this.setState({ modalVisible: !this.state.modalVisible });
                    }}>
                  </Button>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ top: 30, fontSize: 40, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Current Players: </Text>
                    <View style={{ top: 50, alignItems: 'center' }}>
                      {this.state.members.map((item, index) => {
                        return (
                          <Text style={{ fontSize: 25, color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item}</Text>
                        )
                      })}
                    </View>
                    <View style={{ top: 200, alignItems: 'center' }}>
                      <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Event Created By: </Text>
                      <Text style={{ fontSize: 25, color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{this.state.owner}</Text>
                    </View>
                  </View>


                </View>
              </ImageBackground>
            </Modal>

          </View>
        </View>
      </ImageBackground >
    );
  }
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    // backgroundColor: '#fff',
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
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center'
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


