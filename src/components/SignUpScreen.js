import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

export default function SignUpScreen({ onSignUp, onGoLogin }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [accepted, setAccepted] = useState(false);

	return (
		<SafeAreaView style={styles.safe}>
			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				<ScrollView
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.titleWrap}>
						<Text style={styles.title}>Create Your Account</Text>
						<Text style={styles.subtitle}>Which part of country that you call home?</Text>
					</View>

					<View style={styles.form}>
						<View style={styles.inputWrap}>
							<TextInput
								style={styles.input}
								placeholder="Username"
								placeholderTextColor="#ABABAB"
								autoCapitalize="none"
								value={username}
								onChangeText={setUsername}
							/>
						</View>

						<View style={styles.inputWrap}>
							<TextInput
								style={styles.input}
								placeholder="Email"
								placeholderTextColor="#ABABAB"
								keyboardType="email-address"
								autoCapitalize="none"
								value={email}
								onChangeText={setEmail}
							/>
						</View>

						<View style={styles.inputWrap}>
							<TextInput
								style={[styles.input, styles.inputPasswordField]}
								placeholder="Password"
								placeholderTextColor="#ABABAB"
								secureTextEntry={!showPassword}
								value={password}
								onChangeText={setPassword}
							/>
							<Pressable
								style={styles.eyeBtn}
								onPress={() => setShowPassword(!showPassword)}
							>
								<Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
							</Pressable>
						</View>

						<Pressable
							style={styles.termsRow}
							onPress={() => setAccepted(!accepted)}
						>
							<View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
								{accepted && <Text style={styles.checkmark}>✓</Text>}
							</View>
							<Text style={styles.termsText}>
								I accepted <Text style={styles.termsLink}>Terms & Privacy Policy</Text>
							</Text>
						</Pressable>
					</View>

					<View style={styles.dividerRow}>
						<View style={styles.dividerLine} />
						<Text style={styles.dividerText}>Or sign in with</Text>
						<View style={styles.dividerLine} />
					</View>

					<View style={styles.socialList}>
						<SocialButton icon="f" label="Continue with facebook" color="#1877F2" />
						<SocialButton icon="G" label="Continue with Google" color="#EA4335" />
						<SocialButton icon="🍎" label="Continue with Apple" color="#0A0A0A" isApple />
					</View>

					<Pressable
						style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed]}
						onPress={onSignUp}
					>
						<Text style={styles.primaryBtnLabel}>Sign Up</Text>
					</Pressable>

					<View style={styles.bottomRow}>
						<Text style={styles.bottomText}>Already have an account? </Text>
						<Pressable onPress={onGoLogin}>
							<Text style={styles.bottomLink}>Sign In</Text>
						</Pressable>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

function SocialButton({ icon, label, color, isApple }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.socialBtn, pressed && styles.socialBtnPressed]}
		>
			{isApple ? (
				<Text style={styles.appleIcon}>{icon}</Text>
			) : (
				<View style={[styles.socialIconCircle, { borderColor: color }]}>
					<Text style={[styles.socialIconText, { color }]}>{icon}</Text>
				</View>
			)}
			<Text style={styles.socialBtnLabel}>{label}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	flex: {
		flex: 1,
	},
	container: {
		paddingHorizontal: 28,
		paddingTop: 48,
		paddingBottom: 40,
	},
	titleWrap: {
		marginBottom: 28,
	},
	title: {
		fontSize: 26,
		fontWeight: '700',
		color: '#0A0A0A',
		marginBottom: 6,
	},
	subtitle: {
		fontSize: 13,
		color: '#ABABAB',
		fontWeight: '400',
	},
	form: {
		gap: 14,
		marginBottom: 24,
	},
	inputWrap: {
		borderWidth: 1,
		borderColor: '#E0E0E0',
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FAFAFA',
	},
	input: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
		fontSize: 15,
		color: '#0A0A0A',
	},
	inputPasswordField: {
		paddingRight: 44,
	},
	eyeBtn: {
		position: 'absolute',
		right: 14,
		padding: 4,
	},
	eyeIcon: {
		fontSize: 16,
	},
	termsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginTop: 2,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 5,
		borderWidth: 1.5,
		borderColor: '#CCCCCC',
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkboxChecked: {
		backgroundColor: '#0A0A0A',
		borderColor: '#0A0A0A',
	},
	checkmark: {
		color: '#FFFFFF',
		fontSize: 12,
		fontWeight: '800',
	},
	termsText: {
		color: '#6B6B6B',
		fontSize: 13,
		flex: 1,
	},
	termsLink: {
		color: '#0A0A0A',
		fontWeight: '700',
	},
	dividerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		marginBottom: 16,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#E5E5E5',
	},
	dividerText: {
		color: '#ABABAB',
		fontSize: 12,
		fontWeight: '500',
	},
	socialList: {
		gap: 12,
		marginBottom: 24,
	},
	socialBtn: {
		borderWidth: 1,
		borderColor: '#E0E0E0',
		borderRadius: 50,
		paddingVertical: 14,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		backgroundColor: '#FFFFFF',
	},
	socialBtnPressed: {
		backgroundColor: '#F5F5F5',
	},
	socialIconCircle: {
		width: 26,
		height: 26,
		borderRadius: 13,
		borderWidth: 1.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	socialIconText: {
		fontSize: 13,
		fontWeight: '800',
	},
	appleIcon: {
		fontSize: 20,
		width: 26,
		textAlign: 'center',
	},
	socialBtnLabel: {
		color: '#0A0A0A',
		fontSize: 14,
		fontWeight: '500',
	},
	primaryBtn: {
		backgroundColor: '#0A0A0A',
		borderRadius: 50,
		paddingVertical: 18,
		alignItems: 'center',
		marginBottom: 24,
	},
	primaryBtnPressed: {
		backgroundColor: '#2A2A2A',
	},
	primaryBtnLabel: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '700',
		letterSpacing: 0.2,
	},
	bottomRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomText: {
		color: '#6B6B6B',
		fontSize: 14,
	},
	bottomLink: {
		color: '#0A0A0A',
		fontSize: 14,
		fontWeight: '800',
	},
});
