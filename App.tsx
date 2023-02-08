import {
  StatusBar
} from 'expo-status-bar';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import {
  Button,
  View,
  Alert,
  Platform
} from 'react-native'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Notifications from 'expo-notifications'
import {
  useState,
  useEffect
} from 'react'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: true
  }),
})

export default function App() {
  const [token,
    setToken] = useState()
  useEffect(() => {
    async function configurePushNotification() {
      const {
        status
      } = await Notifications.getPermissionsAsync()
      const finalStatus = status

      if (finalStatus !== 'granted') {
        const {
          status
        } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Permission required:', 'Push notifications need the appropriate permissions')
        return;
      }
      const pushTokenData = await Notifications.getExpoPushTokenAsync()
      setToken(pushTokenData)

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.FEFAULT
        })
      }
    }
    configurePushNotification()
  },
    [])
  useEffect(() => {

    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      //console.log(notification)
      const userName = notification.request.content.data.username
      //console.log(userName)
    })
    return () => {
      subscription.remove()
    }
  },
    [])
  async function scheduleNotificationHandler() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'My notification',
        body: 'The body of my notificatio',
        data: {
          username: 'Max'
        }
      },
      trigger: {
        seconds: 5
      }
    })
  }
  function sendPushNotificationHandler() {
    fetch('https://exp.host/--/api/v2/push/send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: token.data,
          title: 'Push notifications title',
          body: 'Push notifications body'
        })
      })
  }
  return (
    <View style={ { flex: 1,
      justifyContent: 'center' }}>
      <Button onPress={async () => { scheduleNotificationHandler()}} title='Schedule notification' />
      <Button onPress={() => { sendPushNotificationHandler()}} title='Push notification' />
      </View>
  );
}