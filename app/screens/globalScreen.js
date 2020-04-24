import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
    },
    map: {
        height: 400,
        width: 400,
    },
});


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
            <View style={styles.container}>
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
                    <MapView.Marker
                        coordinate={{
                            latitude: 62,
                            longitude: -152
                        }}
                        title={"title"}
                        description={"description"}
                    />
                </MapView>
            </View>
        );
    }
}