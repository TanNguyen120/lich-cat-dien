import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

const CungCauSchedule = ({ schedule }) => {
    const theme = useTheme()
    return (
        <View>{
            schedule ? schedule.map((e, index) => <ScheduleRow contend={e} key={index} />) : <ActivityIndicator animating={true} color={theme.colors.primary} />
        }</View>
    )
}

export default CungCauSchedule