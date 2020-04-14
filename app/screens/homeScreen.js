import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

class HomeScreen extends React.Component{
    render() {
        return (
            <View>
                <Text>
                    Home Screen
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SummaryScreen')}><Text>Summary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('GlobalScreen')}><Text>Global</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('CountryScreen')}><Text>Country</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeScreen;