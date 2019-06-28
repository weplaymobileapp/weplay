import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, ImageBackground, Dimensions, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import axios from 'axios';

const months = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }

const pictures = {
  'Basketball': require('../images/basketball.jpg'),
  'Football': require('../images/football.jpg'),
  'Baseball': require('../images/baseball.jpg'),
  'Soccer': require('../images/soccer.jpg'),
  'Hockey': require('../images/hockey.jpg'),
  'Tennis': require('../images/tennis.jpg'),
  'Water Polo': require('../images/waterpolo.jpg'),
  'Volleyball': require('../images/volleyball.jpg'),
  'Ultimate Frisbee': require('../images/ultimatefrisbee.jpg'),
  'Softball': require('../images/softball.jpg'),
  'Dodgeball': require('../images/dodgeball.jpg'),
  'Lacrosse': require('../images/lacrosse.jpg'),
  'Ping Pong': require('../images/pingpong.jpg'),
  'Pickle Ball': require('../images/pickleball.jpg'),
  'Hacky Sack': require('../images/hackysack.jpg'),
  'Laser Tag': require('../images/lasertag.jpg'),
  'Golf': require('../images/golf.jpg'),
  'Mini Golf': require('../images/minigolf.jpg'),
  'Rugby': require('../images/rugby.jpg'),
  'Badminton': require('../images/badminton.jpg')
}

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      name: '',
      phone: '',
      heightFeet: 0,
      heightInches: 0,
      weight: 0,
      age: 0,
      favoriteSports1: '--',
      favoriteSports2: '--',
      favoriteSports3: '--',
      facebookID: '0',
      allSports: [{ value: '--' }, { value: 'Basketball' }, { value: 'Football' }, { value: 'Baseball' },
      { value: 'Soccer' }, { value: 'Hockey' }, { value: 'Tennis' }, { value: 'Water Polo' },
      { value: 'Volleyball' }, { value: 'Ultimate Frisbee' }, { value: 'Softball' },
      { value: 'Dodgeball' }, { value: 'Lacrosse' }, { value: 'Ping Pong' },
      { value: 'Pickle Ball' }, { value: 'Hacky Sack' }, { value: 'Laser Tag' },
      { value: 'Golf' }, { value: 'Mini Golf' }, { value: 'Rugby' }, { value: 'Badminton' }],
      events: [],
      eventObjects: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEditSwitch = this.handleEditSwitch.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  componentDidMount() {

    AsyncStorage.getItem('userData')
      .then(data => JSON.parse(data))
      .then(data => {
        const {
          name,
          phone,
          heightFeet,
          heightInches,
          weight,
          age,
          favoriteSports1,
          favoriteSports2,
          favoriteSports3,
          events,
          facebookID
        } = data;

        this.setState({
          name,
          phone: phone || '--',
          heightFeet: heightFeet || '--',
          heightInches: heightInches || '--',
          weight: weight || '--',
          age: age || '--',
          favoriteSports1: favoriteSports1 || '--',
          favoriteSports2: favoriteSports2 || '--',
          favoriteSports3: favoriteSports3 || '--',
          facebookID,
          events,
        },
          //ADDED BY DUSTIN FOR EVENT LIST
          () => {
            let eventObjects = [];
            for (var i = 0; i < this.state.events.length; i++) {
              axios.get('http://localhost:3000/weplay/myevents', { params: { eventID: this.state.events[i] } })
                .then(item => {
                  // console.log(item.data.name);
                  eventObjects.push(item.data);
                  if (eventObjects.length === this.state.events.length) {
                    this.setState({ eventObjects })
                    // console.log('All events added')
                  }
                })
            }

          }
          // END OF DUSTIN EDIT

        )
      })
      .catch(err => console.log('error getting data from async storage', err))
  }

  handleProfileUpdate() {
    axios.put('http://localhost:3000/weplay/profile/', {
      name: this.state.name,
      phone: this.state.phone === '--' ? null : this.state.phone,
      heightFeet: this.state.heightFeet === '--' ? null : this.state.heightFeet,
      heightInches: this.state.heightInches === '--' ? null : this.state.heightInches,
      weight: this.state.weight === '--' ? null : this.state.weight,
      age: this.state.age === '--' ? null : this.state.age,
      favoriteSports1: this.state.favoriteSports1 === '--' ? null : this.state.favoriteSports1,
      favoriteSports2: this.state.favoriteSports2 === '--' ? null : this.state.favoriteSports2,
      favoriteSports3: this.state.favoriteSports3 === '--' ? null : this.state.favoriteSports3,
      facebookID: this.state.facebookID
    })
      .catch(err => console.log('Error in update :', err))
  }

  handleChange(text, key) {
    this.setState({ [key]: text })
  }

  handleRefresh() {
      let eventObjects = [];
      for (var i = 0; i < this.state.events.length; i++) {
        axios.get('http://localhost:3000/weplay/myevents', { params: { eventID: this.state.events[i] } })
          .then(item => {
            // console.log(item.data.name);
            eventObjects.push(item.data);
            if (eventObjects.length === this.state.events.length) {
              this.setState({ eventObjects })
              // console.log('All events added')
            }
          })
      }
  }

  handleEditSwitch() {
    this.props.navigation.navigate('EditAccount', {
      name: this.state.name,
      phone: this.state.phone,
      heightFeet: this.state.heightFeet,
      heightInches: this.state.heightInches,
      weight: this.state.weight,
      age: this.state.age,
      favoriteSports1: this.state.favoriteSports1,
      favoriteSports2: this.state.favoriteSports2,
      favoriteSports3: this.state.favoriteSports3,
      allSports: this.state.allSports,
      handleChange: this.handleChange,
      handleProfileUpdate: this.handleProfileUpdate
    })
  }

  render() {
    return (
      <ImageBackground source={require('../images/background/background.png')} style={{ height: '100%', width: '100%' }}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Account Info</Text>
          </View>
          <Text style={{ ...styles.attribute, ...styles.topContainer }}>Name: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.name}</Text>
          </View>
          <Text style={styles.attribute}>Phone: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.phone}</Text>
          </View>
          <Text style={styles.attribute}>Height: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.heightFeet} Feet {this.state.heightInches} Inches</Text>
          </View>
          <Text style={styles.attribute}>Weight: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.weight}</Text>
          </View>
          <Text style={styles.attribute}>Age: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.age}</Text>
          </View>
          <Text style={styles.attribute}>Favorite Sports: </Text>
          <View style={{ ...styles.attributeContainer, ...styles.sportsList }}>
            {[this.state.favoriteSports1, this.state.favoriteSports2, this.state.favoriteSports3].map((sport, index) => (
              <Text key={index} style={styles.attribute}>{index + 1}. {sport}</Text>
            ))}
          </View>
          <Button
            title="Edit Profile Info"
            titleStyle={{ color: 'white' }}
            buttonStyle={{ backgroundColor: 'rgba(66, 164, 245,.9)', width: Dimensions.get('window').width - 55,  borderRadius: 50 }}
            containerStyle={{ marginBottom: 50,shadowColor: 'black', shadowRadius: 3, shadowOpacity: .7, shadowOffset: { width: 4, height: 4 }}}
            onPress={this.handleEditSwitch} />
          <Button
            title="My Events"
            titleStyle={{ color: 'white' }}
            buttonStyle={{ backgroundColor: 'rgba(66, 164, 245,.9)', width: Dimensions.get('window').width - 55,  borderRadius: 50 }}
            containerStyle={{ shadowColor: 'black', shadowRadius: 3, shadowOpacity: .7, shadowOffset: { width: 4, height: 4 }}}
            onPress={() => {
              () => {
                let eventObjects = [];
                for (var i = 0; i < this.state.events.length; i++) {
                  axios.get('http://localhost:3000/weplay/myevents', { params: { eventID: this.state.events[i] } })
                    .then(item => {
                      // console.log(item.data.name);
                      eventObjects.push(item.data);
                      if (eventObjects.length === this.state.events.length) {
                        this.setState({ eventObjects })
                        // console.log('All events added')
                      }
                    })
                }
    
              }
              this.setState({ modalVisible: !this.state.modalVisible });
            }} />

        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ImageBackground source={require('../images/background/background.jpg')} style={{ height: '100%', width: '100%' }}>
            <View style={{flex: .5, marginTop: 50}}>
              <Button title='Return' style={{ left: 0 }}
                onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}>
              </Button>
            </View>
              <View style={{ alignItems: 'center', flex: 9 }}>
                <ScrollView style={{height: '100%'}}>
                {this.state.eventObjects.map((item) => {
                  return (
                      <View style={styles.event}>
                        <ImageBackground source={pictures[item.sport]} style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 5,
                          alignItems: 'center',
                        }}>
                          <Text style={{ fontSize: 20, margin: 5, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.name}</Text>
                          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5, marginBottom: 10 }}>{months[item.month]} {item.day}</Text>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5, marginBottom: 15 }}>{item.currentPlayers}/{item.maxPlayers} Players | Time: {item.time}</Text>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>At {item.street} Blvd</Text>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.city}, {item.state} {item.zip}</Text>
                          <Text style={{ fontSize: 12, margin: 10, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.details}</Text>

                        </ImageBackground>
                      </View>
                  )
                })}
                </ScrollView>
              </View>
                <View style={{height: 100, flex: .3}}>

                </View>
          </ImageBackground>
        </Modal>

      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 20,
    marginRight: 20,
    top: 40
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 50,
  },
  attribute: {
    fontSize: 20,
  },
  attributeContainer: {
    paddingBottom: 7,
    marginTop: 8,
    marginLeft: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#989898'
  },
  topContainer: {
    marginTop: 30
  },
  sportsList: {
    marginBottom: 50,
    borderBottomWidth: 0,
  },
  event: {
    height: 250,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    margin: 3,
    width: Dimensions.get('window').width - 10,
    borderRadius: 5,
    overflow: 'hidden'
  }
});