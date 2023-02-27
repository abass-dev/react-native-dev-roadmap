import { Button } from 'react-native-paper'
import { View, Text, StyleSheet} from 'react-native'
export default function AuthButton ({isLogin}) {
  return (
     <Button
     mode='elevated' 
     style={styles.button}
     >
     {isLogin? 'Login' : 'Sign up'}
     </Button>
    )
}

const styles = StyleSheet.create({
  button: {
   width: 300
  }
})
