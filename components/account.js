import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements'

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Matthew Mata',
      username: 'xXxSlayerxXx',
      phone: '(310) 617-7308',
      heightFeet: 5,
      heightInches: 4,
      weight: 130,
      age: 23,
      favoriteSports1: 'Ping Pong',
      favoriteSports2: 'Basketball',
      favoriteSports3: 'n/a',
      allSports: [{value: '--'},{value: 'Basketball'}, {value: 'Football'}, {value: 'Baseball'},
      {value: 'Soccer'},{value: 'Hockey'},{value: 'Tennis'},{value: 'Water Polo'},
      {value: 'Volleyball'},{value: 'Ultimate Frisbee'},{value: 'Softball'},
      {value: 'Dodgeball'},{value: 'Lacrosse'},{value: 'Ping Pong'},
      {value: 'Pickle Ball'},{value: 'Hacky Sack'},{value: 'Laser Tag'},
      {value: 'Golf'},{value: 'Mini Golf'},{value: 'Rugby'},{value: 'Badminton'}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditSwitch = this.handleEditSwitch.bind(this);
  }

  handleChange(text, key) {
    this.setState({ [key]: text } )
  }

  handleEditSwitch() {
    this.props.navigation.navigate('EditAccount', { 
      name: this.state.name, 
      username: this.state.username,
      phone: this.state.phone, 
      heightFeet: this.state.heightFeet, 
      heightInches: this.state.heightInches, 
      weight: this.state.weight, 
      age: this.state.age, 
      favoriteSports1: this.state.favoriteSports1, 
      favoriteSports2: this.state.favoriteSports2, 
      favoriteSports3: this.state.favoriteSports3,
      allSports: this.state.allSports,
      handleChange: this.handleChange
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Account Info</Text>
        </View>
        <Text style={{...styles.attribute, ...styles.topContainer}}>Name: </Text>
        <View style={styles.attributeContainer}>
          <Text style={styles.attribute}>{this.state.name}</Text>
        </View>
        <Text style={styles.attribute}>Username: </Text>
        <View style={styles.attributeContainer}>
          <Text style={styles.attribute}>{this.state.username}</Text>
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
        <View style={{...styles.attributeContainer, ...styles.sportsList}}>
          {[this.state.favoriteSports1, this.state.favoriteSports2, this.state.favoriteSports3].map((sport, index) => (
            <Text key={index} style={styles.attribute}>{index + 1}. {sport}</Text>
          ))}
        </View>
        <Button title="Edit Profile Info" onPress={this.handleEditSwitch}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 20,
    marginRight: 20,
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
});