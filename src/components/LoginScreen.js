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

export default function LoginScreen({ onLogin, onGoSignUp }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

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
						<Text style={styles.welcome}>Welcome back!</Text>
						<Text style={styles.signInTitle}>Sign In</Text>
					</View>

					<View style={styles.form}>
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

						<Pressable style={styles.forgotWrap}>
							<Text style={styles.forgotText}>Forget Password?</Text>
						</Pressable>
					</View>

					<Pressable
						style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed]}
						onPress={onLogin}
					>
						<Text style={styles.primaryBtnLabel}>Sign In</Text>
					</Pressable>

					<View style={styles.dividerRow}>
						<View style={styles.dividerLine} />
						<Text style={styles.dividerText}>OR</Text>
						<View style={styles.dividerLine} />
					</View>

					<View style={styles.socialList}>
						<SocialButton icon="f" label="Continue with facebook" color="#1877F2" />
						<SocialButton icon="G" label="Continue with Google" color="#EA4335" />
					</View>

					<View style={styles.bottomRow}>
						<Text style={styles.bottomText}>Don't have an account? </Text>
						<Pressable onPress={onGoSignUp}>
							<Text style={styles.bottomLink}>Sign Up</Text>
						</Pressable>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

function SocialButton({ icon, label, color }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.socialBtn, pressed && styles.socialBtnPressed]}
		>
			<View style={[styles.socialIconCircle, { borderColor: color }]}>
				<Text style={[styles.socialIconText, { color }]}>{icon}</Text>
			</View>
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
		marginBottom: 36,
	},
	welcome: {
		fontSize: 28,
		fontWeight: '700',
		color: '#0A0A0A',
		lineHeight: 34,
	},
	signInTitle: {
		fontSize: 28,
		fontWeight: '700',
		color: '#0A0A0A',
		lineHeight: 34,
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
	forgotWrap: {
		alignSelf: 'flex-end',
	},
	forgotText: {
		color: '#0A0A0A',
		fontSize: 13,
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
	dividerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		marginBottom: 20,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: '#E5E5E5',
	},
	dividerText: {
		color: '#ABABAB',
		fontSize: 13,
		fontWeight: '600',
	},
	socialList: {
		gap: 12,
		marginBottom: 36,
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
	socialBtnLabel: {
		color: '#0A0A0A',
		fontSize: 14,
		fontWeight: '500',
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
