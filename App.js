// gesture-handler must be at the top according to the documentation
// for react-navigation
// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Decks" component={Decks} />
        <Tab.Screen name="New Deck" component={NewDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}