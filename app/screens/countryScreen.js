import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import { Divider } from 'react-native-elements';

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

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'powderblue',
        flex: 1,
        alignItems: 'stretch',
        paddingTop: 30,
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
    optionsBox: {
        textAlign: 'center',
        backgroundColor: 'steelblue',
        padding: 10,
        margin: 10,
        justifyContent: "space-evenly"
    },
    dateBox: {
        textAlign: 'center',
        padding: 5,
        margin: 5,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 25,
        padding: 5,
        margin: 5,
    }
});

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
            <View style={styles.container}>
                <View style={styles.optionsBox}>
                    <Dropdown
                        label='Country'
                        fontSize= {22}
                        labelFontSize={15}
                        labelTextStyle={{padding: 5}}
                        data={countries_list}
                        style={{ color: "lightcyan", padding: 5 }}
                        itemCount={12}
                        value={this.state.country}
                        onChangeText={(text) => {
                            this.setState({ country: text })
                            this.update();
                        }}
                    />
                    <View style={styles.dateBox}>
                        <Text style={{color: "lightcyan", fontSize: 18}}>
                            Date
                        </Text>
                        <DatePicker
                            style={{ width: 300 }}
                            date={this.state.date}
                            showIcon={false}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2020-01-22"
                            maxDate={maxDate.toISOString().substring(0, 10)}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    marginLeft: 36,
                                }
                            }}
                            onDateChange={(date) => {
                                this.setState({ date: date })
                                this.update();
                            }}
                        />
                    </View>
                </View>

                <Divider style={{backgroundColor: 'lightcyan', height: 3, marginVertical: 35, marginHorizontal: 20}} />

                <Text style={styles.title}>
                    {this.state.country}
                </Text>
                <View style={styles.dataBox}>
                    <View>
                        <Text style={styles.data}>
                            Confirmed
                            </Text>
                        <Text style={styles.data}>
                            {this.state.cases}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.data}>
                            Deaths
                            </Text>
                        <Text style={styles.data}>
                            {this.state.deaths}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.data}>
                            Recovered
                            </Text>
                        <Text style={styles.data}>
                            {this.state.recovered}
                        </Text>
                    </View>
                </View>  
            </View>
        );
    }
}