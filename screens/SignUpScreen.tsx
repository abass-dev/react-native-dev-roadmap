import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper'
import AuthButton from '../components/ui/AuthButton'

export default function SignUpScreen({ navigation }) {  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
    <Text style={styles.title}>SIGN UP</Text>
        <TextInput
        mode="outlined"
        placeholder='E.g: john@gmail.com'
        label='Email:'
        right={<TextInput.Icon icon="account" />}
        style={styles.input}/>
        <TextInput
        mode="outlined"
        placeholder='E.g: john@gmail.com'
        label='Confirm Email:'
        right={<TextInput.Icon icon="account" />}
        style={styles.input}/>
        <TextInput
        mode="outlined"
        label='Password:'
        right={<TextInput.Icon icon="lock" />}
        secureTextEntry
        style={styles.input}/>
        <TextInput
        mode="outlined"
        label='Confirm Password:'
        right={<TextInput.Icon icon="lock" />}
        secureTextEntry
        style={styles.input}/>
        <AuthButton />
        <Text onPress={() => navigation.replace('Login')} style={styles.switchScreenButton}>Or Login</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(182,182,182,0.906)'
  },
   formContainer: {
     justifyContent: 'center',
     alignItems: 'center',
     paddingVertical: 60,
     paddingHorizontal: 20,
     borderRadius: 10,
     elevation:1,
     backgroundColor: '#ffffff'
  },
  input: {
    width: 300,
    marginBottom: 15 
  },
  title: {
    color: '#5c5c5c',
    marginBottom: 15 
  },
  switchScreenButton: {
    color: 'blue',
    marginTop: 20 
  }
})


