import React from 'react';
import { Button, View, Text } from 'react-native';

const Decks = ({ navigation }) => {
  return (
    <View>
      <Text>Decks View</Text>
      <Button
        title='View Deck'
        onPress={() => navigation.navigate('Deck View')}
      />
    </View>
  );
}

export default Decks;
