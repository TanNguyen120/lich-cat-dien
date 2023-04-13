import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Menu, useTheme } from 'react-native-paper';
import Footer from '../footer'
import Header from '../header'

const MenuComponent = ({ navigation }) => {
    const theme = useTheme();
    return (
        <View style={{ backgroundColor: theme.colors.primaryContainer }}>
            <ScrollView>
                <Header navigation={navigation} />
                <View className='min-h-screen'>
                    <Menu.Item leadingIcon="redo" onPress={() => { }} title="Redo" />
                    <Menu.Item leadingIcon="undo" onPress={() => { }} title="Undo" />
                    <Menu.Item leadingIcon="content-cut" onPress={() => { }} title="Cut" disabled />
                    <Menu.Item leadingIcon="content-copy" onPress={() => { }} title="Copy" disabled />
                    <Menu.Item leadingIcon="content-paste" onPress={() => { }} title="Paste" />
                </View>
                <Footer />
            </ScrollView>
        </View >)

};

export default MenuComponent;