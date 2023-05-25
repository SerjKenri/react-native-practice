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
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';

const loadApplication = async () => {
    await Font.loadAsync({
        'Roboto-Regular': require('../../assets/fonts/Roboto/Roboto-Regular.ttf'),
    });
};

const RegistrationScreen = () => {
    const [isReady, setIsReady] = useState(false);
    const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);

    const hideKeyboard = () => {
        setIsShowKeyBoard(false);
        Keyboard.dismiss();
    };

    if (!isReady) {
        return (
            <AppLoading
                startAsync={loadApplication}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    }

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
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 13,
                                }}
                            />
                            <TouchableOpacity>
                                <Image
                                    style={{ top: -40, left: 106, zIndex: 14 }}
                                    source={require('../../assets/images/plusIcon.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Реєстрація</Text>
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Логін"
                                onFocus={() => setIsShowKeyBoard(true)}
                            />
                            <TextInput
                                style={{ ...styles.input, marginTop: 16 }}
                                placeholder="Адреса електронної пошти"
                                onFocus={() => setIsShowKeyBoard(true)}
                            />
                            <TextInput
                                style={{ ...styles.input, marginTop: 16 }}
                                placeholder="Пароль"
                                secureTextEntry={true}
                                onFocus={() => setIsShowKeyBoard(true)}
                            />
                            <TouchableOpacity>
                                <Text style={styles.passwordShow}>
                                    Показати
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.btnText}>
                                    Зарегестрироваться
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logInBtn}>
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

export { RegistrationScreen };

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
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderStyle: 'solid',
        borderRadius: 8,
        width: '100%',
        fontFamily: 'Roboto-Regular',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 19,
        color: '#BDBDBD',
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
