import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, View } from 'react-native'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Notifications from 'expo-notifications'
import {useState, useEffect} from 'react'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: true
}),})

export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification)
      const userName = notification.request.content.data.username
      console.log(userName)
    })
    return () => {
      subscription.remove()
    }
  }, [])
async function scheduleNotificationHandler() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'My notification',
      body: 'The body of my notificatio',
      data: {username: 'Max'}
    },
      trigger: {seconds: 5}
  })
}
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
      <Button onPress={async () => {scheduleNotificationHandler()}} title='Schedule notification'/>
      </View>
    );
  }

