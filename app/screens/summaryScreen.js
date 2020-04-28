import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

var summary = {"globalCases": ""};

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function getSummary() {
  fetch("https://api.covid19api.com/summary", requestOptions)
    .then(response => response.json())
    .then(result => parseSummary(result))
    .catch(error => console.log('error', error));
};

function parseSummary(res) {
    summary.globalCases = res.Global.TotalConfirmed;
    summary.globalDeaths = res.Global.TotalDeaths;
    summary.globalRecovered = res.Global.TotalRecovered;

    var maxCases = 0;
    var worstCountry = {"name": " ", "confirmed": " ", "deaths": " ", "recovered": " "};

    for (let index = 0; index < res.Countries.length; index++) {
        const country = res.Countries[index];
        if (country.TotalConfirmed > maxCases) {
            maxCases = country.TotalConfirmed;
            worstCountry.name = country.Country;
            worstCountry.confirmed = country.TotalConfirmed;
            worstCountry.deaths = country.TotalDeaths;
            worstCountry.recovered = country.TotalRecovered;
        }
    }

    summary.worstCountry = worstCountry;
};

getSummary();

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'powderblue',
        flex: 1,
        alignItems: 'stretch',
        paddingTop: 30,
    },
    dataContainer: {
        padding: 5,
        margin: 15,
        flex: 1,
    },
    data: {
        textAlign: 'center',
        fontSize: 18,
        padding: 5,
        margin: 5,
        color: "lightcyan",
    },
    dataBox: {
        textAlign: 'center',
        backgroundColor: 'steelblue',
        padding: 5,
        paddingBottom: 15,
        margin: 5,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    titleBox: {
        textAlign: 'center',
        fontSize: 30,
    },
    sectionTitle: {
        textAlign: 'left',
        fontSize: 25,
        padding: 5,
        margin: 5,
        paddingTop: 15,
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
                    <Text style={styles.titleBox}>
                        Summary
                    </Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.sectionTitle}>
                        Global Case Overview
                    </Text>
                    <View style={styles.dataBox}>
                        <View>
                            <Text style={styles.data}>
                                Confirmed
                            </Text>
                            <Text style={styles.data}>
                                {summary.globalCases}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.data}>
                                Deaths
                            </Text>
                            <Text style={styles.data}>
                                {summary.globalDeaths}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.data}>
                                Recovered
                            </Text>
                            <Text style={styles.data}>
                                {summary.globalRecovered}
                            </Text>
                        </View>
                    </View>  
                    <Text style={{padding: 15}}></Text>
                    <Text style={styles.sectionTitle}>
                        Global Epicenter
                    </Text>
                    <Text style={{fontSize: 20, padding: 12}}>
                        {summary.worstCountry["name"]}
                    </Text>
                    <View style={styles.dataBox}>
                        <View>
                            <Text style={styles.data}>
                                Confirmed
                            </Text>
                            <Text style={styles.data}>
                                {summary.worstCountry["confirmed"]}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.data}>
                                Deaths
                            </Text>
                            <Text style={styles.data}>
                                {summary.worstCountry["deaths"]}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.data}>
                                Recovered
                            </Text>
                            <Text style={styles.data}>
                                {summary.worstCountry["recovered"]}
                            </Text>
                        </View>
                    </View>  
                </View>
            </View>
        );
    }
}