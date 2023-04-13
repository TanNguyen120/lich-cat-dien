import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Body from './components/body';
import MenuComponent from './components/menu';
import Header from './components/header';
import Footer from './components/footer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>

        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name="Home"
            component={Body}
            screenOptions={{
              headerShown: false
            }}
          />
          <Stack.Screen name="Menu" component={MenuComponent} />
        </Stack.Navigator>

      </NavigationContainer>
    </PaperProvider>
  );
}




AppRegistry.registerComponent(appName, () => App);

