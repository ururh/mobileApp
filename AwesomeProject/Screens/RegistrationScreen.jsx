import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Yup from 'yup';

import bgImg from '../assets/background.jpg';

const validationSchema = Yup.object().shape({
  login: Yup.string().required('Поле "Login" є обов\'язковим'),
  email: Yup.string()
    .email('Введіть правильний електронний адрес')
    .required('Поле "Email" є обов\'язковим'),
  password: Yup.string()
    .min(8, 'Пароль повинен бути не менше 8 символів')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])/,
      'Пароль повинен містити хоча б одну цифру та одну заглавну літеру'
    )
    .required('Поле "Password" є обов\'язковим'),
});

export default function RegistrationScreen() {
  const [activeInputName, setActiveInputName] = useState(null);
  const [showPwd, setShowPwd] = useState(true);
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputFocus = (name) => {
    setActiveInputName(name);
  };

  const handleShowPwd = () => {
    setShowPwd(!showPwd);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log(formData);
      setErrors({});
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={bgImg} style={styles.backgroundImage}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-150}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.bgElements}>
            <View style={styles.avatarHolder}>
              <TouchableOpacity style={styles.addAvatarBg}>
                <AntDesign name="pluscircleo" size={24} color="#ff6c00" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Реєстрація</Text>

					  <View style={styles.formWrapper}>
						      {errors.login && <Text style={styles.errorText}>{errors.login}</Text>}
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: `${
                      activeInputName === 'login' ? '#ff6c00' : '#e8e8e8'
                    }`,
                  },
                ]}
                placeholder="Login"
                placeholderTextColor="#bdbdbd"
                onFocus={() => handleInputFocus('login')}
                onBlur={() => handleInputFocus(null)}
                value={formData.login}
                onChangeText={(text) => handleInputChange('login', text)}
              />
          
{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: `${
                      activeInputName === 'email' ? '#ff6c00' : '#e8e8e8'
                    }`,
                  },
                ]}
                placeholder="Email Address"
                placeholderTextColor="#bdbdbd"
                onFocus={() => handleInputFocus('email')}
                onBlur={() => handleInputFocus(null)}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
              />
              
{errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              <TextInput
                style={[
                  styles.input,
                  styles.pwd,
                  {
                    borderColor: `${
                      activeInputName === 'password' ? '#ff6c00' : '#e8e8e8'
                    }`,
                  },
                ]}
                placeholder="Password"
                placeholderTextColor="#bdbdbd"
                onFocus={() => handleInputFocus('password')}
                onBlur={() => handleInputFocus(null)}
                secureTextEntry={showPwd}
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
              />

              <TouchableOpacity onPress={handleShowPwd} style={styles.pwdShow}>
                <Text style={styles.linkText}>
                  {showPwd ? 'Показати' : 'Скрити'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRegistration} style={styles.btn}>
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.linkText}>
                  Вже є акаунт? Увійти
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  bgElements: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarHolder: {
    position: 'relative',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: '#f6f6f6',
    borderRadius: 16,
  },
  addAvatarBg: {
    position: 'absolute',
    bottom: 12,
    right: -12,
    width: 24,
    height: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  title: {
    top: -28,
    marginBottom: 5,
    color: '#212121',
    fontFamily: 'Roboto',
    fontSize: 30,
    letterSpacing: 0.3,
  },
  formWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f6f6f6',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 8,
    color: '#212121',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  pwd: {
    marginBottom: 43,
  },
  pwdShow: {
    position: 'absolute',
    bottom: 142,
    right: 32,
  },
  linkText: {
    color: '#1b4371',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  btn: {
    width: '100%',
    height: 50,
    marginBottom: 16,
    paddingVertical: 16,
    backgroundColor: '#ff6c00',
    borderRadius: 100,
  },
  btnText: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});
