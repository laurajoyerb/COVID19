import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

var data = {"cases": 0};

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

function getCountryData(country, date) {

    // getting country slug
    fetch("https://api.covid19api.com/countries", requestOptions)
        .then(response => response.json())
        .then(result => parseSlug(country, result, date))
        .catch(error => console.log('error', error));

    // parseSlug gets slug and passes that to next function
}

// gets slug from api results, calls getSlugData to do api call
function parseSlug(target, res, date) {
    res.forEach(country => {
        if (country.Country == target) {
            getSlugData(country.Slug, date);
        }
    });
}

// gets the actual data for that country
function getSlugData(slug, date) {
    var from = "2020-04-01T00:00:00Z";
    var to = date;

    const base_url = "https://api.covid19api.com/country/" + slug;
    const status_url = base_url + "/status/deaths?from=";
    const params_url = status_url + from + "&to=" + to;
    fetch(params_url, requestOptions)
        .then(response => response.json())
        .then(result => getExactDate(result, date))
        .catch(error => console.log('error', error));
};

function getExactDate(res, date) {
    res.forEach(element => {
        if (element.Date == date) {
            extractData(element);
        }
    });
}

function extractData(obj) {
    console.log(obj);
}

getCountryData("South Africa", "2020-04-02T00:00:00Z");

export default

class App extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    Country Screen
                </Text>
            </View>
        );
    }
}