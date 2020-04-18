// import * as React from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import "./globals.js"

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#4286f4',
//     flex: 1,
//     alignItems: 'stretch',
//   },
//   viewStyleOne: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'powderblue',
//     flexGrow: 1,
//   },
//   viewStyleTwo: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'skyblue',
//     flexGrow: 3,
//   },
//   viewStyleThree: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'steelblue',
//     flexGrow: 3,
//   },
//   textStyle: {
//     textAlign: 'center'
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default

//   class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.viewStyleOne}>
//           <Text style={styles.textStyle}> Title </Text>
//         </View>
//         <View style={styles.viewStyleTwo}>
//           <Text style={styles.textStyle}> Global Cases: {global.globalCases} </Text>
//           <Text style={styles.textStyle}> Global Deaths: {global.globalDeaths} </Text>
//           <Text style={styles.textStyle}> Global Recovered: {global.globalRecovered} </Text>
//         </View>
//         <View style={styles.viewStyleThree}>
//           <Text style={styles.textStyle}> Country Cases: {global.countryCases} </Text>
//           <Text style={styles.textStyle}> Country Deaths: {global.countryDeaths} </Text>
//           <Text style={styles.textStyle}> Country Recovered: {global.countryRecovered} </Text>
//         </View>
//       </View>
//     );
//   }
// }

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator, createAppContainer } from 'react-navigation';
import AppNavigator from './app/navigation/appNavigator'

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}