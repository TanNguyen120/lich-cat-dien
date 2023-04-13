import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper'

const ScheduleRow = ({ contend }) => {

    const theme = useTheme();
    const [display, setDisplay] = useState('');
    const [flag, setFlag] = useState('normal');
    const [style, setStyle] = useState('');


    useEffect(() => {
        let display = contend;
        // check if the contend is date or not
        if (contend.includes('Ngày')) {
            setStyle(' border-t pt-2 ml-3 mt-6 ');
            display = '☀ ' + display + ' :';
            setDisplay(display);
        } else {
            display = '- ' + display;
            setStyle(' ml-5 mt-3');
            setDisplay(display)
        }

        // check if our province get an electric black out
        if (contend.includes('Kiến An')) {
            setStyle(prev => prev + ' text-red-500');
            setFlag('danger');
        }
        // check if cho moi in the things
        if (contend.includes('Chợ Mới')) {
            setStyle(prev => prev + ' text-blue-500');
        }

    }, [contend])
    return (
        <View className={`${style}`}>
            {flag === 'danger' ? <Text style={{ color: theme.colors.error }}>
                <IconButton
                    icon="sign-caution"
                    iconColor={theme.colors.error}
                    size={10}
                />
                {display} </Text> : <Text className={style}>{display}</Text>}
        </View>
    )
}

export default ScheduleRow