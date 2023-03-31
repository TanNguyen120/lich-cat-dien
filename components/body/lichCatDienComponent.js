import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import * as cheerio from 'cheerio';
import ScheduleRow from './scheduleRow';
import Notification from '../utility/notification';



const LichCatDienComponent = () => {
    const [schedule, setSchedule] = useState(null);
    const theme = useTheme()
    useEffect(() => {
        const getSchedule = async () => {
            const searchUrl = `https://cungcau.net/index.php/20-bai-viet-cua-admin/3-thong-bao-k-hoch-ct-din-an-giang`;
            const response = await fetch(searchUrl);      // fetch page 
            const responseHtml = await response.text();     // get raw html string
            const $ = cheerio.load(responseHtml);   // use cheerio to load the html for further use
            const pList = [];

            // push all the p element in class entry-content to list
            await $('.entry-content > p').each((_, e) => {
                pList.push($(e).text());    // find the correct p in the HTML object and push to list
            })

            // filter out first fours p element
            pList.shift();
            pList.shift();
            pList.shift();
            pList.shift();
            setSchedule(pList)
        }
        //call back ground 
        getSchedule()
    }, []);




    return (
        <View className=' pr-5'>
            <Notification />
            {schedule ? schedule.map((e, index) => <ScheduleRow contend={e} key={index} />) : <ActivityIndicator animating={true} color={theme.colors.primary} />}
        </View>
    )
}

export default LichCatDienComponent