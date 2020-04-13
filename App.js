import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4286f4',
    flex: 1,
    alignItems: 'stretch',
  },
  viewStyleOne: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b642f4',
    flexGrow: 1,
  },
  viewStyleTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    flexGrow: 3,
  },
  viewStyleThree: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    flexGrow: 3,
  },
  textStyle: {
    textAlign: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

var globalCases = 0;
var globalDeaths = 0;
var globalRecovered = 0;

var USCases = 0;
var USDeaths = 0;
var USRecovered = 0;

function parseResponse(res) {
  var json_res = JSON.parse(res);

  globalCases = json_res.Global.TotalConfirmed;
  globalDeaths = json_res.Global.TotalDeaths;
  globalRecovered = json_res.Global.TotalRecovered;

  json_res.Countries.forEach(country => {
    if (country.Country == "United States of America") {
      USCases = country.TotalConfirmed;
      USDeaths = country.TotalDeaths;
      USRecovered = country.TotalRecovered;
    } 
  });

  // console.log("Global Cases: " + globalCases);
  // console.log("Global Deaths: " + globalDeaths);
  // console.log("Global Recovered: " + globalRecovered);
  // console.log("US Cases: " + USCases);
  // console.log("US Deaths: " + USDeaths);
  // console.log("US Recovered: " + USRecovered);
};

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://api.covid19api.com/summary", requestOptions)
  .then(response => response.text())
  .then(result => parseResponse(result))
  .catch(error => console.log('error', error));

export default

  class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewStyleOne}>
          <Text style={styles.textStyle}> Title </Text>
        </View>
        <View style={styles.viewStyleTwo}>
          <Text style={styles.textStyle}> Global Stats </Text>
        </View>
        <View style={styles.viewStyleThree}>
          <Text style={styles.textStyle}> Country Stats </Text>
        </View>
      </View>
    );
  }
}