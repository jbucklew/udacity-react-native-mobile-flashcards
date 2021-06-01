import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

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
  useEffect(() => {
    setLocalNotification();
  });

  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <AppStatusBar />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name='Decks'
              component={DeckStackNavigator}
              options={{
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name='layer-group' color={color} size={30} />
                )
              }}
            />
            <Tab.Screen
              name='Add Deck'
              component={AddDeck}
              options={{
                tabBarIcon: ({ color }) => (
                  <FontAwesome name='plus-square' color={color} size={30} />
                )
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
