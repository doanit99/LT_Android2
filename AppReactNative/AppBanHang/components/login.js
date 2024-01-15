import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ToastAndroid, TouchableWithoutFeedback, Image } from 'react-native';
import { BASE_URL } from '../api';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      // Địa chỉ URL của API login
      const apiUrl = `${BASE_URL}Users/Login/${username}/${password}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Kiểm tra xem cuộc gọi API có thành công không
      if (!response.ok) {
        throw new Error('Đăng nhập không thành công');
      }

      // Hiển thị thông báo khi đăng nhập thành công
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
      setUsername('');
      setPassword('');
      // Trả về true nếu đăng nhập thành công
      navigation.navigate('Home', { username: username });
      return true;
    } catch (error) {
      // Hiển thị thông báo khi đăng nhập không thành công
      ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT);
      // Trả về false nếu đăng nhập không thành công
      return false;
    }
  };

  const handleRegister = () => {
    // Xử lý chuyển hướng đến trang đăng kí
    navigation.navigate('Register'); 
  };

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập bằng Google
  };

  const handleFacebookLogin = () => {
    // Xử lý đăng nhập bằng Facebook
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your App</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Text >{showPassword ? '👁️' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.socialButtonContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Image source={require('../assets/icons/google.png')} style={styles.socialLogo} />
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
          <Image source={require('../assets/icons/facebook.png')} style={styles.socialLogo} />
        
        </TouchableOpacity>
      </View>
      <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink} onPress={handleRegister}>Register</Text></Text>

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
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
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

export default Login;
