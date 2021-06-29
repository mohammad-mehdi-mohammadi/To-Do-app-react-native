import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from "./pages/home";
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.StatusBar}>
        <StatusBar translucent style="light" backgroundColor="#5a55cb" />
      </View>

      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StatusBar: {
    height: Constants.statusBarHeight
  }
});
