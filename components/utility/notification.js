
import React, { useEffect, useState, useRef } from 'react'
import * as Notifications from "expo-notifications";
import * as cheerio from 'cheerio';
import * as Device from 'expo-device'
import { getScheduleFromIthongTin } from './webCrawling';


// define the notification style
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


const Notification = () => {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        // get the push notification token from expo
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log("notification res:" + JSON.stringify(response));
            });

        schedulePushNotification();
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        null
    );
}

export async function schedulePushNotification() {
    const scheduleObjs = await getScheduleFromIthongTin();

    // the default message is not thing in the schedule and the latest date the the schedule object have 
    let bodyNotif = `ヅ Không có kế hoạch cắt điện cho xã kiến An ヅ (Lịch đến ngày ${scheduleObjs[scheduleObjs.length - 1].date})`;
    for await (const scheduleObj of scheduleObjs) {
        if (scheduleObj.detailArea.includes('Kiến An')) {
            bodyNotif = `ϟϟ Kiến An BỊ CẮT ĐIỆN Vào Ngày ${scheduleObj.date} Từ ${scheduleObj.timeStart} Đến ${scheduleObj.timeEnd} (>_<) ! -- ✩ (Lịch đến ngày ${scheduleObjs[scheduleObjs.length - 1].date})`
        }
    }
    // htmlText.includes('Kiến An') ? bodyNotif = ' ϟϟ Kiến An BỊ CẮT ĐIỆN !!!!! ' : bodyNotif = 'ヅ Không có kế hoạch cắt điện cho xã kiến An ヅ'
    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Lịch Cắt Điện An Giang',
            body: bodyNotif,
            sound: 'default',
        },
        trigger: {
            seconds: 60 * 60 * 12,
            repeats: true
        },
    });
    console.log("notification id on scheduling", id)
    return id;
}


// the function to ask user allow notification 
async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

export default Notification