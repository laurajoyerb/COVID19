import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import "./globals.js"

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4286f4',
    flex: 1,
    alignItems: 'stretch',
  },
  viewStyleOne: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
    flexGrow: 1,
  },
  viewStyleTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    flexGrow: 3,
  },
  viewStyleThree: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue',
    flexGrow: 3,
  },
  textStyle: {
    textAlign: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function getWorldSummary() {
  fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.json())
    .then(result => parseWorld(result))
    .catch(error => console.log('error', error));};

function getCountrySummary(country) {
  fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.json())
    .then(result => parseCountry(country, result))
    .catch(error => console.log('error', error));
};

function parseWorld(res) {

  global.globalCases = res.Global.TotalConfirmed;
  global.globalDeaths = res.Global.TotalDeaths;
  global.globalRecovered = res.Global.TotalRecovered;
};

function parseCountry(country_target, res) {

  res.Countries.forEach(country => {
    if (country.Country == country_target) {
      global.countryCases = country.TotalConfirmed;
      global.countryDeaths = country.TotalDeaths;
      global.countryRecovered = country.TotalRecovered;
    }
  });
};

getWorldSummary();
getCountrySummary("South Africa");

export default

  class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewStyleOne}>
          <Text style={styles.textStyle}> Title </Text>
        </View>
        <View style={styles.viewStyleTwo}>
          <Text style={styles.textStyle}> Global Cases: {global.globalCases} </Text>
          <Text style={styles.textStyle}> Global Deaths: {global.globalDeaths} </Text>
          <Text style={styles.textStyle}> Global Recovered: {global.globalRecovered} </Text>
        </View>
        <View style={styles.viewStyleThree}>
          <Text style={styles.textStyle}> Country Cases: {global.countryCases} </Text>
          <Text style={styles.textStyle}> Country Deaths: {global.countryDeaths} </Text>
          <Text style={styles.textStyle}> Country Recovered: {global.countryRecovered} </Text>
        </View>
      </View>
    );
  }
}