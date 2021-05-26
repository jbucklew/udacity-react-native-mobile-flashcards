import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AppStatusBar from './components/AppStatusBar';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import DeckView from './components/DeckView';
import QuizView from './components/QuizView';
import AddCard from './components/AddCard';
import { setLocalNotification } from './utils/notification';


const Tab = Platform.OS === 'ios'
  ? createBottomTabNavigator()
  : createMaterialTopTabNavigator();

const Stack = createStackNavigator();

function DeckStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Decks' component={Decks} />
      <Stack.Screen name='Deck View' component={DeckView} />
      <Stack.Screen name='Quiz View' component={QuizView} />
      <Stack.Screen name='Add Card' component={AddCard} />
    </Stack.Navigator>
  );
}

export default function App() {
  // TODO: add setLocalNotification() to useEffect for componentDidMount
  useEffect(() => {
    console.log('setting local notification');
    setLocalNotification();
  });

  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <AppStatusBar />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name='Decks' component={DeckStackNavigator} />
            <Tab.Screen name='Add Deck' component={AddDeck} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
