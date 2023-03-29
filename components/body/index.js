import React from 'react'

import { View, Text, StatusBar } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'
import LichCatDienComponent from './lichCatDienComponent'
import TodayComponent from './todayComponent'

const Body = () => {
    const theme = useTheme()
    return (
        <View className='min-h-screen' style={{ backgroundColor: theme.colors.primaryContainer }}>
            <TodayComponent />
            <Divider />
            <LichCatDienComponent />
            <StatusBar className=' bg-slate-600' />
        </View>
    )
}

export default Body