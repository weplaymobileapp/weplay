import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Button, TouchableOpacity } from 'react-native';
import Calendar from 'react-native-day-picker';
import data from '../data/eventsExample.json';
import { Dropdown } from 'react-native-material-dropdown';

export default class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: 'Ping Pong',
      radius: '1',
      month: '01',
      day: '01',
      querys: []
    }
  }

  updateQuery() {
    let { day, month } = this.state
    if (day.length === 1) {
      day = '0' + day;
    }
    if (month.length === 1) {
      month = '0' + month;
    }
    let YYMMDD = '2019-' + month + '-' + day;
    let newQueries = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].date === YYMMDD && data[i].sport === this.state.sport) {
        newQueries.push(data[i]);
      }
    }
    console.log(YYMMDD, this.state.sport)
    this.setState({ querys: newQueries });
  }

  render() {
    var from = new Date();
    var to = new Date();
    to.setDate(to.getDate() + 9);
    var startDate = new Date();
    startDate.setMonth(startDate.getMonth() + 1);
    let sports = [{ value: 'Ping Pong' }, { value: 'Pickle Ball' }, { value: 'Basketball' }, { value: 'Volleyball' }, { value: 'Hacky Sack' }, { value: 'Laser Tag' }, { value: 'Mini Golf' }];
    let miles = [{ value: 1 }, { value: 5 }, { value: 10 }, { value: 20 }, { value: 30 }, { value: 40 }, { value: 50 }]
    return (
      <View style={styles.outer}>

        <View style={[styles.body, { flex: .5 }]}>
          <Text style={{ fontSize: 40, top: 15 }}>Find an Event</Text>
        </View>

        <View style={[styles.body, styles.rows, { flex: 1.2 }]}>
          <View style={[styles.row, { margin: 30 }]}>
            <Dropdown label='Sport' data={sports} onChangeText={(itemValue, itemIndex) => {
              this.setState({ sport: itemValue }, () => this.updateQuery())
            }}/>
          </View>
          <View style={[styles.row, { margin: 30 }]}>
            <Dropdown label='Radius (Miles)' data={miles} onChangeText={(itemValue, itemIndex) => {
              this.setState({ radius: itemValue })
            }}/>
          </View>
        </View>

        <View style={[styles.body, styles.rows, { flex: 3 }]}>
          <View style={[styles.row, { flex: 2.4 }]}>
            <Calendar
              monthsCount={1}
              startFormMonday={true}
              startDate={startDate}
              rangeSelect={false}
              isFutureDate={true}
              width={290}
              onSelectionChange={(current, previous) => {
                this.setState({ month: JSON.stringify(current.getMonth()), day: JSON.stringify(current.getDate()) }, () => this.updateQuery())
              }}
            />
          </View>
          <View style={[styles.row, { flex: 1.2, alignItems: 'center' }]}>
            <Text style={{ top: 10, fontSize: 15, textAlign: 'center' }}>Look for {this.state.sport} events in a {this.state.radius} mile radius</Text>
            <Text style={{ top: 10, fontSize: 15, textAlign: 'center'  }}>On {this.state.month}/{this.state.day}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {
              console.log(this.state.querys.length, ' items found');
              this.props.navigation.navigate('Find2', { sport: this.state.sport, radius: this.state.radius, month: this.state.month, day: this.state.day, query: this.state.querys })
            }}>
              <Text style={{ fontSize: 25 }}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
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
    // justifyContent: 'space-around',
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
    // alignItems: 'center'
  },
  row: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'black',
    // alignItems: 'center'
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


/*

            <Text style={{ top: 0, fontSize: 20 }}>Sport</Text>
            <Picker itemStyle={{ height: 140, width: 180 }} selectedValue={this.state.sport} style={styles.input} onValueChange={(itemValue, itemIndex) => {
              this.setState({ sport: itemValue }, () => this.updateQuery())
            }
            }>
              <Picker.Item label="Ping Pong" value="Ping Pong" />
              <Picker.Item label="Pickle Ball" value="Pickle Ball" />
              <Picker.Item label="Basketball" value="Basketball" />
              <Picker.Item label="Volleyball" value="Volleyball" />
              <Picker.Item label="Hacky Sack" value="Hacky Sack" />
              <Picker.Item label="Laser Tag" value="Laser Tag" />
              <Picker.Item label="Mini Golf" value="Mini Golf" />
            </Picker>

            <Text style={{ top: 0, fontSize: 20 }}>Radius (Miles)</Text>
                        <Picker itemStyle={{ height: 140, width: 100 }} selectedValue={this.state.radius} style={styles.input} onValueChange={(itemValue, itemIndex) => {
              this.setState({ radius: itemValue })
            }
            }>
              <Picker.Item label="1" value={1} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="20" value={20} />
              <Picker.Item label="30" value={30} />
              <Picker.Item label="40" value={40} />
              <Picker.Item label="50" value={50} />
            </Picker>

            */