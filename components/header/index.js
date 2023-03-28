import * as React from 'react';
import { Linking } from 'react-native';
import { Appbar } from 'react-native-paper';

const handelOpenCalender = () => {
    console.log('calender press');
    if (Platform.OS === 'ios') {
        Linking.openURL('calshow:');
    } else if (Platform.OS === 'android') {
        Linking.openURL('content://com.android.calendar/time/');
    }
}


const Header = () => (
    <Appbar.Header>
        <Appbar.Content title="Lịch Cắt Điện Mới Nhất " />
        <Appbar.Action icon="calendar" onPress={() => { handelOpenCalender() }} />
        <Appbar.Action icon="menu" onPress={() => { console.log('magnify press') }} />
    </Appbar.Header>
);

export default Header;