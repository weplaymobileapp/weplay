import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { Button } from 'react-native-elements'

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Matthew Mata',
      email: 'matthewmata1030@gmail.com',
      phone: '(310)617-7308',
      heightFeet: 5,
      heightInches: 4,
      weight: 130,
      age: 23,
      favoriteSports1: 'Ping Pong',
      favoriteSports2: 'Basketball',
      favoriteSports3: 'n/a',
    };
    this.handleEditSwitch = this.handleEditSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEditSwitch() {
    
  }

  handleChange() {

  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Account Info</Text>
        <Text>
          <Text style={styles.attribute}>Name: </Text>
          <Text style={styles.attribute}>{this.state.name}</Text>
        </Text>
        <Text>
          <Text style={styles.attribute}>Email: </Text>
          <Text style={styles.attribute}>{this.state.email}</Text>
        </Text>
        <Text>
          <Text style={styles.attribute}>Phone: </Text>
          <Text style={styles.attribute}>{this.state.phone}</Text>
        </Text>
        <Text>
          <Text style={styles.attribute}>Height: </Text>
          <Text style={styles.attribute}>{this.state.heightFeet} Feet {this.state.heightInches} Inches</Text>
        </Text>
        <Text>
          <Text style={styles.attribute}>Weight: </Text>
          <Text style={styles.attribute}>{this.state.weight}</Text>
        </Text>
        <Text>
          <Text style={styles.attribute}>Age: </Text>
          <Text style={styles.attribute}>{this.state.age}</Text>
        </Text>
        <Text style={styles.attribute}>Favorite Sports: </Text>
        {[this.state.favoriteSports1, this.state.favoriteSports2, this.state.favoriteSports3].map((sport, index) => <Text key={index} style={styles.attribute}>{index + 1}. {sport}</Text>)}
        <Button title="Edit Profile Info" onPress={this.handleEditSwitch}/>
        {/* <TextInput style={{height: 32, fontSize: 30}} placeholder="Password" /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'powderblue',
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
  },
  attribute: {
    fontSize: 20,
  }
});