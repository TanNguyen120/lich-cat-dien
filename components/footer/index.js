import React from 'react'
import { View } from 'react-native'
import { BottomNavigation, Text, useTheme } from 'react-native-paper';

const Footer = () => {
    const currentYear = new Date().getFullYear(); //To get the Current Year
    const theme = useTheme();
    return (
        <View className=' text-gray-light text-center bg-slate-400 text-white grid grid-cols-1 min-w-full pb-6 pt-5' style={{ backgroundColor: theme.colors.secondary }}>
            <Text className=' pb-4'>
                App by Nguyen Viet Tan
            </Text>
            <Text className=' pb-4'>
                Copyright © {currentYear} Nguyen Viet Tan
            </Text>
        </View>
    )
}

export default Footer