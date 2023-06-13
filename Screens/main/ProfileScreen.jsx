import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    Text,
    Keyboard,
    Platform,
    Dimensions,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
    const [avatar, setAvatar] = useState(null);

    const hideKeyboard = () => {
        setIsShowKeyBoard(false);
        Keyboard.dismiss();
    };

    const pickImage = async () => {
        if (avatar) {
            setAvatar(null);
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/photoBg.jpg')}
            style={styles.image}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        ...styles.container,
                        ...Platform.select({
                            ios: { marginTop: 97 },
                            android: {
                                marginTop: 77,
                            },
                        }),
                    }}
                >
                    <View style={styles.imageWrapper}>
                        {avatar ? (
                            <Image
                                source={{ uri: avatar }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 16,
                                    zIndex: 13,
                                }}
                            />
                        ) : (
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 16,
                                    zIndex: 13,
                                }}
                                source={require('../../assets/images/noAvatar.png')}
                            />
                        )}

                        <TouchableOpacity
                            onPress={pickImage}
                            style={{ zIndex: 16 }}
                        >
                            {avatar ? (
                                <Image
                                    style={{
                                        top: -45,
                                        left: 101,
                                        width: 40,
                                        height: 40,
                                    }}
                                    source={require('../../assets/images/crossIcon.png')}
                                />
                            ) : (
                                <Image
                                    style={{ top: -40, left: 106 }}
                                    source={require('../../assets/images/plusIcon.png')}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.titleText}>Natali Romanova</Text>
                </View>
                {/* <FlatList
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
                /> */}
            </SafeAreaView>
        </ImageBackground>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        padding: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#fff',
        zIndex: 1,
    },
    imageWrapper: {
        position: 'absolute',
        width: 120,
        height: 120,
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
        zIndex: 10,
        ...Platform.select({
            ios: {
                left: 150,
                top: -50,
            },
            android: {
                left: 132,
                top: -50,
            },
        }),
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    titleText: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        marginTop: 92,
    },
});
