import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

var summary = {"globalCases": 0};

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function getSummary() {
  fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.json())
    .then(result => parseSummary(result))
    .catch(error => console.log('error', error));};

function parseSummary(res) {
    summary.globalCases = res.Global.TotalConfirmed;
    summary.globalDeaths = res.Global.TotalDeaths;
    summary.globalRecovered = res.Global.TotalRecovered;

    // console.log(typeof res.Countries);
    // console.log(res.Countries.length);

    var maxCases = 0;
    var worstCountry = "";

    for (let index = 0; index < res.Countries.length; index++) {
        const country = res.Countries[index];
        if (country.TotalConfirmed > maxCases) {
            maxCases = country.TotalConfirmed;
            worstCountry = country.Country;
        }
    }

    summary.worstCountry = worstCountry;
    summary.worstCountryCases = maxCases;
};

getSummary();

export default

class App extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    Summary Screen
                </Text>
                <Text>
                    Global Cases: {summary.globalCases}
                </Text>
                <Text>
                    Global Deaths: {summary.globalDeaths}
                </Text>
                <Text>
                    Global Recovered: {summary.globalRecovered}
                </Text>
                <Text>
                    Global Epicenter: {summary.worstCountry} with {summary.worstCountryCases} cases
                </Text>
            </View>
        );
    }
}