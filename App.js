import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 700,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
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

  console.log("Global Cases: " + globalCases);
  console.log("Global Deaths: " + globalDeaths);
  console.log("Global Recovered: " + globalRecovered);
  console.log("US Cases: " + USCases);
  console.log("US Deaths: " + USDeaths);
  console.log("US Recovered: " + USRecovered);
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
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 62,
            longitude: -152,
            latitudeDelta: 20.0,
            longitudeDelta: 40.0,
          }}
        >
        </MapView>
      </View>
    );
  }
}