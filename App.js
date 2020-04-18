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

import React, { Component } from 'react';
import AppNavigator from './app/navigation/appNavigator'

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}