import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import { LogBox } from 'react-native';
import CartScreen from '../screens/CartScreen';
import Login from '../components/login';
import Register from '../components/register';

const Stack = createNativeStackNavigator();


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Product" options={{headerShown: false}} component={ProductScreen} />
        <Stack.Screen name="Cart" options={{headerShown: false}} component={CartScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
