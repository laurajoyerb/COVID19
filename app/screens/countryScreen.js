import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'

// var data = {"cases": ""};
var countries_list = Array();

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

export default

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: "2020-01-22",
            country: "South Africa",
            deaths: 0,
            cases: 0,
            recovered: 0,
        }
    }

    getCountryData(country, date) {
        // getting country slug
        fetch("https://api.covid19api.com/countries", requestOptions)
            .then(response => response.json())
            .then(result => this.parseSlug(country, result, date))
            .catch(error => console.log('error', error));

        // parseSlug gets slug and passes that to next function
    }

    // gets slug from api results, calls getSlugData to do api call
    parseSlug(target, res, date) {
        var slug;
        res.forEach(country => {
            if (country.Country == target) {
                slug = country.Slug;
            }
            countries_list.push({ value: country.Country });
        });

        this.getSlugData(slug, date);
    }

    // gets the actual data for that country
    getSlugData(slug, date) {

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
            .then(result => this.getExactDate(result, date))
            .catch(error => console.log('error', error));

        fetch(base_url + deaths_url + params_url, requestOptions)
            .then(response => response.json())
            .then(result => this.getExactDate(result, date))
            .catch(error => console.log('error', error));

        fetch(base_url + recovered_url + params_url, requestOptions)
            .then(response => response.json())
            .then(result => this.getExactDate(result, date))
            .catch(error => console.log('error', error));
    };

    getExactDate(res, date) {
        // sends only one object to extractData function
        // selects only the one object from the target date
        res.forEach(element => {
            if (element.Date == date) {
                this.extractData(element);
            }
        });
    }

    extractData(obj) {
        // updates data for corresponding status
        switch (obj.Status) {
            case "deaths":
                this.state.deaths = obj.Cases;
                break;
            case "recovered":
                this.state.recovered = obj.Cases;
                break;
            case "confirmed":
                this.state.cases = obj.Cases;
                break;
            default:
                break;
        }
    }

    update() {
        var dateString = this.state.date + "T00:00:00Z";
        this.getCountryData(this.state.country, dateString);
    }

    render() {
        this.update();
        return (
            <View>
                <Text>
                    Country Screen
                </Text>
                <Dropdown
                    label='Country'
                    data={countries_list}
                    itemCount={10}
                    value={this.state.country}
                    onChangeText={this.update()}
                />
                <Text>
                    Cases: {this.state.cases}
                </Text>
                <Text>
                    Deaths: {this.state.deaths}
                </Text>
                <Text>
                    Recovered: {this.state.recovered}
                </Text>
                <DatePicker
                    style={{ width: 300 }}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2020-01-22"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                    onCloseModal={this.update()}
                />
            </View>
        );
    }
}