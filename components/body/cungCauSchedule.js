import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import ScheduleRow from './scheduleRow'

const CungCauSchedule = ({ schedule }) => {
    const theme = useTheme();
    return (
        <View>{
            schedule ? schedule.map((e, index) => <ScheduleRow contend={e} key={index} />) : <ActivityIndicator animating={true} color={theme.colors.primary} />
        }</View>
    )
}

export default CungCauSchedule