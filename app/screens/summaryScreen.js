import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

var summary = {"globalCases": ""};

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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'powderblue',
        flex: 1,
        alignItems: 'stretch',
        paddingTop: 50,
    },
    buttonBox: {
        backgroundColor: 'steelblue',
        padding: 20,
        margin: 20,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 15,
        backgroundColor: "green",
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 30,
        paddingBottom: 20,
        backgroundColor: "purple",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default

class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titleStyle}>
                        Summary
                    </Text>
                </View>
                <View style={styles.buttonBox}>
                    <View>
                        <Text style={styles.textStyle}>
                            Global Cases: {summary.globalCases}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.textStyle}>
                            Global Deaths: {summary.globalDeaths}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.textStyle}>
                            Global Recovered: {summary.globalRecovered}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.textStyle}>
                            Global Epicenter: {summary.worstCountry} with {summary.worstCountryCases} cases
                    </Text>
                    </View>
                </View>
            </View>
        );
    }
}