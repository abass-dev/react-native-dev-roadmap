import { StyleSheet } from 'react-native';
import Api from '../components/Api'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {useState, useEffect} from 'react'
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  
  useEffect(() => {
   const members = async () => {
      await Api.get('investors').then((v) => {
        alert(v)
      }).catch((e) => {
        alert(e)
      }) 
   } 
setTimeout(() => {
     members() 
}, 3000)
  }, [])
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
