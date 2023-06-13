import { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const initialState = {
    name: '',
    regionName: '',
    photo: null,
};

const CreatePostsScreen = () => {
    const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
    const [createPostForm, setCreatePostForm] = useState(initialState);
    const [picture, setPicture] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [location, setLocation] = useState(null);

    const navigation = useNavigation();

    const inputCheck = !!(
        createPostForm.name &&
        createPostForm.regionName &&
        createPostForm.photo
    );

    const takePhoto = async () => {
        const options = { quality: 0.8, base64: true };
        const photo = await picture.takePictureAsync(options);
        await MediaLibrary.createAssetAsync(photo.uri);

        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();

        setLocation({ photoLocation: { latitude, longitude } });

        const [{ city, country }] = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        });

        setCreatePostForm(prevState => ({
            ...prevState,
            photo: photo.uri,
            regionName: `${city}, ${country}`,
        }));
    };

    const hideKeyboard = () => {
        setIsShowKeyBoard(false);
        Keyboard.dismiss();
    };

    const submitForm = async () => {
        hideKeyboard();

        if (!location) {
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();

            setLocation({ photoLocation: { latitude, longitude } });
        }

        navigation.navigate('DefaultScreen', {
            id: Math.random().toString().slice(2),
            ...location,
            ...createPostForm,
        });

        setCreatePostForm(initialState);
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const pickImage = async () => {
        if (createPostForm.photo) {
            setCreatePostForm(prevState => ({
                ...prevState,
                photo: '',
                regionName: '',
            }));
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setCreatePostForm(prevState => ({
                ...prevState,
                photo: result.assets[0].uri,
            }));
        }
    };

    const deletePost = () => {
        setCreatePostForm(initialState);
        navigation.navigate('PostScreen');
    };

    return (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={{ ...styles.container }}>
                    <View style={{ marginTop: 32, borderRadius: 8 }}>
                        {createPostForm.photo ? (
                            <View style={styles.photoPreviewWrapper}>
                                <Image
                                    source={{ uri: createPostForm.photo }}
                                    style={{
                                        height: 238,
                                        width:
                                            Dimensions.get('window').width - 16,
                                        borderRadius: 8,
                                    }}
                                ></Image>
                            </View>
                        ) : (
                            <Camera
                                style={{ ...styles.camera }}
                                ref={setPicture}
                            >
                                <TouchableOpacity onPress={takePhoto}>
                                    <Image
                                        source={require('../../assets/images/createPostIcons/withoutPhotoCam.png')}
                                        style={styles.cameraIcon}
                                    ></Image>
                                </TouchableOpacity>
                            </Camera>
                        )}
                    </View>
                    {createPostForm.photo ? (
                        <TouchableOpacity
                            style={styles.loadButton}
                            onPress={pickImage}
                        >
                            <Text style={styles.loadButtonText}>
                                Редагувати фото
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.loadButton}
                            onPress={pickImage}
                        >
                            <Text style={styles.loadButtonText}>
                                Завантажити фото
                            </Text>
                        </TouchableOpacity>
                    )}
                    <View>
                        <TextInput
                            placeholder="Назва..."
                            autoCapitalize="none"
                            style={{
                                ...styles.form,
                                marginTop: 48,
                                fontFamily: createPostForm.name
                                    ? 'Roboto-Bold'
                                    : 'Roboto-Regular',
                            }}
                            onChangeText={value =>
                                setCreatePostForm(prevState => ({
                                    ...prevState,
                                    name: value,
                                }))
                            }
                            value={createPostForm.name}
                        />
                        <TextInput
                            placeholder="Місцевість..."
                            autoCapitalize="none"
                            style={{
                                ...styles.form,
                                marginTop: 32,
                                paddingLeft: 28,
                                fontFamily: 'Roboto-Regular',
                            }}
                            onChangeText={value =>
                                setCreatePostForm(prevState => ({
                                    ...prevState,
                                    regionName: value,
                                }))
                            }
                            value={createPostForm.regionName}
                        />
                        <Image
                            style={styles.mapIcon}
                            source={require('../../assets/images/mapPin.png')}
                        />
                    </View>
                    {!inputCheck ? (
                        <View
                            style={{
                                ...styles.publicButton,
                                backgroundColor: '#F6F6F6',
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.publicButtonText,
                                    color: '#BDBDBD',
                                }}
                            >
                                Опубліковати
                            </Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.publicButton}
                            onPress={submitForm}
                        >
                            <Text style={styles.publicButtonText}>
                                Опубліковати
                            </Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={deletePost}>
                        <Image
                            source={require('../../assets/images/trash.png')}
                            style={styles.trashIcon}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    camera: {
        height: 240,
        width: Dimensions.get('window').width - 16,
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        width: 60,
        height: 60,
    },
    photoPreviewWrapper: {
        height: 240,
        width: Dimensions.get('window').width - 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#E8E8E8',
    },
    loadButton: {
        alignSelf: 'flex-start',
    },
    loadButtonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#BDBDBD',
        marginTop: 8,
    },
    form: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',
        width: Dimensions.get('window').width - 16,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingBottom: 15,
    },
    mapIcon: {
        position: 'absolute',
        width: 24,
        height: 24,
        top: 113,
        left: 2,
    },
    publicButton: {
        width: Dimensions.get('window').width - 16,
        paddingRight: 32,
        paddingLeft: 32,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    publicButtonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#FFFFFF',
    },
    trashIcon: {
        width: 70,
        height: 40,
        marginTop: 120,
    },
});
