import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const TodayComponent = () => {
    const [today, setToday] = useState(null)
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        setToday(formattedToday)
    }, [])
    return (
        <View>
            <Text className=' ml-4 my-2'>Hôm nay là: {today}</Text>
        </View>
    )
}

export default TodayComponent