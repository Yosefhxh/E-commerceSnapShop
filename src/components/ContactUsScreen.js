import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactUsScreen({ onBack }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={onBack}><Text allowFontScaling={false} style={styles.back}>←</Text></Pressable>
        <Text allowFontScaling={false} style={styles.title}>Contact Us</Text>
        <View style={styles.slot} />
      </View>

      <View style={styles.content}>
        <Pressable style={styles.card}>
          <Ionicons name="headset-outline" size={20} color="#111" />
          <Text allowFontScaling={false} style={styles.cardText}>Customer Service</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F2F2F2' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
  },
  backBtn: { width: 28, justifyContent: 'center' },
  back: { width: 28, fontSize: 34, lineHeight: 34, color: '#0A0A0A' },
  slot: { width: 28 },
  title: { fontSize: 24, fontWeight: '700', color: '#0A0A0A', letterSpacing: -0.3 },
  content: { paddingHorizontal: 20 },
  card: {
    marginTop: 4,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EBEBEB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  cardText: { fontSize: 14, color: '#111', fontWeight: '600' },
});
