import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Dimensions,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';



const LoginScreen = () => {
    const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
    const [showPassword, setShowPasswor] = useState(true);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const onLogin = () => {
        console.log(`login: ${login}, password: ${password}`);
    };

    const hideKeyboard = () => {
        setIsShowKeyBoard(false);
        Keyboard.dismiss();
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
                                ios: { marginTop: isShowKeyBoard ? 310 : 323 },
                                android: {
                                    marginTop: isShowKeyBoard ? 232 : 323,
                                },
                            }),
                        }}
                    >
                        <Text style={styles.title}>Увійти</Text>
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
                                        password !== '' ? '#FFFFFF' : '#F6F6F6',
                                    color:
                                        password !== '' ? '#212121' : '#BDBDBD',
                                }}
                                placeholder="Пароль"
                                autoCapitalize="none"
                                secureTextEntry={showPassword}
                                onFocus={() => setIsShowKeyBoard(true)}
                                onChangeText={setPassword}
                                value={password}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPasswor(!showPassword)}
                            >
                                <Text style={styles.passwordShow}>
                                    {!showPassword ? 'Скрити' : 'Показати'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={onLogin}
                            >
                                <Text style={styles.btnText}>Увійти</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.regInBtn}
                                onPress={() =>
                                    navigation.navigate('Registration')
                                }
                            >
                                <Text style={styles.regInBtn}>
                                    Немає акаунту?{' '}
                                    <Text style={styles.regText}>
                                        Зареєструватися
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default LoginScreen;

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
        marginTop: 32,
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
    regInBtn: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#1B4371',
        marginTop: 16,
        alignItems: 'center',
    },
    regText: {
        textDecorationLine: 'underline',
    },
    logInText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: '19px',
        color: '#1B4371',
    },
    passwordShow: {
        position: 'absolute',
        left: 310,
        top: -36,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: '#1B4371',
    },
});
