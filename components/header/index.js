import * as React from 'react';
import { Linking, View } from 'react-native';
import { Appbar, useTheme, Menu } from 'react-native-paper';


// open calender native app of operating system
const handelOpenCalender = () => {
    console.log('calender press');
    if (Platform.OS === 'ios') {
        Linking.openURL('calshow:');
    } else if (Platform.OS === 'android') {
        Linking.openURL('content://com.android.calendar/time/');
    }
}

// open the menu 


const Header = ({ navigation }) => {
    const theme = useTheme();
    const [showDrawer, setShowDrawer] = React.useState(false)

    return (
        <Appbar.Header style={{ backgroundColor: theme.colors.primary, }}>
            <Appbar.Content color={theme.colors.secondaryContainer} title="Lịch Cắt Điện Mới Nhất " onPress={() => navigation.navigate('Home')} />
            <Appbar.Action color={theme.colors.secondaryContainer} icon="calendar" onPress={() => { handelOpenCalender() }} />
            <Appbar.Action color={theme.colors.secondaryContainer} icon="cog" onPress={() => { navigation.navigate('Menu') }} />
        </Appbar.Header>
    );
}

export default Header;