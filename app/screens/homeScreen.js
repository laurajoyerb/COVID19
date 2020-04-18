import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

class HomeScreen extends React.Component{
    render() {
        return (
            <View>
                <Text>
                    COVID-19
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SummaryScreen')}><Text>Quick Summary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('GlobalScreen')}><Text>World Map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('CountryScreen')}><Text>By Country</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeScreen;