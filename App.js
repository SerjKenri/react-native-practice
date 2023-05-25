import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
// import { RegistrationScreen } from './Screens/auth/RegistrationScreen';
import { LoginScreen } from './Screens/auth/LoginScreen';

export default function App() {
    return (
        <View style={styles.container}>
            <LoginScreen />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
