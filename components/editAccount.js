import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';

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
      allSports: [{ value: 'Hockey'}, { value: 'BaseBall' }, { value: 'Football' }, { value: 'Soccer' }, { value: 'Ping Pong' }, { value: 'Basketball' }]
    };
    this.handleEditSwitch = this.handleEditSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEditSwitch() {
    
  }

  handleChange(text, key) {

    this.setState({ [key]: text } )
  }

  render() {
    let feet = [{ value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }]
    let inches = [{ value: 0 }, { value: 1 }, { value: 2 },{ value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }]
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Edit Account Info</Text>
        <Text style={styles.attribute}>Name: </Text>
        <Input style={styles.attribute} onChangeText={(text) => this.handleChange(text, 'name')}>{this.state.name}</Input>
        <Text style={styles.attribute}>Email: </Text>
        <Input style={styles.attribute} onChangeText={(text) => this.handleChange(text, 'email')}>{this.state.email}</Input>
        <Text style={styles.attribute}>Phone: </Text>
        <Input style={styles.attribute} onChangeText={(text) => this.handleChange(text, 'phone')}>{this.state.phone}</Input>
        <Text style={styles.attribute}>Height: </Text>
        <Dropdown label={JSON.stringify(this.state.heightFeet)} data={feet} onChangeText={(text) => this.handleChange(text, 'heightFeet')}></Dropdown>
        <Dropdown label={JSON.stringify(this.state.heightInches)} data={inches} onChangeText={(text) => this.handleChange(text, 'heightInches')}></Dropdown>
        <Text style={styles.attribute}>Weight In Pounds: </Text>
        <Input style={styles.attribute} onChangeText={(text) => this.handleChange(text, 'weight')}>{this.state.weight}</Input>
        <Text style={styles.attribute}>Age: </Text>
        <Input style={styles.attribute} onChangeText={(text) => this.handleChange(text, 'age')}>{this.state.age}</Input>
        <Text style={styles.attribute}>Favorite Sports: </Text>
        {[this.state.favoriteSports1, this.state.favoriteSports2, this.state.favoriteSports3].map((sport, index) => <Dropdown style={{flex: 1}} key={index} data={this.state.allSports} label={`${index + 1}. ${sport}`} onChangeText={(text) => this.handleChange(text, `favoriteSports${index + 1}`)}></Dropdown>)}
        <Button title="Edit Profile Info" onPress={this.handleEditSwitch}/>
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