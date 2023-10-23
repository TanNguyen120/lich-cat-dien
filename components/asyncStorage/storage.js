import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// init
const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 48,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});

//============================================================================================================

async function saveSchedule(scheduleString) {
    try {

        // Save something with key only. (using only a keyname but no id)
        // This key should be unique. This is for data frequently used.
        // The key and value pair is permanently stored unless you remove it yourself.
        await storage.save({
            key: 'schedule', // Note: Do not use underscore("_") in key!
            data: scheduleString,

            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: null
        });
        console.log('saving:' + scheduleString);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


// load
async function loadSchedule() {
    storage
        .load({
            key: 'schedule',

            // autoSync (default: true) means if data is not found or has expired,
            // then invoke the corresponding sync method
            autoSync: true,

            // syncInBackground (default: true) means if data expired,
            // return the outdated data first while invoking the sync method.
            // If syncInBackground is set to false, and there is expired data,
            // it will wait for the new data and return only after the sync completed.
            // (This, of course, is slower)
            syncInBackground: true,

            // you can pass extra params to the sync method
            // see sync example below
            syncParams: {
                extraFetchOptions: {
                    // blahblah
                },
                someFlag: true
            }
        })
        .then(ret => {
            // found data go to then()
            console.log("you have save data: " + ret.data);
            return ret.data;
        })
        .catch(err => {
            // any exception including data not found
            // goes to catch()
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    return null

                case 'ExpiredError':
                    return null
                // TODO
            }
        });
}

// --------------------------------------------------

// Save something with key and id.
// "key-id" data size cannot surpass the size parameter you pass in the constructor.
// By default the 1001st data will overwrite the 1st data item.
// If you then load the 1st data, a catch(NotFoundError) or sync will be invoked.
var userA = {
    name: 'A',
    age: 20,
    tags: ['geek', 'nerd', 'otaku']
};

storage.save({
    key: 'user', // Note: Do not use underscore("_") in key!
    id: '1001', // Note: Do not use underscore("_") in id!
    data: userA,
    expires: 1000 * 60
});


// storage.remove({
//     key: 'lastPage'
// });
// storage.remove({
//     key: 'user',
//     id: '1001'
// });

// clear map and remove all "key-id" data
// !! important: "key-only" data is not cleared, and is left intact
storage.clearMap();


export { saveSchedule, loadSchedule };
export default storage;