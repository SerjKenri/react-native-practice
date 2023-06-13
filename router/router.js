import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RegistrationScreen from '../Screens/auth/RegistrationScreen';
import LoginScreen from '../Screens/auth/LoginScreen';
import CreatePostsScreen from '../Screens/main/CreatePostsScreen';
import ProfileScreen from '../Screens/main/ProfileScreen';
import PostScreen from '../Screens/main/PostScreen';

// icons
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const MainTab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

export const useRoute = (isAuth = false) => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator initialRouteName="Login">
                <AuthStack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <AuthStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            </AuthStack.Navigator>
        );
    }

    return (
        <MainTab.Navigator
            shifting={true}
            tabBarOptions={{
                style: {
                    padding: 8,
                },
            }}
            initialRouteName="PostScreen"
        >
            <MainTab.Screen
                name="PostScreen"
                component={PostScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                ...styles.iconWrapper,
                                backgroundColor: focused
                                    ? '#FF6C00'
                                    : '#FFFFFF',
                                top: 4,
                                left: 70,
                            }}
                        >
                            <Ionicons
                                name="grid-outline"
                                size={24}
                                color={focused ? '#FFFFFF' : '#212121'}
                            />
                        </View>
                    ),
                    tabBarShowLabel: false,
                    title: 'Публікації',
                    tabBarStyle: {
                        display: 'flex',
                    },
                    headerShown: false,
                }}
            />
            <MainTab.Screen
                name="CreatePostsScreen"
                component={CreatePostsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                ...styles.iconWrapper,
                                backgroundColor: focused
                                    ? '#FF6C00'
                                    : '#FFFFFF',
                                top: 4,
                            }}
                        >
                            <Ionicons
                                name="add"
                                size={24}
                                color={focused ? '#FFFFFF' : '#212121'}
                            />
                        </View>
                    ),
                    tabBarShowLabel: false,
                    title: 'Створити публікацію',
                    style: {
                        height: 0,
                        opacity: 0,
                    },
                    tabBarStyle: {
                        display: 'none',
                    },
                }}
            />
            <MainTab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                ...styles.iconWrapper,
                                backgroundColor: focused
                                    ? '#FF6C00'
                                    : '#FFFFFF',
                                top: 4,
                                right: focused ? 180 : 0,
                                right: 70,
                            }}
                        >
                            <Feather
                                name="user"
                                size={24}
                                color={focused ? '#FFFFFF' : '#212121'}
                            />
                        </View>
                    ),
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        display: 'flex',
                    },
                }}
            />
        </MainTab.Navigator>
    );
};

const styles = StyleSheet.create({
    iconWrapper: {
        width: 70,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 9,
        position: 'absolute',
    },
});
