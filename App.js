import 'react-native-gesture-handler';
import React from 'react'
import {Text, View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/HomeScreen';
import NavigationScreen from './app/screens/NavigationScreen';
import IdentifyScreen from './app/screens/IdentifyScreen';
import SearchScreen from './app/screens/SearchScreen';
import qrScreen from './app/screens/qrScreen';
import ColorScreen from './app/screens/ColorScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{header: () => null}} />
        <Stack.Screen name="Qr" component={qrScreen} options={{headerTitle: 'Back'}} />
        <Stack.Screen name="Navigation" component={NavigationScreen} options={{headerTitle: 'Back'}} />
        <Stack.Screen name="Identify" component={IdentifyScreen} options={{headerTitle: 'Back'}} />
        <Stack.Screen name="Search" component={SearchScreen} options={{headerTitle: 'Back'}} />
        <Stack.Screen name="Color" component={ColorScreen} options={{headerTitle: 'Back'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
