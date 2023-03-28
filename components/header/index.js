import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = () => (
    <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="calendar" onPress={() => { console.log('calender press') }} />
        <Appbar.Action icon="magnify" onPress={() => { console.log('magnify press') }} />
    </Appbar.Header>
);

export default Header;