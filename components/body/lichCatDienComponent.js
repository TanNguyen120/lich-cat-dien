import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import * as cheerio from 'cheerio';
import ScheduleRow from './scheduleRow';
import Notification from '../utility/notification';
import IthongTinSchedule from './ithongTinSchedule';
import CungCauSchedule from './cungCauSchedule';


// this will condition render base on src
const ConditionSchedule = ({ currentSrc, schedule }) => {
    const theme = useTheme()
    switch (currentSrc) {
        case 'iThongTin':
            return <IthongTinSchedule schedule={schedule} />
        case 'CungCau':
            return <CungCauSchedule schedule={schedule} />
        default:
            return <ActivityIndicator animating={true} color={theme.colors.primary} />
    }
}


const LichCatDienComponent = ({ currentSrc, refreshing }) => {

    const [schedule, setSchedule] = useState(null);
    const theme = useTheme()
    // chooseSrc Effect

    // craw info effect
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
                    detailArea: element[5],
                    reason: element[6]
                }
                rowsObj.push(rowData)
            });
            rowsObj.shift();

            setSchedule(rowsObj)
        }
        //get thing base on src 
        console.log('api call of:' + currentSrc)

        setSchedule(null);
        if (currentSrc !== null) {
            switch (currentSrc) {
                case 'CungCau':
                    getScheduleFromCungCau();
                    break;
                case 'iThongTin':
                    getScheduleFromIthongTin();
                    break
                default:
                    break;
            }
        }
    }, [currentSrc, refreshing]);




    return (
        <View className=' pr-5 pb-5'>
            <Notification />
            {schedule ? <ConditionSchedule currentSrc={currentSrc} schedule={schedule} /> : <ActivityIndicator animating={true} color={theme.colors.primary} />}
        </View>
    )
}

export default LichCatDienComponent