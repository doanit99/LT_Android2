import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ToastAndroid, TouchableWithoutFeedback, Image } from 'react-native';
import { BASE_URL } from '../api';
import axios from 'axios';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const register = async (userData) => {
        try {
            // Địa chỉ URL của API register
            const data = await axios.post(`${BASE_URL}/Users/PostUser`, userData);

            if (data.status === 201) {
                // Đăng ký thành công, xử lý dữ liệu phản hồi nếu cần
                ToastAndroid.show('Đăng kí thành công', ToastAndroid.SHORT);
                navigation.navigate('Login');
                return true;
            } else {
                // Đăng ký không thành công, xử lý lỗi nếu cần
                ToastAndroid.show('Đăng kí thất bại', ToastAndroid.SHORT);
                throw new Error('Đăng ký không thành công');
            }

        } catch (error) {
            // Hiển thị thông báo khi đăng kí không thành công
            ToastAndroid.show('Đăng kí thất bại', ToastAndroid.SHORT);
            // Trả về false nếu đăng kí không thành công
            return false;
        }
    };

    const handleLogin = () => {
        // Xử lý chuyển hướng đến trang đăng kí
        navigation.navigate('Login');
    };

    const handleGoogleRegister = () => {
        // Xử lý đăng kí bằng Google
    };

    const handleFacebookRegister = () => {
        // Xử lý đăng kí bằng Facebook
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng kí</Text>
            <TextInput
                placeholder="Tên đăng kí"
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!showPassword}
                    style={styles.passwordInput}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                    <Text >{showPassword ? '👁️' : '👁️'}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={register}>
                <Text style={styles.registerButtonText}>Đăng kí</Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
                <View style={styles.line}></View>
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line}></View>
            </View>
            <View style={styles.socialButtonContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={handleGoogleRegister}>
                    <Image source={require('../assets/icons/google.png')} style={styles.socialLogo} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={handleFacebookRegister}>
                    <Image source={require('../assets/icons/facebook.png')} style={styles.socialLogo} />

                </TouchableOpacity>
            </View>
            <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink} onPress={handleLogin}>Login</Text></Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#333',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 16,
    },
    passwordInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 8,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
    },
    registerButton: {
        backgroundColor: '#3498db',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    orText: {
        marginHorizontal: 10,
        color: '#888',
    },

    socialButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    socialButton: {
        alignItems: 'center',
    },


    registerText: {
        marginTop: 10,
        color: '#333',
    },
    registerLink: {
        color: '#3498db',
        textDecorationLine: 'underline',
    },
});

export default Register;
