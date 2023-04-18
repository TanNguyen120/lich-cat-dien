import React, { useEffect, useState } from 'react'

import { View, Text, StatusBar, ScrollView, RefreshControl } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'
import LichCatDienComponent from './lichCatDienComponent'
import TodayComponent from './todayComponent'
import Footer from '../footer'
import Header from '../header'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Body = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [src, setCurrentSrc] = React.useState()
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setCurrentSrc(prev => !prev)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    React.useEffect(() => {
        const getSettingData = async () => {
            try {
                const value = await AsyncStorage.getItem('@src')
                if (value !== null) {
                    // value previously stored
                    console.log('Home Component > current src is: ' + value);
                    setCurrentSrc(value);
                } else {
                    await AsyncStorage.setItem('@src', 'iThongtin');
                    console.log('new value added')
                }
            } catch (e) {
                // error reading value
                console.error(e)
            }
        }
        getSettingData();
    }, [refreshing])
    const theme = useTheme()
    return (
        <View className='min-h-screen ' style={{ backgroundColor: theme.colors.primaryContainer }}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Header navigation={navigation} />
                <TodayComponent />
                <Divider />
                <LichCatDienComponent currentSrc={src} refreshing={onRefresh} />
                <StatusBar className=' bg-slate-600' />
                <Footer />
            </ScrollView>
        </View>
    )
}

export default Body