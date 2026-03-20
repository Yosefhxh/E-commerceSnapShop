import { useRef, useState } from 'react';
import {
	Dimensions,
	FlatList,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
	{
		id: '1',
		image: 'https://images.unsplash.com/photo-1614093302611-8efc5f1b52e5?w=800&q=80',
		title: 'Discover Our New\nCollection',
		subtitle: 'Easy shopping for all your needs just in hand,\ntrusted by millions of people in the world.',
		isLast: false,
	},
	{
		id: '2',
		image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=80',
		title: 'Order your Style',
		subtitle: 'More than a thousand of our bags\nare available for your luxury',
		isLast: false,
	},
	{
		id: '3',
		image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80',
		title: 'Fast & Secure\nDelivery',
		subtitle: 'Get your orders delivered at your\ndoorstep quickly and safely',
		isLast: true,
	},
];

export default function OnboardingScreen({ onFinish }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef(null);

	const goNext = () => {
		if (currentIndex < SLIDES.length - 1) {
			const next = currentIndex + 1;
			flatListRef.current?.scrollToIndex({ index: next, animated: true });
			setCurrentIndex(next);
		} else {
			onFinish();
		}
	};

	const onMomentumScrollEnd = (e) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / width);
		setCurrentIndex(index);
	};

	const renderSlide = ({ item }) => (
		<ImageBackground source={{ uri: item.image }} style={styles.slide} resizeMode="cover">
			<View style={styles.overlayTop} />
			<View style={styles.overlayBottom} />

			<View style={styles.content}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.subtitle}>{item.subtitle}</Text>

				<Pressable
					style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
					onPress={goNext}
				>
					<Text style={styles.buttonLabel}>{item.isLast ? 'Get Started' : 'Next'}</Text>
					{item.isLast && <Text style={styles.buttonArrow}>›</Text>}
				</Pressable>
			</View>
		</ImageBackground>
	);

	return (
		<View style={styles.container}>
			<FlatList
				ref={flatListRef}
				data={SLIDES}
				renderItem={renderSlide}
				keyExtractor={(item) => item.id}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={onMomentumScrollEnd}
				scrollEventThrottle={16}
			/>

			<View style={styles.dotsWrap}>
				{SLIDES.map((_, i) => (
					<View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0A0A0A',
	},
	slide: {
		width,
		height,
		justifyContent: 'flex-end',
	},
	overlayTop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.08)',
	},
	overlayBottom: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: height * 0.55,
		backgroundColor: 'rgba(0,0,0,0.72)',
	},
	content: {
		paddingHorizontal: 28,
		paddingBottom: 72,
		paddingTop: 40,
	},
	title: {
		color: '#FFFFFF',
		fontSize: 36,
		fontWeight: '800',
		lineHeight: 42,
		marginBottom: 14,
		letterSpacing: -0.5,
	},
	subtitle: {
		color: 'rgba(255,255,255,0.72)',
		fontSize: 14,
		lineHeight: 22,
		marginBottom: 36,
		fontWeight: '400',
	},
	button: {
		backgroundColor: '#0A0A0A',
		borderRadius: 50,
		paddingVertical: 18,
		paddingHorizontal: 32,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	buttonPressed: {
		backgroundColor: '#222222',
	},
	buttonLabel: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '700',
		letterSpacing: 0.2,
	},
	buttonArrow: {
		color: '#FFFFFF',
		fontSize: 22,
		fontWeight: '300',
		marginTop: -2,
	},
	dotsWrap: {
		position: 'absolute',
		bottom: 28,
		left: 28,
		flexDirection: 'row',
		gap: 6,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: 'rgba(255,255,255,0.35)',
	},
	dotActive: {
		width: 24,
		borderRadius: 4,
		backgroundColor: '#FFFFFF',
	},
});
