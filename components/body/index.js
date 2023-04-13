import React from 'react'

import { View, Text, StatusBar, ScrollView } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'
import LichCatDienComponent from './lichCatDienComponent'
import TodayComponent from './todayComponent'
import Footer from '../footer'
import Header from '../header'


const Body = ({ navigation }) => {
    const theme = useTheme()
    return (
        <View className='min-h-screen' style={{ backgroundColor: theme.colors.primaryContainer }}>
            <ScrollView>
                <Header navigation={navigation} />
                <TodayComponent />
                <Divider />
                <LichCatDienComponent />
                <StatusBar className=' bg-slate-600' />
                <Footer />
            </ScrollView>
        </View>
    )
}

export default Body