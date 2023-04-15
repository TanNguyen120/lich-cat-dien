import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';




const SrcModal = ({ visible, setVisible }) => {
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    const [currentSrc, setCurrentSrc] = React.useState('CungCau')

    React.useEffect(() => {
        const getSettingData = async () => {
            try {
                const value = await AsyncStorage.getItem('@src')
                if (value !== null) {
                    // value previously stored
                    console.log('current src is: ' + value);
                    setCurrentSrc(currentSrc);
                } else {
                    await AsyncStorage.setItem('@src', 'CungCau');
                    console.log('new value added')
                }
            } catch (e) {
                // error reading value
                console.error(e)
            }
        }
        getSettingData()
    }, [visible])

    React.useEffect(() => {
        const storeData = async () => {
            try {
                await AsyncStorage.setItem('@src', currentSrc)
            } catch (e) {
                // saving error
                console.error(e)
            }
        }
        storeData();
    }, [currentSrc])
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} className=' m-10 min-h-screen'>
                <View className=" grid grid-cols-1 gap-4 px-6">
                    <Button icon="camera" mode={currentSrc === 'CungCau' ? "contained" : "outlined"} onPress={() => { setCurrentSrc('CungCau') }}>
                        web Cung Cầu
                    </Button>
                    <Button icon="camera" mode={currentSrc === 'iThongTin' ? "contained" : "outlined"} onPress={() => { setCurrentSrc('iThongTin') }}>
                        web iThongTin
                    </Button>
                </View>
            </Modal>
        </Portal>

    );
};

export default SrcModal;