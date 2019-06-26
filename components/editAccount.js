import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  handleEditSubmit() {
    this.props.navigation.navigate('EditAccount');
  }

  render() {
    const { name, email, phone, heightFeet, heightInches, weight, age, favoriteSports1, favoriteSports2, favoriteSports3, allSports, handleChange } = this.props.navigation.state.params;

    const feet = [
      { value: 3 }, 
      { value: 4 }, 
      { value: 5 }, 
      { value: 6 }, 
      { value: 7 }, 
      { value: 8 }
    ]
    const inches = [
      { value: 0 }, 
      { value: 1 }, 
      { value: 2 },
      { value: 3 }, 
      { value: 4 }, 
      { value: 5 }, 
      { value: 6 }, 
      { value: 7 }, 
      { value: 8 }, 
      { value: 9 }, 
      { value: 10 }, 
      { value: 11 }, 
      { value: 12 }
    ]
    return (
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.title}>Edit Account Info</Text>
        <Text style={styles.attribute}>Name: </Text>
        <Input onChangeText={(text) => handleChange(text, 'name')}>
          <Text style={styles.attribute}>{name}</Text>
        </Input>
        <Text style={styles.attribute}>Email: </Text>
        <Input style={styles.attribute} onChangeText={(text) => handleChange(text, 'email')}>{email}</Input>
        <Text style={styles.attribute}>Phone: </Text>
        <Input style={styles.attribute} onChangeText={(text) => handleChange(text, 'phone')}>{phone}</Input>
        <Text style={styles.attribute}>Height: </Text>
        <Dropdown label={JSON.stringify(heightFeet)} data={feet} onChangeText={(text) => handleChange(text, 'heightFeet')}></Dropdown>
        <Dropdown label={JSON.stringify(heightInches)} data={inches} onChangeText={(text) => handleChange(text, 'heightInches')}></Dropdown>
        <Text style={styles.attribute}>Weight In Pounds: </Text>
        <Input style={styles.attribute} onChangeText={(text) => handleChange(text, 'weight')}>{weight}</Input>
        <Text style={styles.attribute}>Age: </Text>
        <Input style={styles.attribute} onChangeText={(text) => handleChange(text, 'age')}>{age}</Input>
        <Text style={styles.attribute}>Favorite Sports: </Text>
        {[favoriteSports1, favoriteSports2, favoriteSports3].map((sport, index) => (
          <Dropdown style={{flex: 1}} key={index} data={allSports} label={`${index + 1}. ${sport}`} onChangeText={(text) => handleChange(text, `favoriteSports${index + 1}`)}></Dropdown>
        ))}
        <Button title="Confirm Edit" onPress={this.handleEditSubmit}/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 50,
  },
  attribute: {
    fontSize: 20,
  }
});