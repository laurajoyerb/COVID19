import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

var data = {"cases": ""};

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

    // The api requries a "to" and a "from" date
    // we will make the "from" date the day before the date actually requested
    var d = new Date(date);
    var from = d.setDate(d.getDate() - 1);
    from = from.toString();

    var to = date;

    // these are the same for all calls
    const base_url = "https://api.covid19api.com/country/" + slug;
    const params_url = from + "&to=" + to;

    // for each type of status
    const confirmed_url = "/status/confirmed?from=";
    const deaths_url = "/status/deaths?from=";
    const recovered_url = "/status/recovered?from=";

    // one fetch for each type of status
    fetch(base_url + confirmed_url + params_url, requestOptions)
        .then(response => response.json())
        .then(result => getExactDate(result, date))
        .catch(error => console.log('error', error));

    fetch(base_url + deaths_url + params_url, requestOptions)
        .then(response => response.json())
        .then(result => getExactDate(result, date))
        .catch(error => console.log('error', error));

    fetch(base_url + recovered_url + params_url, requestOptions)
        .then(response => response.json())
        .then(result => getExactDate(result, date))
        .catch(error => console.log('error', error));
};

function getExactDate(res, date) {
    // sends only one object to extractData function
    // selects onyl the one object from the target date
    res.forEach(element => {
        if (element.Date == date) {
            extractData(element);
        }
    });
}

function extractData(obj) {
    // updates data for corresponding status
    switch (obj.Status) {
        case "deaths":
            data.deaths = obj.Cases;
            break;
        case "recovered":
            data.recovered = obj.Cases;
            break;
        case "confirmed":
            data.cases = obj.Cases;
            break;
        default:
            break;
    }
}

getCountryData("South Africa", "2020-03-30T00:00:00Z");

export default

class App extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    Country Screen
                </Text>
                <Text>
                    Cases: {data.cases}
                </Text>
                <Text>
                    Deaths: {data.deaths}
                </Text>
                <Text>
                    Recovered: {data.recovered}
                </Text>
            </View>
        );
    }
}