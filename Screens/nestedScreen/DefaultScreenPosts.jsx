import React, { useEffect, useState } from 'react';

import {
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DefaultScreenPosts = ({ route }) => {
    const [posts, setPosts] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        if (route.params) {
            setPosts(prevState => [...prevState, route.params]);
        }
    }, [route.params]);

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    ...styles.container,
                    width: Dimensions.get('window').width - 16,
                }}
            >
                <View
                    style={{
                        width: Dimensions.get('window').width - 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 32,
                        marginBottom: 32,
                    }}
                >
                    <View
                        style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            marginRight: 8,
                        }}
                    >
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                resizeMode: 'cover',
                            }}
                            source={require('../../assets/images/noAvatar.png')}
                        />
                    </View>
                    <View>
                        <Text style={styles.title}>Test</Text>
                        <Text style={{ ...styles.text, fontSize: 11 }}>
                            User
                        </Text>
                    </View>
                </View>
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                width: Dimensions.get('window').width - 16,
                                marginBottom: 34,
                            }}
                        >
                            <Image
                                style={{
                                    width: Dimensions.get('window').width - 16,
                                    height: 240,
                                    marginBottom: 8,
                                    borderRadius: 8,
                                }}
                                source={{ uri: item.photo }}
                            />
                            <Text
                                style={{
                                    ...styles.title,
                                    marginBottom: 11,
                                }}
                            >
                                {item.name}
                            </Text>
                            <View
                                style={{
                                    width: Dimensions.get('window').width - 16,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('Comments', {
                                            ...item,
                                        })
                                    }
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 18,
                                            height: 18,
                                            marginRight: 9,
                                            resizeMode: 'contain',
                                        }}
                                        source={require('../../assets/images/icons/message-circle.png')}
                                    />
                                    <Text
                                        style={{
                                            ...styles.text,
                                            color: '#BDBDBD',
                                        }}
                                    >
                                        0
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}
                                    onPress={() =>
                                        navigation.navigate('Map', {
                                            ...item,
                                        })
                                    }
                                >
                                    <Image
                                        style={{
                                            width: 18,
                                            height: 18,
                                            marginRight: 9,
                                            resizeMode: 'contain',
                                        }}
                                        source={require('../../assets/images/icons/map-pin.png')}
                                    />
                                    <Text
                                        style={{
                                            ...styles.text,
                                            color: '#212121',
                                            textDecorationLine: 'underline',
                                        }}
                                    >
                                        {item.regionName}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default DefaultScreenPosts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 13,
        fontWeight: '700',
    },
    text: {
        fontSize: 16,
        lineHeight: 18.75,
        fontWeight: '400',
        color: '#212121CC',
    },
});
