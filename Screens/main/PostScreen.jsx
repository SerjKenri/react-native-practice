import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DefaultScreenPosts from '../nestedScreen/DefaultScreenPosts';
import CommentsScreen from '../nestedScreen/CommentsScreen';
import MapScreen from '../nestedScreen/MapScreen';

import { useNavigation } from '@react-navigation/native';

const NestedScreen = createStackNavigator();

const PostScreen = () => {
    const navigate = useNavigation();

    return (
        <NestedScreen.Navigator>
            <NestedScreen.Screen
                name="DefaultScreen"
                component={DefaultScreenPosts}
                options={{
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {}}
                            style={{ paddingRight: 16 }}
                        >
                            <Ionicons
                                name="ios-exit-outline"
                                size={38}
                                color="#BDBDBD"
                            />
                        </TouchableOpacity>
                    ),
                    title: 'Публікації',
                }}
            />
            <NestedScreen.Screen
                name="Comments"
                component={CommentsScreen}
                options={{
                    title: 'Коментарі',
                }}
            />
            <NestedScreen.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: 'Карта',
                }}
            />
        </NestedScreen.Navigator>
    );
};

export default PostScreen;
