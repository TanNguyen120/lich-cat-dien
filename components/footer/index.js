import React from 'react'
import { View } from 'react-native'
import { BottomNavigation, Text, useTheme } from 'react-native-paper';

const Footer = () => {
    const currentYear = new Date().getFullYear(); //To get the Current Year
    const theme = useTheme();
    return (
        <View className=' text-center bg-slate-400 text-white grid-cols-1 min-w-full p-6 ' style={{ backgroundColor: theme.colors.secondary }}>
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