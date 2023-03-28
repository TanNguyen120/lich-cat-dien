import React from 'react'
import { View, Text, StatusBar } from 'react-native'

const Body = () => {
    return (
        <View className=' mt-44'>
            <Text className=' first-letter:text-6xl first-letter:text-sky-500'>Open up App.js to start working on your app!</Text>
            <StatusBar className=' bg-slate-600' />
        </View>
    )
}

export default Body