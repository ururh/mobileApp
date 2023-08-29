import { useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	Platform,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import bgImg from '../assets/background.jpg'

export default function LoginScreen() {
	const [activeInputName, setActiveInputName] = useState(null);
	const [showPwd, setShowPwd] = useState(true);

	const handleInputFocus = name => {
		setActiveInputName(name);
	};

	const handleShowPwd = () => {
		setShowPwd(!showPwd);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ImageBackground source={bgImg} style={styles.backgroundImage}>
			<KeyboardAvoidingView
				keyboardVerticalOffset={-155}
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			>
				<View style={styles.bgElements}>
					<Text style={styles.title}>Увійти</Text>

					<View style={styles.formWrapper}>
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
						/>
						<TextInput
							style={[
								styles.input,
								styles.pwd,
								{
									borderColor: `${
										activeInputName === 'pwd' ? '#ff6c00' : '#e8e8e8'
									}`,
								},
							]}
							placeholder="Password"
							placeholderTextColor="#bdbdbd"
							onFocus={() => handleInputFocus('pwd')}
							onBlur={() => handleInputFocus(null)}
							secureTextEntry={showPwd}
						/>
						<TouchableOpacity onPress={handleShowPwd} style={styles.pwdShow}>
							<Text style={styles.linkText}>{showPwd ? 'Показати' : 'Скрити'}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.btn}>
							<Text style={styles.btnText}>Увійти</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.linkLogin}>
							<Text style={styles.linkText}>
								Немає акаунту? Зареєструватися
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
	bgElements: {
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 32,
		paddingBottom: 16,

		backgroundColor: '#ffffff',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},

	backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },

	title: {
		marginBottom: 33,

		color: '#212121',
		fontFamily: 'Roboto-Medium',
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
		fontFamily: 'Roboto-Regular',
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
		fontFamily: 'Roboto-Regular',
		fontSize: 16,
	},

	btn: {
		width: '100%',
		height: 50,
		marginBottom: 16,
		paddingVertical: 16,
		paddingHorizontal: 32,

		backgroundColor: '#ff6c00',
		borderRadius: 100,
	},

	btnText: {
		color: '#ffffff',
		fontFamily: 'Roboto-Regular',
		fontSize: 16,
		textAlign: 'center',
	},
});