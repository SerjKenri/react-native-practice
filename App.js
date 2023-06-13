import { useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRoute } from './router/router';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    });

    const routing = useRoute({});

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null;
    }

    return <NavigationContainer>{routing}</NavigationContainer>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
