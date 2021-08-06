import 'react-native-gesture-handler';
import React from 'react'
import {Text, View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/HomeScreen';
import NavigationScreen from './app/screens/NavigationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{header: () => null}} />
        <Stack.Screen name="Navigation" component={NavigationScreen} options={{headerTitle: 'Back'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
