import React from 'react'
import { View } from 'react-native'
import { BottomNavigation, Text } from 'react-native-paper';

const Footer = () => {
    const currentYear = new Date().getFullYear(); //To get the Current Year

    return (
        <View className=' text-center bg-slate-400 text-white grid-cols-1 min-w-full p-6 '>
            <Text className=' text-white mb-4'>
                App by Nguyen Viet Tan
            </Text>
            <Text className=' text-white'>
                Copyright © {currentYear} Nguyen Viet Tan
            </Text>
        </View>
    )
}

export default Footer