import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import { max } from 'react-native-reanimated';

var data = { "cases": "" };
var countries_list = Array();

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

// gets slug from api results, calls getSlugData to do api call
function parseSlug(target, res) {
    countries_list = [];
    var slug;
    res.forEach(country => {
        if (country.Country == target) {
            slug = country.Slug;
        }
        countries_list.push({ value: country.Country });
    });

    // alphabetizes list
    countries_list.sort(function(a, b) {
        return a.value > b.value;
    });

    return slug;

}

export default

    class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: "2020-04-22",
            country: "South Africa",
            cases: "-",
            deaths: "-",
            recovered: "-"
        }
    }

    async update() {
        var res = await fetch("https://api.covid19api.com/countries", requestOptions);
        var json = await res.json();

        var slug = parseSlug(this.state.country, json);

        // these are the same for all calls
        const base_url = "https://api.covid19api.com/total/country/" + slug;

        // for each type of status
        const confirmed_url = "/status/confirmed";
        const deaths_url = "/status/deaths";
        const recovered_url = "/status/recovered";

        var confirmed_res = await fetch(base_url + confirmed_url, requestOptions);
        var confirmed_json = await confirmed_res.json();
        var deaths_res = await fetch(base_url + deaths_url, requestOptions);
        var deaths_json = await deaths_res.json();
        var recovered_res = await fetch(base_url + recovered_url, requestOptions);
        var recovered_json = await recovered_res.json();

        const target = new Date(this.state.date);

        for (let index = 0; index < confirmed_json.length; index++) {
            const element = confirmed_json[index];
            var d = new Date(element.Date);

            if (d.getTime() == target.getTime()) {
                this.setState({ cases: element.Cases });
                this.setState({ deaths: deaths_json[index].Cases });
                this.setState({ recovered: recovered_json[index].Cases });
                return;
            }
            
        }
    }

    async componentDidMount() {
        await this.update();
    }

    render() {
        var maxDate = new Date();
        maxDate.setDate(maxDate.getDate() - 1); 

        return (
            <View>
                <Text>
                    Country Screen
                </Text>
                <Dropdown
                    label='Country'
                    data={countries_list}
                    itemCount={12}
                    value={this.state.country}
                    onChangeText={(text) => {
                        this.setState({ country: text })
                        this.update();
                    }}
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
                    maxDate={maxDate.toISOString().substring(0,10)}
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
                    onDateChange={(date) => {
                        this.setState({ date: date })
                        this.update();
                    }}
                />
            </View>
        );
    }
}