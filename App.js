import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Body from './components/body';
import Header from './components/header';
import Footer from './components/footer';


export default function App() {
  return (
    <PaperProvider>
      <Header />
      <ScrollView>
        <Body />
        <Footer />
      </ScrollView>
    </PaperProvider>
  );
}




AppRegistry.registerComponent(appName, () => App);

