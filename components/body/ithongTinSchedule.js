
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import { List, MD3Colors } from 'react-native-paper';


const ScheduleRow = ({ rowData }) => {
    const [flag, setFlag] = React.useState('normal');
    React.useEffect(() => {

        if (rowData) {
            if (rowData.detailArea.includes('Kiến An')) {
                setFlag('danger')
            }
        }
    }, [rowData])
    const theme = useTheme();
    return (

        <View className='grid grid-cols-2 border-b border-slate-300 py-6'>
            <View>
                <List.Section>
                    <List.Item titleStyle={{ fontWeight: '800' }} title={`Ngày: ${rowData.date}`} left={() => <List.Icon icon="calendar-blank-outline" />} />
                    <List.Item
                        title={`Tại: ${rowData.area}`}
                        left={() => <List.Icon icon="lighthouse" />}
                    />
                    <List.Item
                        title={`Từ: ${rowData.timeStart} => Đến: ${rowData.timeEnd}`}
                        left={() => <List.Icon icon="clock-time-four-outline" />}
                    />
                </List.Section>
            </View>
            <View className=' grid grid-cols-1' >
                {
                    flag === 'danger' ?
                        <Text className=' m-3' variant='bodyLarge' style={{ color: 'red' }}>
                            {`${rowData.detailArea}`}
                        </Text>
                        :
                        <Text className=' m-3' variant='bodyMedium'>
                            {`${rowData.detailArea}`}
                        </Text>
                }
                <Text className=' m-3 ' variant='labelMedium' style={{ color: theme.colors.secondary }}>
                    {`Lý Do: ${rowData.reason}`}
                </Text>
            </View>
        </View >
    )
}








const IthongTinSchedule = ({ schedule }) => {
    const theme = useTheme();
    return (
        <View className=' m-5 p-3 min-h-screen'>
            <View className=' grid grid-cols-1 divide-y'>
                {schedule ? schedule.map((e, index) => <ScheduleRow rowData={e} key={index} />) : <ActivityIndicator animating={true} color={theme.colors.primary} />}
            </View>
        </View>
    )
}

export default IthongTinSchedule