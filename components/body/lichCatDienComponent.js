import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import * as cheerio from 'cheerio';


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

            setSchedule(pList);
        }

        getSchedule()
    }, [])

    return (
        <View>
            {schedule ? schedule.map(e => <Text>{e}</Text>) : <ActivityIndicator animating={true} color={theme.colors.primary} />}
        </View>
    )
}

export default LichCatDienComponent