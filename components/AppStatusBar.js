import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const AppStatusBar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#61dafb"
        barStyle='light-content'
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: Constants.statusBarHeight
  }
});

export default AppStatusBar;
