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
        // crawl info from cungcau.net
        const getScheduleFromCungCau = async () => {
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

        // crawl info from 
        const getScheduleFromIthongTin = async () => {
            const searchUrl = `https://ithongtin.com/lich-cup-dien/an-giang/cho-moi`;
            const response = await fetch(searchUrl);      // fetch page 
            const responseHtml = await response.text();     // get raw html string
            const $ = cheerio.load(responseHtml);   // use cheerio to load the html for further use
            const rows = [];
            // find all the rows of table
            $('table tr').each(function (i, e) {
                // because the way array push work (it just assign the variable pointer) so we don have to wait for the each loop and every time the row is create it a new address so the loop will 
                const row = [];
                rows.push(row);
                $(this).find("th, td").each(function (i, e) {
                    row.push($(this).text().trim());
                });
            });

            const rowsObj = [];
            // make a nicer object for each row
            rows.forEach(element => {
                const rowData = {
                    date: element[1],
                    timeStart: element[2],
                    timeEnd: element[3],
                    area: element[4],
                    reason: element[5],
                }
                rowsObj.push(rowData)
            });
            rowsObj.shift()
            console.log(rows);
            setSchedule(rowsObj)
        }

        //call back ground 
        getScheduleFromIthongTin()
    }, []);




    return (
        <View className=' pr-5'>
            <Notification />
            {/* {schedule ? schedule.map((e, index) => <ScheduleRow contend={e} key={index} />) : <ActivityIndicator animating={true} color={theme.colors.primary} />} */}
            <Text>
                {JSON.stringify(schedule)}
            </Text>
        </View>
    )
}

export default LichCatDienComponent