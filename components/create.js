import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Alert, Picker, Slider } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    marginTop: 75,
    marginBottom: 100,
    marginLeft: 20,
    marginRight: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  create: {
    fontSize: 30,
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  input: {
    height: 32,
    // width: 200,
    fontSize: 26,
    marginTop: 15,
    // borderBottomWidth: 1,
  },
  dropdown: {
    height: 70, 
    width: 180,
  }
});

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      eventName: '',
      sport: '',
      month: '',
      day: '',
      time: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      maxPlayersEnabled: false,
      minPlayersEnabled: false,
      maxPlayers: 0,
      minPlayers: 0,
      evenOnly: false,
      details: '',
    };
  }

  render() {

    let sports = [{value: 'Basketball'}, {value: 'Football'}, {value: 'Baseball'},
    {value: 'Soccer'},{value: 'Hockey'},{value: 'Tennis'},{value: 'Water Polo'},
    {value: 'Volleyball'},{value: 'Ultimate Frisbee'},{value: 'Softball'},
    {value: 'Dodgeball'},{value: 'Lacrosse'},{value: 'Ping Pong'},
    {value: 'Pickle Ball'},{value: 'Hacky Sack'},{value: 'Laser Tag'},
    {value: 'Golf'},{value: 'Mini Golf'},{value: 'Rugby'},{value: 'Badminton'}];

    let months = [{value: 'January'}, {value: 'February'}, {value: 'March'},
    {value: 'April'},{value: 'May'},{value: 'June'},
    {value: 'July'},{value: 'August'},{value: 'September'},
    {value: 'October'},{value: 'November'},{value: 'December'}];

    let days = [{value: '1st'}, {value: '2nd'}, {value: '3rd'},{value: '4th'},{value: '5th'},{value: '6th'},
    {value: '7th'},{value: '8th'},{value: '9th'}, {value: '10th'},{value: '11th'},{value: '12th'},
    {value: '13th'},{value: '14th'},{value: '15th'},{value: '16th'},{value: '17th'},{value: '18th'},{value: '19th'},
    {value: '20th'},{value: '21st'},{value: '22nd'},{value: '23rd'},{value: '24th'},{value: '25th'},{value: '26th'},
    {value: '27th'},{value: '28th'},{value: '29th'},{value: '30th'},{value: '31st'}];

    let times = [{value: '6:00AM'},{value: '6:30AM'},{value: '7:00AM'},{value: '7:30AM'},
    {value: '8:00AM'},{value: '8:30AM'},{value: '9:00AM'},{value: '9:30AM'},
    {value: '10:00AM'},{value: '10:30AM'},{value: '11:00AM'},{value: '11:30AM'},
    {value: '12:00PM'},{value: '12:30PM'},{value: '1:00PM'},{value: '1:30PM'},
    {value: '2:00PM'},{value: '2:30PM'},{value: '3:00PM'},{value: '3:30PM'},
    {value: '4:00PM'},{value: '4:30PM'},{value: '5:00PM'},{value: '5:30PM'},
    {value: '6:00PM'},{value: '6:30PM'},{value: '7:00PM'},{value: '7:30PM'},
    {value: '8:00PM'},{value: '8:30PM'},{value: '9:00PM'},{value: '9:30PM'},
    {value: '10:00PM'},{value: '10:30PM'},{value: '11:00PM'},]

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.create}>Create New Event:</Text>
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          onChangeText={(eventName) => this.setState({eventName})}
        />
        <Dropdown
          label='Sport'
          data={sports}
          fontSize={20}
          containerStyle={styles.dropdown}
          onChangeText={(itemValue, itemIndex) => this.setState({ sport: itemValue })}
        />
        <Dropdown
          label='Month'
          data={months}
          fontSize={20}
          containerStyle={styles.dropdown}
          onChangeText={(itemValue, itemIndex) => this.setState({ month: itemValue })}
        />
        <Dropdown
          label='Day'
          data={days}
          fontSize={20}
          containerStyle={styles.dropdown}
          onChangeText={(itemValue, itemIndex) => this.setState({ day: itemValue })}
        />
        <Dropdown
          label='Start Time'
          data={times}
          fontSize={20}
          containerStyle={styles.dropdown}
          onChangeText={(itemValue, itemIndex) => this.setState({ time: itemValue })}
        />

        <TextInput
          style={styles.input}
          placeholder="Street Address"
          onChangeText={(street) => this.setState({street})}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
        />
        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          onChangeText={(zip) => this.setState({zip})}
        />
        <Text style={styles.input}>
        Set Minimum # of Players?
        </Text>
        <RadioForm
          radio_props={[
            {label: 'No', value: false },
            {label: 'Yes', value: true }
          ]}
          initial={0}
          onPress={(value) => {this.setState({minPlayersEnabled: !!value})}}
        />
        <Text>{this.state.minPlayers}</Text>
        <Slider
          disabled={this.state.minPlayersEnabled ? false : true}
          style={{ width: 200, height: 40 }}
          minimumValue={2}
          maximumValue={20}
          step={1}
          value={2}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onValueChange={value => this.setState({minPlayers: value})}
        />
        <Text style={styles.input}>
        Set Maximum # of Players?
        </Text>
        <RadioForm
          radio_props={[
            {label: 'No', value: false },
            {label: 'Yes', value: true }
          ]}
          initial={0}
          onPress={(value) => {this.setState({maxPlayersEnabled: !!value})}}
        />
        <Text>{this.state.maxPlayers}</Text>
        <Slider
          disabled={this.state.maxPlayersEnabled ? false : true}
          style={{ width: 200, height: 40 }}
          minimumValue={2}
          maximumValue={20}
          step={1}
          value={2}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onValueChange={value => this.setState({maxPlayers: value})}
        />
        <Text style={styles.input}>
        Even # of Players Only?
        </Text>
        <RadioForm
          radio_props={[
            {label: 'No', value: false },
            {label: 'Yes', value: true }
          ]}
          initial={0}
          onPress={(value) => {
            this.setState({evenOnly: value})
          }}
        />
        <TextInput
          style={{minHeight: 150, height: 'auto', fontSize: 26, marginTop: 15, marginRight: 15, borderWidth: 1}}
          multiline={true}
          numberOfLines={4}
          placeholder="Details"
          onChangeText={(details) => this.setState({details})}
        />
        <Button
          onPress={() => {
            //TODO: send a post request


            Alert.alert('You pressed submit!');
          }}
          title="Post Event"
        />
        <Button
          onPress={() => {
            Alert.alert(this.state);
          }}
          title="VIEW STATE"
        />
      </ScrollView>
    );
  }
}

