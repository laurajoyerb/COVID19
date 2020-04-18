import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

var selected = {"name": 0};

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function getCountrySummary(country) {
  fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.json())
    .then(result => parseCountry(country, result))
    .catch(error => console.log('error', error));
};

function parseCountry(country_target, res) {

  res.Countries.forEach(country => {
    if (country.Country == country_target) {
        selected.name = country_target;
        selected.cases = country.TotalConfirmed;
        selected.deaths = country.TotalDeaths;
        selected.recovered = country.TotalRecovered;
    }
  });
};

getCountrySummary("South Africa");

export default

class App extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    Global Screen
                </Text>
                <Text>
                    Country: {selected.name}
                </Text>
                <Text>
                    Country Cases: {selected.cases}
                </Text>
                <Text>
                    Country Deaths: {selected.deaths}
                </Text>
                <Text>
                    Country Recovered: {selected.recovered}
                </Text>
            </View>
        );
    }
}