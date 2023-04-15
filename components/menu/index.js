import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { List, useTheme, Modal, Portal, } from 'react-native-paper';
import Footer from '../footer'
import Header from '../header'
import SrcModal from './srcModal';

const MenuComponent = ({ navigation }) => {
    const theme = useTheme();
    const [visible, setVisible] = React.useState(false);

    return (
        <View style={{ backgroundColor: theme.colors.primaryContainer }}>
            <ScrollView>
                <Header navigation={navigation} />
                <View className='min-h-screen'>
                    <List.Item
                        title="Nguồn"
                        description="Chọn nguồn từ trang các web khác nhau"
                        left={props => <List.Icon {...props} icon="globe-model" />}
                        onPress={() => { setVisible(true) }}
                    />
                    <List.Item
                        title="Quyền Của Ứng Dụng"
                        description="Quản lý những quyền mà ứng dụng có trên thiết bị này"
                        left={props => <List.Icon {...props} icon="folder" />}
                    />
                    <SrcModal setVisible={setVisible} visible={visible} />
                </View>
                <Footer />
            </ScrollView>
        </View >)

};

export default MenuComponent;