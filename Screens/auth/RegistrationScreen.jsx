import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Dimensions,
} from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
    const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigation = useNavigation();

    const onRegister = () => {
        console.log(`login: ${login}, password: ${password}, email: ${email}`);
    };

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
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ImageBackground
                    source={require('../../assets/images/photoBg.jpg')}
                    style={styles.image}
                >
                    <View
                        style={{
                            ...styles.container,
                            ...Platform.select({
                                ios: { marginTop: isShowKeyBoard ? 178 : 263 },
                                android: {
                                    marginTop: isShowKeyBoard ? 125 : 220,
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
                        <Text style={styles.title}>Реєстрація</Text>
                        <View style={styles.form}>
                            <TextInput
                                style={{
                                    ...styles.input,
                                    backgroundColor:
                                        login !== '' ? '#FFFFFF' : '#F6F6F6',
                                    color: login !== '' ? '#212121' : '#BDBDBD',
                                }}
                                placeholder="Логін"
                                autoCapitalize="none"
                                onFocus={() => setIsShowKeyBoard(true)}
                                onChangeText={setLogin}
                                value={login}
                            />
                            <TextInput
                                style={{
                                    ...styles.input,
                                    marginTop: 16,
                                    backgroundColor:
                                        email !== '' ? '#FFFFFF' : '#F6F6F6',
                                    color: email !== '' ? '#212121' : '#BDBDBD',
                                }}
                                placeholder="Адреса електронної пошти"
                                autoCapitalize="none"
                                onFocus={() => setIsShowKeyBoard(true)}
                                onChangeText={setEmail}
                                value={email}
                            />
                            <TextInput
                                style={{
                                    ...styles.input,
                                    marginTop: 16,
                                    backgroundColor:
                                        password !== '' ? '#FFFFFF' : '#F6F6F6',
                                    color:
                                        password !== '' ? '#212121' : '#BDBDBD',
                                }}
                                placeholder="Пароль"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                inputMode="email"
                                onFocus={() => setIsShowKeyBoard(true)}
                                onChangeText={setPassword}
                                value={password}
                            />
                            <TouchableOpacity>
                                <Text style={styles.passwordShow}>
                                    Показати
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={onRegister}
                            >
                                <Text style={styles.btnText}>
                                    Зарегестрироваться
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.logInBtn}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styles.logInBtnText}>
                                    Уже есть аккаунт? Войти
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default RegistrationScreen;

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
    title: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: 'center',
        letterSpacing: 0.16,
        marginBottom: 33,
        marginTop: 92,
        color: '#212121',
    },
    form: {
        alignItems: 'stretch',
    },
    input: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderStyle: 'solid',
        borderRadius: 8,
        width: '100%',
        fontFamily: 'Roboto-Regular',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 19,
    },
    btn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        marginTop: 43,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
    },
    btnText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        color: '#FFF',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    logInBtn: {
        marginTop: 16,
        alignItems: 'center',
    },
    logInBtnText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#1B4371',
    },
    logInText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: '19px',
        color: '#1B4371',
    },
    passwordShow: {
        position: 'absolute',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#1B4371',
        ...Platform.select({
            ios: {
                left: 310,
                top: -36,
            },
            android: {
                left: 270,
                top: -40,
            },
        }),
    },
});
