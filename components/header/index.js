import * as React from 'react';
import { Linking } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';


// open calender native app of operating system
const handelOpenCalender = () => {
    console.log('calender press');
    if (Platform.OS === 'ios') {
        Linking.openURL('calshow:');
    } else if (Platform.OS === 'android') {
        Linking.openURL('content://com.android.calendar/time/');
    }
}



const Header = () => {
    const theme = useTheme();
    return (
        <Appbar.Header style={{ backgroundColor: theme.colors.primary, }}>
            <Appbar.Content color={theme.colors.secondaryContainer} title="Lịch Cắt Điện Mới Nhất " />
            <Appbar.Action color={theme.colors.secondaryContainer} icon="calendar" onPress={() => { handelOpenCalender() }} />
            <Appbar.Action color={theme.colors.secondaryContainer} icon="menu" onPress={() => { console.log('magnify press') }} />
        </Appbar.Header>
    );
}

export default Header;