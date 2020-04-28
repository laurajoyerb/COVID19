import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import latlong from './latlong.json'

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    callout: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
});

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

export default

class App extends React.Component {

    constructor() {
        super();
        this.state = { markers: [] };
    }

    async componentDidMount() {
        let res = await fetch("https://api.covid19api.com/summary", requestOptions);
        var json = await res.json();
        var countryNums = json.Countries;

        // adds lat long info to json
        countryNums.forEach(element => {
            var code = element.CountryCode.toLowerCase();

            if (code in latlong) {
                element.Lat = parseFloat(latlong[code].lat);
                element.Long = parseFloat(latlong[code].long);
            } else if (countryNums.indexOf(element) != -1) {
                // if lat long isn't found in json, country is removed
                countryNums.splice(countryNums.indexOf(element), 1);
            } 
        });

        this.setState({ markers: countryNums });
    }

    render() {
        let mapItem = 
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: 20,
                    longitude: -40,
                    latitudeDelta: 100.0,
                    longitudeDelta: 100.0,
                }}
            >
                {this.state.markers.map(marker =>(
                    <MapView.Marker
                        coordinate={{
                            latitude: marker.Lat,
                            longitude: marker.Long
                        }}
                    >
                        <MapView.Callout>
                            <View style={styles.callout}>
                                <Text style={{fontWeight: "bold"}}> {marker.Country} </Text>
                                <Text> Cases: {marker.TotalConfirmed}  </Text>
                                <Text> Deaths: {marker.TotalDeaths} </Text>
                                <Text> Recovered: {marker.TotalRecovered} </Text>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
                ))}
            </MapView>;
                
        return (
            <View style={styles.container}>
                {mapItem}
            </View>
        );
    }
}