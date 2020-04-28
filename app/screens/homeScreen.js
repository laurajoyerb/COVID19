import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'powderblue',
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 50,
  },
  buttonBox: {
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: 'steelblue',
      padding: 20,
      margin: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 25,
    color: "lightcyan",
  },
  titleStyle: {
      textAlign: 'center',
      fontSize: 30,
      paddingBottom: 20,
  },
});

class HomeScreen extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titleStyle}>
                        COVID-19
                    </Text>
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SummaryScreen')}>
                        <Text style={styles.textStyle}>Quick Summary</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('GlobalScreen')}>
                        <Text style={styles.textStyle}>World Map</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CountryScreen')}>
                        <Text style={styles.textStyle}>By Country</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default HomeScreen;