import AsyncStorage from "@react-native-async-storage/async-storage" ;
import URLHelper from './URLHelper'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo'
export default class Api {
  
// get is a static method that retrieves data from cache or fetch it from a remote server.
// The method takes in a key argument to identify the data being requested.
// The method first checks if the device is connected to the internet.
// If the device is connected, it attempts to retrieve the data from cache.
// If the data is found in the cache and is still fresh, it returns the cached data.
// If the cache is stale or the data is not found in cache, it fetches the data from a remote server,
// stores it in cache along with a timestamp, and returns the response.
static async get(key) {
  const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  return new Promise(async (resolve, reject) => {
    try {
      const isConnected = await NetInfo.fetch().then(state => state.isConnected);
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const cacheData = JSON.parse(data);
        const currentTime = new Date().getTime();
        if (currentTime - cacheData.timestamp < ONE_DAY_IN_MILLISECONDS && isConnected) {
          resolve(cacheData.data);
        } else {
          const response = await axios.get(`${URLHelper.prefix}${key}`);
          const updatedData = {
            data: response.data,
            timestamp: currentTime
          };
          AsyncStorage.setItem(key, JSON.stringify(updatedData));
          resolve(response.data);
        }
      } else {
        const response = await axios.get(`${URLHelper.prefix}${key}`);
        const updatedData = {
          data: response.data,
          timestamp: new Date().getTime()
        };
        AsyncStorage.setItem(key, JSON.stringify(updatedData));
        resolve(response.data);
      }
    } catch (error) {
      reject(error);
    }
  });
}
}
