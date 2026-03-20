import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderSuccessScreen({ onContinue }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark" size={30} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>Order Successfull!</Text>
        <Text style={styles.subtitle}>You have successfully made order</Text>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7F7' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  iconWrap: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 38, fontWeight: '700', color: '#0A0A0A', letterSpacing: -0.8 },
  subtitle: { marginTop: 8, fontSize: 20, color: '#7B7B7B' },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 12,
  },
  button: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});
