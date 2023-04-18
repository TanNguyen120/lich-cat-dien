import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper'


const StyleRow = ({ flag, contend }) => {
    const theme = useTheme();
    switch (flag) {
        case 'warning':
            return <Text style={{ color: 'blue' }}>{contend}</Text>
        case 'danger':
            return <Text style={{ color: theme.colors.error }}>
                <IconButton
                    icon="sign-caution"
                    iconColor={theme.colors.error}
                    size={10}
                />
                {contend} </Text>

        default:
            return <Text>
                {contend}
            </Text>
    }
}






const ScheduleRow = ({ contend }) => {


    const [display, setDisplay] = useState('');
    const [flag, setFlag] = useState('normal');
    const [style, setStyle] = useState('mb-3');


    useEffect(() => {

        let display = contend;
        // check if the contend is date or not
        if (contend.includes('Ngày')) {
            setStyle(prev => prev + ' border-t pt-2 ml-3 mt-6 ');
            display = '☀ ' + display + ' :';
            setDisplay(display);
        } else {
            display = '- ' + display;
            setStyle(prev => prev + ' ml-5 mt-3');
            setDisplay(display)
        }

        // check if our province get an electric black out
        if (contend.includes('Kiến An')) {
            console.log('Urgent: Kiến An is in Schedule')
            setStyle(prev => prev + ' text-red-500');
            setFlag('danger');
        }
        // check if cho moi in the things
        if (contend.includes('Chợ Mới')) {
            console.log('Chợ Mới is in Schedule');
            setFlag('warning')
            setStyle(prev => prev + ' text-blue-500');
        }

    }, [contend])
    return (
        <View className={style}>
            <StyleRow flag={flag} contend={display} />
        </View>
    )
}

export default ScheduleRow