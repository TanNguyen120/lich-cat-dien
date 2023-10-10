
import * as cheerio from 'cheerio';

// crawl info from ithongTin
const getScheduleFromIthongTin = async () => {
    try {

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
        return rowsObj;
    } catch (error) {
        console.log(JSON.stringify(error))
    }

}

//==================================================================================================================================

// crawl info from cungcau.net
const getScheduleFromCungCau = async () => {
    try {
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
        return pList;
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export { getScheduleFromIthongTin, getScheduleFromCungCau }